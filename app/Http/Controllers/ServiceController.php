<?php
// ServiceController.php
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
use App\Models\Rating;
use App\Models\Appointment;
use App\Models\PricingTiers;

use Illuminate\Support\Facades\Redirect;


class ServiceController extends Controller
{
    public function index()
{
    try {
        $serviceProviders = ServiceProvider::with([
            'user',
            'serviceDetails.images',
            'ratings',
            'serviceDetails.pricingTiers' => function ($query) {
                $query->where('name', 'Basic');
            }
        ])
        ->whereHas('serviceDetails.images')
        ->whereNotNull('is_approved')
        ->get()
        ->map(function ($provider) {
            // Get the 'Basic' pricing tier if it exists
            $basicPricing = $provider->serviceDetails->pricingTiers->firstWhere('name', 'Basic');

            return [
                'id' => $provider->serviceDetails->id, // Add the service ID here
                'user_name' => $provider->user->name,
                'service_name' => $provider->service_type,
                'price' => $basicPricing ? $basicPricing->price : null,
                'image' => $provider->serviceDetails->images->first()->path ?? null,
                'rating' => $provider->ratings->avg('rating') ?? null,
            ];
        });
//d($serviceProviders);
        return Inertia::render('Home', [
            'serviceProviders' => $serviceProviders,
        ]);
    } catch (\Exception $e) {
        // Handle the error when there's a null rating
        return Inertia::render('Home');
    }
}


public function getDescription($id)
{
    try {
        // Retrieve the service details by service provider ID
        $serviceDetails = ServiceDetails::with(['serviceProvider', 'images', 'pricingTiers'])
            ->where('service_provider_id', $id)
            ->first();

        // Check if service details exist
        if ($serviceDetails) {
            $description = $serviceDetails->service_description;
            $availability = $serviceDetails->availability;
            $provider = $serviceDetails->serviceProvider;
            $images = $serviceDetails->images;

            // Get additional provider details
            $providerDetails = [
                'company_name' => $provider->company_name,
                'contact_number' => $provider->contact_number,
                'address' => $provider->address,
                'county_id' => $provider->county_id,
                'county_name' => County::find($provider->county_id)->name, // Assuming 'name' is the column holding the county name
                'user_name' => $provider->user->name,
                'service_provider_id' => $provider->id,
                'service_name' => $provider->service_type, // Assuming 'service_type' is the name of the service
            ];
//dd($providerDetails);
            // Get pricing tiers with their names, prices, and descriptions
            $pricingTiers = $serviceDetails->pricingTiers->map(function ($tier) {
                return [
                    'name' => $tier->name,
                    'price' => $tier->price,
                    'description' => $tier->description,
                ];
            });

            return Inertia::render('ServiceDescription', [
                'description' => $description,
                'availability' => $availability,
                'provider' => $providerDetails,
                'images' => $images,
                'pricingTiers' => $pricingTiers,
                'service_provider_id' => $id,
                'service_name' => $provider->service_type, // Pass the service provider ID to the frontend
            ]);
        } else {
            return Redirect::route('home')->with('error', 'Service not found.');
        }
    } catch (\Exception $e) {
        // Handle other exceptions if needed
        return Redirect::route('home')->with('error', 'An error occurred.');
    }
}



    public function settings()
    {
        $user = Auth::user()->only(['name', 'username', 'email', 'last_seen_at', 'is_verified', 'is_admin']);
        return Inertia::render('Admin/Service/Settings', ['user' => $user]);
    }

    public function services()
{
    $provider = ServiceProvider::where('user_id', Auth::id())->first();
    $countyName = null;
    $serviceDetails = null;
    $pricingTiers = [];

    if ($provider) {
        $county = County::find($provider->county_id);
        $countyName = $county ? $county->name : null;
        $serviceDetails = ServiceDetails::where('service_provider_id', $provider->id)->first();
        
        if ($serviceDetails) {
            $pricingTiers = $serviceDetails->pricingTiers()->get();
        }
    }
//dd($pricingTiers);
    return Inertia::render('Admin/Service/Services', [
        'provider' => $provider,
        'countyName' => $countyName,
        'counties' => County::all(),
        'serviceDetails' => $serviceDetails,
        'pricingTiers' => $pricingTiers,
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
    {
      
        // Find the service provider
        $provider = ServiceProvider::find($id);

        // Ensure the provider exists and the user is authorized
        if (!$provider || $provider->user_id !== auth()->id()) {
            return redirect()->route('admin.services')->with('error', 'Unauthorized access.');
        }

        // Validate the request data
        $validatedData = $request->validate([
            'service_description' => 'required|string',
            'availability' => 'required|string',
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
            [
                'service_description' => $validatedData['service_description'],
                'availability' => $validatedData['availability'],
            ]
        );

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
    }
public function dashboard(){
    return Inertia::render('Admin/Service/Dashboard');
}
public function clients(){
    $serviceProviderId = auth()->user()->serviceProvider->id; 
    
    $appointments = Appointment::with('user') 
        ->where('service_provider_id', $serviceProviderId)
        ->orderBy('appointment_datetime', 'desc') // Order by appointment date time
        ->get();
//dd($appointments);
    return Inertia::render('Admin/Service/Clients', [
        'appointments' => $appointments,
    ]);
}
}
