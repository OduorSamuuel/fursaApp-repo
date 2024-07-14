<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ServiceDetails;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function index($serviceDetailId)
{
    $serviceDetail = ServiceDetails::with('serviceProvider.user')->findOrFail($serviceDetailId);
    $serviceProviderName = $serviceDetail->serviceProvider->user->name;

    // Check if the user has already rated this service provider for this service detail
    $existingRating = Rating::where('user_id', Auth::id())
        ->where('service_provider_id', $serviceDetail->service_provider_id)
        ->where('service_detail_id', $serviceDetailId)
        ->first();
    

    return Inertia::render('Rating', [
        'serviceDetail' => $serviceDetail,
        'serviceProviderName' => $serviceProviderName,
        'existingRating' => $existingRating,
    ]);
}
public function store(Request $request)
{
    try {
        // Validate incoming request data
        $request->validate([
            'service_providers_id' => 'required|exists:service_providers,id',
            'service_detail_id' => 'required|exists:service_details,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:255',
        ]);

        // Create a new rating instance
        $rating = new Rating();
        $rating->service_provider_id = $request->service_providers_id;
        $rating->user_id = Auth::id(); // Assign current user's ID
        $rating->rating = $request->rating;
        $rating->comment = $request->comment;
        $rating->service_detail_id = $request->service_detail_id;
    
        $rating->save();


        // Redirect back to the previous page using Inertia
        return redirect()->back()->with('success', 'Rating submitted successfully!');
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation errors
        return redirect()->back()->withErrors($e->validator)->withInput();
    } catch (\Exception $e) {
        // Log the error for debugging
        \Log::error('Rating submission failed: ' . $e->getMessage());

        // Redirect back with a general error message
        return redirect()->back()->with('error', 'Failed to submit rating. Please try again.');
    }
}
public function update(Request $request, $id)
{
    try {
        // Validate incoming request data
        $request->validate([
            'service_providers_id' => 'required|exists:service_providers,id',
            'service_detail_id' => 'required|exists:service_details,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:255',
        ]);

        // Find the existing rating
        $rating = Rating::findOrFail($id);
        $rating->service_provider_id = $request->service_providers_id;
        $rating->user_id = Auth::id(); // Assign current user's ID
        $rating->rating = $request->rating;
        $rating->comment = $request->comment;
        $rating->service_detail_id = $request->service_detail_id;

        $rating->save();

        return redirect()->back()->with('success', 'Rating updated successfully!');
    } catch (\Illuminate\Validation\ValidationException $e) {
        return redirect()->back()->withErrors($e->validator)->withInput();
    } catch (\Exception $e) {
        \Log::error('Rating update failed: ' . $e->getMessage());
        return redirect()->back()->with('error', 'Failed to update rating. Please try again.');
    }
}

}
