<?php

namespace App\Http\Controllers;

use App\Models\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\ServiceDetails;
use Illuminate\Http\Request;
use App\Models\County;
use Illuminate\Support\Facades\Validator;
use App\Models\Image;
use App\Models\Services;
use App\Models\ServiceRequest;
use App\Models\Payment;

use App\Models\Rating;
use App\Models\User;
use App\Models\Appointment;
use App\Models\PricingTiers;
use App\Models\Availability;

use Barryvdh\Debugbar\ServiceProvider as DebugbarServiceProvider;
use Illuminate\Support\Facades\Redirect;



class ServiceController extends Controller
{
    public function index()
    {
        try {
            // Fetch service providers with user and county details
            $serviceProviders = ServiceProvider::with(['user', 'county'])
                ->whereNotNull('is_approved')
                ->get()
                ->map(function ($provider) {
                    // Fetch service details for the provider
                    $serviceDetails = ServiceDetails::where('service_provider_id', $provider->id)
                        ->with('images', 'pricingTiers')
                        ->first();
    
                    if ($serviceDetails) {
                        // Extract necessary data
                        $basicPricing = $serviceDetails->pricingTiers->where('name', 'Basic')->first();
    
                        // Skip service if basic pricing is null
                        if (!$basicPricing) {
                            return null;
                        }
    
                        $imagePath = $serviceDetails->images->first()->path ?? null;
    
                        return [
                            'id' => $serviceDetails->id,
                            'user_name' => $provider->user->name,
                            'service_name' => $provider->service_type,
                            'price' => $basicPricing->price,
                            'image' => $imagePath,
                            'rating' => number_format($provider->ratings()->avg('rating'), 1),
                            'county' => $provider->county->name,
                        ];
                    } else {
                        return null; // Handle if service details not found
                    }
                })
                ->filter() // Remove null values from the collection
                ->values(); // Re-index the collection
    
            // Select 4 random service providers
            if ($serviceProviders->count() > 4) {
                $serviceProviders = $serviceProviders->random(4);
            }
    
            // Render view with data using Inertia
            return Inertia::render('Home', [
                'serviceProviders' => $serviceProviders,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            dd($e);
            return Inertia::render('Home');
        }
    }
    
    public function allServices()
    {
        try {
            // Fetch service providers with user and county details
            $serviceProviders = ServiceProvider::with(['user', 'county'])
                ->whereNotNull('is_approved')
                ->get()
                ->map(function ($provider) {
                    // Fetch service details for the provider
                    $serviceDetails = ServiceDetails::where('service_provider_id', $provider->id)
                        ->with('images', 'pricingTiers')
                        ->first();
    
                    if ($serviceDetails) {
                        // Extract necessary data
                        $basicPricing = $serviceDetails->pricingTiers->where('name', 'Basic')->first();
    
                        // Skip service if basic pricing is null
                        if (!$basicPricing) {
                            return null;
                        }
    
                        $imagePath = $serviceDetails->images->first()->path ?? null;
    
                        return [
                            'id' => $serviceDetails->id,
                            'user_name' => $provider->user->name,
                            'service_name' => $provider->service_type,
                            'price' => $basicPricing->price,
                            'image' => $imagePath,
                            'rating' => number_format($provider->ratings()->avg('rating'), 1),
                            'county' => $provider->county->name,
                            'category' => $serviceDetails->category, // Include category data
                        ];
                    } else {
                        return null; // Handle if service details not found
                    }
                })
                ->filter(); // Remove null values from the collection
    
            // Fetch categories from the services table
            $categories = Services::distinct('category')->pluck('category')->toArray();
    
            // Render view with data using Inertia, including categories
            return Inertia::render('Services', [
                'serviceProviders' => $serviceProviders,
                'categories' => $categories,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            dd($e);
            return Inertia::render('Services');
        }
    }
    
    public function getDescription($id)
    {
        try {
            // Retrieve the service details by service provider ID
            $serviceDetails = ServiceDetails::with(['serviceProvider', 'images', 'pricingTiers', 'availabilities'])
                ->where('service_provider_id', $id)
                ->first();
    
            // Check if service details exist
            if ($serviceDetails) {
                $description = $serviceDetails->service_description;
                $provider = $serviceDetails->serviceProvider;
                $images = $serviceDetails->images;
    
                // Provider details
                $providerDetails = [
                    'company_name' => $provider->company_name,
                    'contact_number' => $provider->contact_number,
                    'address' => $provider->address,
                    'county_id' => $provider->county_id,
                    'county_name' => County::find($provider->county_id)->name,
                    'user_name' => $provider->user->name,
                    'email' => $provider->user->email,
                    'service_provider_id' => $provider->id,
                    'service_name' => $provider->service_type,
                    'latitude' => $provider->latitude,
                    'longitude' => $provider->longitude,
                ];
    
                // Get all pricing tiers with their names, prices, and descriptions
                $pricingTiers = $serviceDetails->pricingTiers->map(function ($tier) {
                    return [
                        'id' => $tier->id,
                        'name' => $tier->name,
                        'price' => $tier->price,
                        'description' => $tier->description,
                    ];
                });
    
                // Format availability data
                $availability = $serviceDetails->availabilities->map(function ($avail) {
                    return [
                        'id' => $avail->id,
                        'day_of_week' => $avail->day_of_week,
                        'open' => $avail->open,
                        'close' => $avail->close,
                    ];
                });
    
                // Include service_detail_id
                $serviceDetailId = $serviceDetails->id;
    
                // Retrieve ratings for the service provider with user details
                $ratings = Rating::where('service_provider_id', $provider->id)
                    ->with('user')
                    ->orderByDesc('created_at')
                    ->get()
                    ->map(function ($rating) {
                        return [
                            'rating' => $rating->rating,
                            'comment' => $rating->comment,
                            'created_at' => $rating->created_at,
                            'user' => [
                                'name' => $rating->user->name,
                                'image' => $rating->user->image,
                            ],
                        ];
                    });
    
                // Retrieve all service providers with necessary details
                $serviceProviders = ServiceProvider::with(['user', 'county'])
                    ->whereNotNull('is_approved')
                    ->get()
                    ->map(function ($provider) {
                        $serviceDetails = ServiceDetails::where('service_provider_id', $provider->id)
                            ->with('images', 'pricingTiers')
                            ->first();
    
                        if ($serviceDetails) {
                            // Extract all pricing tiers
                            $pricing = $serviceDetails->pricingTiers->map(function ($tier) {
                                return [
                                    'name' => $tier->name,
                                    'price' => $tier->price,
                                    'description' => $tier->description,
                                ];
                            });
    
                            // Skip service if pricing is null
                            if ($pricing->isEmpty()) {
                                return null;
                            }
    
                            // Fetch first image path
                            $imagePath = $serviceDetails->images->first()->path ?? null;
    
                            return [
                                'id' => $serviceDetails->id,
                                'user_name' => $provider->user->name,
                                'email' => $provider->user->email,
                                'service_name' => $provider->service_type,
                                'pricing' => $pricing, // Include all pricing tiers
                                'image' => $imagePath,
                                'rating' => number_format($provider->ratings()->avg('rating'), 1),
                                'county' => $provider->county->name,
                            ];
                        } else {
                            return null;
                        }
                    })
                    ->filter()
                    ->values();
    
                // Select 4 random service providers
                if ($serviceProviders->count() > 4) {
                    $serviceProviders = $serviceProviders->random(4);
                }
    
                return Inertia::render('ServiceDescription', [
                    'description' => $description,
                    'availability' => $availability,
                    'provider' => $providerDetails,
                    'images' => $images,
                    'pricingTiers' => $pricingTiers,
                    'service_detail_id' => $serviceDetailId,
                    'service_provider_id' => $id,
                    'service_name' => $provider->service_type,
                    'serviceProviders' => $serviceProviders,
                    'ratings' => $ratings,
                ]);
            } else {
                return Redirect::route('home')->with('error', 'Service not found.');
            }
        } catch (\Exception $e) {
            dd($e);
            return Redirect::route('home')->with('error', 'An error occurred.');
        }
    }
    
    


    public function settings()
    {
        $user = Auth::user();
       // dd($user);
        return Inertia::render('Admin/Service/Settings', ['user' => $user]);
    }
    public function settingsUpdate(Request $request)
    {
        $user = Auth::user();
    
        // Define validation rules
        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'contact_number' => 'required|string|min:7|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'current_password' => 'nullable|required_with:new_password',
            'new_password' => 'nullable|min:8|confirmed',
        ];
    
        // Validate the request
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        try {
            // Combine contact number header and rest
            $contact_number = '254' . $request->contact_number;
    
            // Update the user profile
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->contact_number = $contact_number;
    
            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/image-uploads');
                $image->move($destinationPath, $imageName);
                $user->image = 'image-uploads/' . $imageName;
            }
    
            // Handle password change
            if ($request->filled('current_password')) {
                if (!Hash::check($request->current_password, $user->password)) {
                    return back()->withErrors(['current_password' => 'The provided password does not match your current password.']);
                }
    
                $user->password = Hash::make($request->new_password);
            }
    
            // Save the updated user
            $user->save();
    
            return redirect()->back()->with('success', 'Settings updated successfully.');
    
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating your profile. Please try again later.'])->withInput();
        }
    }
    

    public function services()
    {
        $provider = ServiceProvider::where('user_id', Auth::id())->first();
        $countyName = null;
        $serviceDetails = null;
        $pricingTiers = [];
        $availability = [];
    
        if ($provider) {
            $county = County::find($provider->county_id);
            $countyName = $county ? $county->name : null;
            $serviceDetails = ServiceDetails::where('service_provider_id', $provider->id)->first();
            
            if ($serviceDetails) {
                $pricingTiers = $serviceDetails->pricingTiers()->get();
                $availability = $serviceDetails->availabilities()->get(); // Assuming availability() is the relationship method
            }
        }

        return Inertia::render('Admin/Service/ServiceParody', [
            'provider' => $provider,
            'countyName' => $countyName,
            'counties' => County::all(),
            'serviceDetails' => $serviceDetails,
            'pricingTiers' => $pricingTiers,
            'availability' => $availability,
        ]);
    }
    

    public function update(Request $request, $id)
    {
        $provider = ServiceProvider::find($id);

        if (!$provider || $provider->user_id !== Auth::id()) {
            return redirect()->route('admin.services')->with('error', 'Unauthorized access.');
        }

        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'service_type' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'county_id' => 'required|exists:counties,id',
            'service_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('service_image')) {
            $imagePath = $request->file('service_image')->store('service_images', 'public');
            $validatedData['service_image'] = $imagePath;
        }

        $provider->update($validatedData);

        return redirect()->route('admin.services')->with('success', 'Service details updated successfully.');
    }
   
    public function updateAdditional(Request $request, $id)
    {//dd($request->all());
        try {
          
            // Find the service provider
            $provider = ServiceProvider::find($id);
    
            // Ensure the provider exists and the user is authorized
            if (!$provider || $provider->user_id !== auth()->id()) {
                return redirect()->route('admin.services')->with('error', 'Unauthorized access.');
            }
    
            // Validate the request data
            $validatedData = $request->validate([
                'service_description' => 'required|string',
                'availability' => 'required|array', // Validate as array
                'availability.*.day_of_week' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
                'availability.*.open_time' => 'nullable|string',
                'availability.*.close_time' => 'nullable|string',
                'pricing_tiers.*.name' => 'required|string|in:Basic,Standard,Premium',
                'pricing_tiers.*.price' => 'required|numeric|min:0',
                'pricing_tiers.*.description' => 'nullable|string',
                'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            // Create or update service details
            $serviceDetails = ServiceDetails::updateOrCreate(
                ['service_provider_id' => $provider->id],
                ['service_description' => $validatedData['service_description']]
            );
    
            // Update availability records
            foreach ($validatedData['availability'] as $availData) {
                // Determine the value of 'closed' based on 'open_time' and 'close_time'
                $closed = empty($availData['open_time']) || empty($availData['close_time']);
    
                // Check if availability exists for this day and service detail
                $avail = Availability::updateOrCreate(
                    [
                        'service_detail_id' => $serviceDetails->id,
                        'day_of_week' => strtolower($availData['day_of_week']),
                    ],
                    [
                        'open' => $availData['open_time'],
                        'close' => $availData['close_time'],
                        'closed' => $closed,
                    ]
                );
            }
    
            // Update or create pricing tiers
            foreach ($validatedData['pricing_tiers'] as $tierData) {
                PricingTiers::updateOrCreate(
                    [
                        'service_detail_id' => $serviceDetails->id,
                        'name' => $tierData['name'], // Assuming name uniquely identifies the tier
                    ],
                    [
                        'price' => $tierData['price'],
                        'description' => $tierData['description'],
                    ]
                );
            }
    
            // Handle image uploads and store in the database and public folder
            $images = [];
            foreach (['image_1', 'image_2', 'image_3'] as $index => $imageField) {
                if ($request->hasFile($imageField)) {
                    $uploadedFile = $request->file($imageField);
                    $filename = time() . '_' . $uploadedFile->getClientOriginalName();
    
                    // Move the uploaded file to public storage (public/uploaded-images folder)
                    $uploadedFile->move(public_path('uploaded-images'), $filename);
    
                    // Store image details in the images table
                    $image = new Image([
                        'service_details_id' => $serviceDetails->id,
                        'path' => 'uploaded-images/' . $filename, // Store relative path to the public folder
                    ]);
                    $image->save();
    
                    // Collect image details for association with service details later
                    $images[] = $image;
                }
            }
    
            // Redirect with success message
            return redirect()->route('admin.services')->with('success', 'Additional details updated successfully.');
    
        } catch (\Exception $e) {
            // Redirect back with error message and debug info
            dd($e);
            return redirect()->back()->with('error', 'Failed to update additional details. Please try again.');
        }
    }
    
    
    
    
    

   
  
    
    public function dashboard()
    {
        $serviceProvider = auth()->user()->serviceProvider;
        
        $revenueData = ServiceRequest::where('service_provider_id', $serviceProvider->id)
            ->with('serviceDetail')
            ->where('status', 'completed')
            ->get()
            ->groupBy('serviceDetail.name')
            ->map(function ($group) {
                return $group->sum('amount');
            });
    
        $trafficData = ServiceRequest::where('service_provider_id', $serviceProvider->id)
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    
        $totalClients = ServiceRequest::where('service_provider_id', $serviceProvider->id)
            ->distinct('user_id')
            ->count();
    
        $accountBalance = ServiceRequest::where('service_provider_id', $serviceProvider->id)
            ->where('status', 'completed')
            ->where('payment_status', 'paid')
            ->sum('amount');
    //dd($accountBalance, $totalClients, $trafficData, $revenueData);
        return Inertia::render('Admin/Service/Dashboard', [
            'revenueData' => $revenueData,
            'trafficData' => $trafficData,
            'totalClients' => $totalClients,
            'accountBalance' => $accountBalance,
        ]);
    }
public function clients()
{
    $serviceProviderId = auth()->user()->serviceProvider->id; 
    
    $appointments = ServiceRequest::with(['user'])
        ->join('service_providers', 'service_requests.service_provider_id', '=', 'service_providers.id')
        ->where('service_requests.service_provider_id', $serviceProviderId)
        ->orderBy('service_requests.booking_date', 'desc')
        ->select('service_requests.*', 'service_providers.service_type')
        ->get();

    return Inertia::render('Admin/Service/Clients', [
        'appointments' => $appointments,
    ]);
}
public function showUserDetails($id)
{
    // Fetch the service request by its ID
    $serviceRequest = ServiceRequest::findOrFail($id);

    // Fetch the user details based on the user_id in the service request
    $user = User::findOrFail($serviceRequest->user_id);

    // Combine the service request and user details
    $appointment = [
        'service_request' => $serviceRequest,
        'user' => $user,
    ];

    // Pass the booking details to the Inertia view
    return Inertia::render('Admin/Service/UserDetails', [
        'appointment' => $appointment
    ]);

 
}

public function updateStatus($id)
    {
        // Find the ServiceRequest by ID
        $serviceRequest = ServiceRequest::findOrFail($id);


        $serviceRequest->status = 'Completed';
        $serviceRequest->save();

        return Redirect::route('userdetails.show', ['id' => $id]);
    }
  

}
