<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ServiceProviders;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\ServiceRequest;
use App\Models\Payment;

use Carbon\Carbon;



class AdminController extends Controller
{
    public function index()
    {
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
        $serviceProviders = ServiceProviders::all();
        $totalServiceProviders = count($serviceProviders);
    
        // Calculate current day's count
        $currentDayProviders = ServiceProviders::whereDate('created_at', Carbon::today())
                                               ->count();
    
        // Calculate previous day's count
        $previousDayProviders = ServiceProviders::whereDate('created_at', Carbon::yesterday())
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

        $totalAmount = Payment::sum('amount');

        // Calculate today's date and previous day's date
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        // Fetch previous day's amount
        $previousDayAmount = Payment::whereDate('payment_datetime', $yesterday)
                                    ->sum('amount');

        // Calculate percentage change from previous day
        $amountpercentageChange = 0;
        if ($previousDayAmount > 0) {
            $percentageChange = round((($totalAmount - $previousDayAmount) / $previousDayAmount) * 100, 2);
        } elseif ($totalAmount > 0) {
            $percentageChange = 100; // Consider a significant increase if there were no payments yesterday
        }

        return Inertia::render('Admin/Admin', [
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
    
    
    
    
    public function assignRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $role = $request->input('role');

        if ($role === 'Admin') {
            $user->is_admin = true;
        } else {
            $user->is_admin = false;
        }

        $user->save();

        return Redirect::back()->with('success', 'User role assigned successfully.');
    }
    public function approveUser($id)
    {
        $user = User::findOrFail($id);
        $user->is_verified = true;
        $user->save();

        return Redirect::back()->with('success', 'User approved successfully.');
    }
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return Redirect::back()->with('success', 'User deleted successfully.');
    }
    public function providers()
    {
        // Retrieve ServiceProviders with user and county relationships
        $serviceProviders = ServiceProviders::with('county')
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
    
    
    
        return Inertia::render('Admin/Super/Customers', [
            'serviceProviders' => $serviceProviders,
        ]);
    }
    public function update(Request $request, $id)
    {
        $provider = ServiceProviders::findOrFail($id);

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
        $provider = ServiceProviders::findOrFail($id);
        $provider->delete();

        return redirect()->back()->with('success', 'Provider deleted successfully.');
    }
}
