<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ServiceDetails;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    //
    public function index($serviceDetailId)
    {
        
        $serviceDetail = ServiceDetails::with('serviceProvider.user')->findOrFail($serviceDetailId);
    
        // Access the service provider's name
        $serviceProviderName = $serviceDetail->serviceProvider->user->name; // Adjust 'name' based on your User model field
    //dd($serviceDetail);
   //dd($serviceProviderName);
        return Inertia::render('Rating', [
            'serviceDetail' => $serviceDetail,
            'serviceProviderName' => $serviceProviderName,
        ]);
    }
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'service_providers_id' => 'required',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:255',
        ]);

        // Create a new rating instance
        $rating = new Rating();
        $rating->service_providers_id = $request->service_providers_id;
        $rating->user_id = Auth::id(); // Assign current user's ID
        $rating->rating = $request->rating;
        $rating->comment = $request->comment;
        $rating->save();
        dd("Success");

        // Redirect back to the previous page using Inertia
        return redirect()->back()->with('success', 'Rating submitted successfully!');
    }

}
