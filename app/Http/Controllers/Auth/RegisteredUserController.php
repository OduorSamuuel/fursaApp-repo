<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Mail\UserVerification;
use App\Models\Admin;
use App\Models\Role;

use App\Models\ServiceProvider;
use App\Models\ServiceDetails;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    public function createClient(): Response
    {
        return Inertia::render('Auth/RegisterClient');
    }

    public function storeClient(Request $request)
{

    // Validate incoming request data
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', 'min:8'],
        'contact_number' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);
//dd($request->all());
    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    $username = explode('@', $request->email)[0];
    $verificationToken = Str::random(60);

    try {
        // Handling the image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->move(public_path('image-uploads'), $filename);
        } else {
            return redirect()->back()->with('error', 'Image upload failed.');
        }

       
        $number_prefix = '254';
      
        $fullContactNumber = $number_prefix . $request->contact_number;



        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'contact_number' => $fullContactNumber, // Save with prefix added
            'image' => 'image-uploads/' . $filename,
            'uuid' => Str::uuid(),
            'verification_token' => $verificationToken,
            'token_expiration_time' => now()->addHours(24),
            'is_verified' => false,
            'is_admin' => false,
        ]);

        // Dispatch Registered event
        event(new Registered($user));

        $tokenLink = route('verification', ['token' => $verificationToken]);

        try {
            Mail::to($user->email)->send(new UserVerification($tokenLink));
        } catch (\Exception $e) {
            return back()->with('error', 'Registration successful, but the verification email could not be sent.');
        }

        return redirect()->back()->with('success', 'Registration successful. Please check your email for verification.');

    } catch (\Exception $e) {
        return back()->with('error', 'Something went wrong during user creation. Please try again.');
    }
}    
public function storeServiceProvider(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', 'min:8'],
        'company_name' => 'required|string|max:255',
        'service_type' => 'required|string|max:255',
        'contact_number' => 'required|string',
        'address' => 'required|string|max:255',
        'county_id' => 'nullable|exists:counties,id',
        'service_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'service_category' => 'required|string|max:255', // Validate service_category
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    $username = explode('@', $request->email)[0];
    $verificationToken = Str::random(60);
    $fullPhoneNumber = '254' . $request->contact_number;
    DB::beginTransaction();

    try {
        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'contact_number' => $fullPhoneNumber,
            'image' => 'null',
            'uuid' => Str::uuid(),
            'verification_token' => $verificationToken,
            'token_expiration_time' => now()->addHours(24),
            'is_verified' => false,
            'is_admin' => true,
        ]);

        // Dispatch Registered event
        event(new Registered($user));

        $serviceProvider = ServiceProvider::create([
            'user_id' => $user->id,
            'company_name' => $request->company_name,
            'service_type' => $request->service_type,
            'contact_number' => $fullPhoneNumber,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'is_approved' => false,
            'county_id' => $request->county_id,
        ]);

        // Create ServiceDetails associated with the service provider
        $serviceDetails = ServiceDetails::create([
            'service_provider_id' => $serviceProvider->id,
            'category' => $request->service_category, // Capture service_category here
            'service_description' => 'Add your service description here', // Example, adjust as needed
        ]);

        Admin::create([
            'user_id' => $user->id,
            'title' => 'serviceprovider_admin',
        ]);

        $tokenLink = route('verification', ['token' => $verificationToken]);

        try {
            Mail::to($request->email)->send(new UserVerification($tokenLink));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Registration successful, but the verification email could not be sent.');
        }

        DB::commit();
        return redirect()->back()->with('success', 'Registration successful. Please check your email for verification.');

    } catch (\Exception $e) {
        DB::rollBack();
        
        return back()->with('error', 'Something went wrong during user creation. Please try again.');
    }
}

    private function generateUniqueVerificationToken()
    {
        // Generate a unique verification token here
        return Str::random(60);
    }
}
