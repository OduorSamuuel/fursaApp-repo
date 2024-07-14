<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\ServiceRequest;
use App\Models\Payment;
use App\Models\ServiceProviderPayment;
use App\Models\ServiceProviderRequest;
use App\Models\Revenue;
use App\Mail\ServiceProviderApproved;
use App\Mail\ServiceProviderRevoked;
use Illuminate\Support\Facades\Mail;



use Carbon\Carbon;



class AdminController extends Controller
{
    public function index()
    {
        $user=Auth::user();
        // Fetch users except the logged-in admin
        $users = User::where('id', '!=', Auth::id()) // Exclude the logged-in user
                      ->select('id', 'name', 'email', 'image', 'is_verified', 'is_admin') // Select necessary fields
                      ->get();
    
        // Fetch service requests grouped by booking_date and status
        $serviceRequests = ServiceRequest::selectRaw('status, booking_date, count(*) as count')
                                         ->groupBy('status', 'booking_date')
                                         ->get();
    
        // Prepare data for chart visualization
        $chartData = [];
        $totalRequests = 0;
    
        // Initialize counters for statuses
        $statusCounts = [
            'Pending' => 0,
            'Accepted' => 0,
            'Rejected' => 0,
            'Completed' => 0,
            'Cancelled by User' => 0,
        ];
    
        // Process each service request record
        foreach ($serviceRequests as $request) {
            // Ensure booking_date is a Carbon instance for formatting
            $bookingDate = Carbon::parse($request->booking_date)->format('Y-m-d');
            $status = $request->status;
            $count = $request->count;
    
            // Increment the total count of service requests
            $totalRequests += $count;
    
            // Increment the count for the respective status
            if (array_key_exists($status, $statusCounts)) {
                $statusCounts[$status] += $count;
            }
    
            // Prepare chart data for each date
            if (!isset($chartData[$bookingDate])) {
                $chartData[$bookingDate] = [
                    'Pending' => 0,
                    'Accepted' => 0,
                    'Rejected' => 0,
                    'Completed' => 0,
                    'Cancelled by User' => 0, 
                ];
            }
    
            // Assign count to the respective status for the date
            $chartData[$bookingDate][$status] += $count;
        }
    
        // Calculate percentages relative to total service requests
        foreach ($statusCounts as $status => $count) {
            $percentage = ($totalRequests > 0) ? round(($count / $totalRequests) * 100, 2) : 0;
            $statusCounts[$status . '_percentage'] = $percentage;
        }
    
        // Fetch service providers and related data
        $serviceProviders = ServiceProvider::all();
        $totalServiceProviders = count($serviceProviders);
    
        // Calculate current day's count
        $currentDayProviders = ServiceProvider::whereDate('created_at', Carbon::today())
                                               ->count();
    
        // Calculate previous day's count
        $previousDayProviders = ServiceProvider::whereDate('created_at', Carbon::yesterday())
                                               ->count();
    
        // Calculate percentage change from previous day
        $percentageChange = 0;
    
        if ($previousDayProviders > 0) {
            $percentageChange = round((($currentDayProviders - $previousDayProviders) / $previousDayProviders) * 100, 2);
        } elseif ($currentDayProviders > 0) {
            $percentageChange = 100; // Consider a significant increase if there were no providers yesterday
        }
    
        // Fetch total number of users (excluding logged-in admin)
        $totalUsers = User::where('id', '!=', Auth::id())->count();
    
        // Calculate previous day's user count
        $previousDayUsers = User::whereDate('created_at', Carbon::yesterday())
                                ->where('id', '!=', Auth::id()) // Exclude logged-in admin
                                ->count();
    
        // Calculate percentage change in users from previous day
        $userPercentageChange = 0;
    
        if ($previousDayUsers > 0) {
            $userPercentageChange = round((($totalUsers - $previousDayUsers) / $previousDayUsers) * 100, 2);
        } elseif ($totalUsers > 0) {
            $userPercentageChange = 100; // Consider a significant increase if there were no users yesterday
        }

        $yesterday = Carbon::yesterday()->format('Y-m-d');
    $today = Carbon::today()->format('Y-m-d');

    // Get the latest total revenue for today
    $latestTodayRevenueRecord = Revenue::whereDate('created_at', $today)
        ->latest('id')
        ->first();
    $totalAmount = $latestTodayRevenueRecord ? $latestTodayRevenueRecord->total_revenue : 0;

    // Get the latest total revenue for the previous day
    $latestYesterdayRevenueRecord = Revenue::whereDate('created_at', $yesterday)
        ->latest('id')
        ->first();
    $previousDayAmount = $latestYesterdayRevenueRecord ? $latestYesterdayRevenueRecord->total_revenue : 0;

    // Calculate percentage change from previous day
    $amountpercentageChange = 0;
    if ($previousDayAmount > 0) {
        $percentageChange = round((($totalAmount - $previousDayAmount) / $previousDayAmount) * 100, 2);
    } elseif ($totalAmount > 0) {
        $percentageChange = 100; // Consider a significant increase if there was no revenue yesterday
    }


        return Inertia::render('Admin/Admin', [
            'user' => $user,
            'users' => $users,
            'serviceRequests' => $serviceRequests,
            'chartData' => $chartData,
            'statusCounts' => $statusCounts,
            'totalRequests' => $totalRequests,
            'serviceProviders' => $serviceProviders,
            'totalServiceProviders' => $totalServiceProviders,
            'currentDayProviders' => $currentDayProviders, // Optionally pass current day's count for display
            'previousDayProviders' => $previousDayProviders,
            'percentageChange' => $percentageChange,
            'totalUsers' => $totalUsers,
            'previousDayUsers' => $previousDayUsers,
            'userPercentageChange' => $userPercentageChange,
            'totalAmount' => $totalAmount,
            'previousDayAmount' => $previousDayAmount,
            'amountpercentageChange' => $amountpercentageChange, 
        ]);
    }
    
    public function manage($id)
{
    $user = User::findOrFail($id);
   //dd($user);
    return Inertia::render('Admin/Super/UserManagement', ['user' => $user]);
}
    
public function verifyUser($id)
{
    $user = User::findOrFail($id);
 
    $user->is_verified = !$user->is_verified; // Toggle verification status
    $user->save();

    return redirect()->back()->with('success', 'User verification status updated.');
}

// Function to assign a role to a user
public function assignRole(Request $request, $id)
{
    $user = User::findOrFail($id);
    $role = $request->input('role');

    if ($role === 'admin') {
        $user->is_admin = true;
    } else {
        $user->is_admin = false;
    }

    $user->save();

    return redirect()->back()->with('success', 'User role updated.');
}

// Function to delete a user
public function deleteUser($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return redirect()->back()->with('success', 'User deleted successfully.');
}
  
 


    public function providers()
    {
        // Retrieve ServiceProviders with user and county relationships
        $serviceProviders = ServiceProvider::with('county')
            ->orderBy('created_at', 'desc')
            ->get();
    
        // Retrieve user details for each service provider
        $serviceProviders->each(function ($provider) {
            $user = User::select('id', 'name', 'email', 'image', 'is_admin')
                ->where('id', $provider->user_id)
                ->first();
    
            // Assign user details to the provider object
            $provider->user_details = $user;
        });
    
    $user=Auth::user();
 
        return Inertia::render('Admin/Super/Customers', [
            'serviceProviders' => $serviceProviders,
            'user' => $user
        ]);
    }
    public function update(Request $request, $id)
    {
        $provider = ServiceProvider::findOrFail($id);

        // Ensure only specific fields can be updated
        $data = $request->validate([
            'is_verified' => 'boolean',
            'is_admin' => 'boolean',
            'is_approved' => 'boolean',
        ]);

        $provider->update($data);

        return redirect()->back()->with('success', 'Provider details updated successfully.');
    }

    // Delete a service provider
    public function destroy($id)
    {
        $provider = ServiceProvider::findOrFail($id);
        $provider->delete();

        return redirect()->back()->with('success', 'Provider deleted successfully.');
    }
    public function payments()
    {$user=Auth::user();
        $serviceRequests = ServiceRequest::with('user', 'serviceDetail')
            ->leftJoin('service_provider_payments', 'service_requests.id', '=', 'service_provider_payments.service_request_id')
            ->whereNull('service_provider_payments.service_request_id')
            ->orderBy('service_requests.created_at', 'desc')
            ->select('service_requests.*') // Select all columns from service_requests
            ->get()
            ->map(function ($request) {
                // Retrieve service provider name
                $serviceProviderName = User::where('id', $request->service_provider_id)->value('name');
                $request['service_provider_name'] = $serviceProviderName;
    
                // Retrieve service type from ServiceProviders table
                $serviceType = ServiceProvider::where('user_id', $request->service_provider_id)->value('service_type');
                $request['service_type'] = $serviceType;
    
                return $request;
            });
    //dd($serviceRequests);
        return Inertia::render('Admin/Super/Payments', [
            'serviceRequests' => $serviceRequests,
            'user' => $user
        ]);
    }
    
    public function payProvider(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'requestId' => 'required|exists:service_requests,id',
            'providerName' => 'required|string',
            'originalAmount' => 'required|numeric',
            'amountAfterCommission' => 'required|numeric',
            'serviceRequestId' => 'required|exists:service_requests,service_detail_id',
            // Add validation rules for other data you expect to receive
        ]);
    
        try {
            // Retrieve the service request based on the ID
            $serviceRequest = ServiceRequest::findOrFail($request->requestId);
    
        /*
            $serviceRequest->update([
                'status' => 'Paid', 
            ]);
    */
            // Create a record in the service_provider_payments table
            ServiceProviderPayment::create([
                'service_request_id' => $serviceRequest->id,
                'service_provider_id' => $serviceRequest->service_provider_id,
                'amount' => $request->amountAfterCommission,
                'commission' => $request->originalAmount - $request->amountAfterCommission,
                'amount_paid' => $request->amountAfterCommission,
            ]);
    
            // Update the revenue table
            // Find the latest revenue record
            $latestRevenue = Revenue::latest()->first();
    
            // Deduct the amount paid from the latest revenue's total revenue
            if ($latestRevenue) {
                $latestRevenue->update([
                    'revenue_generated' => $latestRevenue->revenue_generated + $request->amountAfterCommission,
                    'total_revenue' => $latestRevenue->total_revenue - $request->amountAfterCommission,
                ]);
            } else {

                return Redirect::back()->withErrors(['error' => 'Error updating revenue.']);
            }
    
            return Redirect::back()->with('success', 'Payment confirmed successfully.');
        } catch (\Exception $e) {
            dd($e);
            return Redirect::back()->withErrors(['error' => 'Error confirming payment.']);
        }
    }
    public function settings(){
        $user = Auth::user();

        return Inertia::render('Admin/Super/Settings', [
            'user' => $user,
        ]);
    }
    public function updateSettings(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'phoneNumber' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
                'currentPassword' => 'nullable|string',
                'newPassword' => 'nullable|string|min:8|confirmed',
            ]);

            $user = Auth::user();

            // Update user details
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->contact_number = $request->input('phoneNumber');
         

            // Check if current password is provided and matches the existing password
            if ($request->input('currentPassword') && Hash::check($request->input('currentPassword'), $user->password)) {
                // Update the password if new password is provided
                if ($request->input('newPassword')) {
                    $user->password = Hash::make($request->input('newPassword'));
                }
            }

            $user->save();

            // Redirect back with success message
            return Redirect::back()->with('success', 'Settings updated successfully.');
        } catch (Exception $e) {
            // Log the error for debugging
            dd($e);
            Log::error('Error updating settings: ', ['error' => $e->getMessage()]);

            // Redirect back with error message
            return redirect()->back()->with('error', 'There was an issue updating your settings. Please try again.');
        }
    }
    public function reports()
    {
        $user = Auth::user();
        $users = User::all();
        $serviceProviders = ServiceProvider::with('user')->get();
        $serviceRequests = ServiceRequest::with(['user', 'serviceProvider'])->get();
        
        // Fetching all revenues and sorting by ID
        $revenues = Revenue::orderBy('id', 'asc')->get();
    
        // Get the latest revenue directly
        $latestRevenue = Revenue::latest()->first();
    
        $userRegistrationData = User::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    
        $revenueData = Revenue::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(revenue_generated) as total'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();
    //dd($latestRevenue);
        return Inertia::render('Admin/Super/Reports', [
            'user' => $user,
            'users' => $users,
            'serviceProviders' => $serviceProviders,
            'serviceRequests' => $serviceRequests,
            'revenues' => $revenues,
            'latestRevenue' => $latestRevenue,
            'userRegistrationData' => $userRegistrationData,
            'revenueData' => $revenueData,
        ]);
    }
    
    
    public function chats(){
        $user=Auth::user();
   
        return Inertia::render('Chat/Index', [
            'user' => $user,
        ]); 
    }

    public function editCustomer($id)
    {
        try {
            $serviceProvider = ServiceProvider::with(['user', 'serviceDetails', 'county'])
                ->findOrFail($id);
    
            return Inertia::render('Admin/Super/EditCustomer', [
                'serviceProvider' => $serviceProvider,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle case where the ServiceProvider is not found
            return redirect()->route('admin.customers')->withErrors(['error' => 'Service provider not found.']);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return redirect()->route('admin.customers')->withErrors(['error' => 'An error occurred while retrieving the service provider.']);
        }
    }
    
    
    public function updateApprovalStatus($id, Request $request)
    {
        $serviceProvider = ServiceProvider::findOrFail($id);
        $isApproved = $request->input('is_approved');
        
        $serviceProvider->is_approved = $isApproved;
        $serviceProvider->save();

        if ($isApproved) {
            Mail::to($serviceProvider->user->email)->send(new ServiceProviderApproved($serviceProvider));
         
            return redirect()->back()->with('success', 'Service provider approved and notification email sent.');
        } else {
            Mail::to($serviceProvider->user->email)->send(new ServiceProviderRevoked($serviceProvider));
           // dd(($serviceProvider->user->email));
            return redirect()->back()->with('success', 'Service provider approval revoked and notification email sent.');
        }
    }
}
