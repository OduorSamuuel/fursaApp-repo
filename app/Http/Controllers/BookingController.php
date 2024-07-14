<?php
// app/Http/Controllers/BookingController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\ServiceProvider;
use App\Models\ServiceDetails;
use Illuminate\Support\Facades\Auth;
use App\Models\ServiceRequest;
use App\Models\CancelledRequest;


use App\Models\ServiceProviders;


class BookingController extends Controller
{
    public function confirmBooking(Request $request)
{
    // Validate the incoming request
    $validated = $request->validate([
        'date' => 'required|date',
        'time' => 'required',
        'selectedTier' => 'required|array',
        'description' => 'required|string',
        'provider' => 'required|array',
    ]);
 
    // Store the validated data in the session
    session(['bookingData' => $validated]);

    return redirect()->route('order-confirmation');
}
    public function getBookingData()
    {
        // Retrieve the booking data from the session
        $bookingData = session('bookingData');

        // Pass the booking data to the frontend
        return Inertia::render('OrderConfirmation', [
            'bookingData' => $bookingData,
        ]);
    }
    public function index(Request $request)
{
    // Validate incoming request data if needed
    $request->validate([
        'data.provider' => 'required|array',
        'data.availability' => 'required|array',
        'data.selectedTier' => 'required|array',
        'data.service_detail_id' => 'required',
    ]);


   
    $provider = $request->input('data.provider');
    $availability = $request->input('data.availability');
    $selectedTier = $request->input('data.selectedTier');

    $service_detail_id = $request->input('data.service_detail_id');

  
    $bookingData = [
        'provider' => $provider,
        'availability' => $availability,
        'selectedTier' => $selectedTier,
        'service_detail_id' => $service_detail_id,
    ];
  

    $request->session()->put('booking_data', $bookingData);
    $request->session()->put('expires_at', now()->addMinutes(5));

    // Example of passing data back to the frontend using Inertia
    return redirect()->route('booking.confirmation')->with([
        'bookingData' => $bookingData,
    ]);
}
public function confirmation(Request $request)
{
    // Retrieve the booking data from the session
    $bookingData = $request->session()->get('booking_data');

    // Pass the booking data to the Inertia response
    return Inertia::render('Booking', [
        'bookingData' => $bookingData,
    ]);
}
public function summary(Request $request)
{
    // Define validation rules
    $rules = [
        'bookingData.provider' => 'required|array',
        'bookingData.availability' => 'required|array',
        'bookingData.selectedTier' => 'required|array',
        'bookingData.service_detail_id' => 'required',

        'selectedDate' => 'required|date',
        'selectedTime' => 'required|string',
    ];

    // Validate incoming request
    $validator = Validator::make($request->all(), $rules);

    // If validation fails, return with errors
    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    // If validated, store data in session
    $bookingData = [
        'provider' => $request->input('bookingData.provider'),
        'availability' => $request->input('bookingData.availability'),
        'selectedTier' => $request->input('bookingData.selectedTier'),
        'service_detail_id' => $request->input('bookingData.service_detail_id'),
    ];

    $selectedDate = $request->input('selectedDate');
    $selectedTime = $request->input('selectedTime');

    $request->session()->put('bookingSummary', [
        'bookingData' => $bookingData,
        'selectedDate' => $selectedDate,
        'selectedTime' => $selectedTime,
    ]);

  
    return redirect()->route('booking.view');
}
public function viewSummary(Request $request)
{
    // Retrieve data from session
    $bookingSummary = $request->session()->get('bookingSummary');

    // If data is not found in session, handle accordingly (optional)
    if (!$bookingSummary) {
 
        return redirect()->route('booking.confirmation');
    }

  
    return Inertia::render('BookingPayment', [
        'bookingSummary' => $bookingSummary,
    ]);
}
public function payment(Request $request)
{
  
    return redirect()->route('booking.payment.process');

  


}

public function createBooking(Request $request)
{
    $bookingSummary = $request->input('bookingSummary');
    $totalCost = $request->input('totalCost');
    $phoneNumber = $request->input('phoneNumber');

    // Retrieve user_id based on the authenticated user or however it's managed
    $userId = auth()->id(); // Adjust as per your authentication setup

    // Extract data from bookingSummary
    $bookingData = $bookingSummary['bookingData'];
    $selectedDate = $bookingSummary['selectedDate'];
    $selectedTime = $bookingSummary['selectedTime'];

    // Format selectedTime into 24-hour format
    $timeIn24Format = date('H:i:s', strtotime($selectedTime));

    // Combine selectedDate and timeIn24Format
    $bookingDateTime = $selectedDate . ' ' . $timeIn24Format;

    // Prepare data for insertion
    $bookingDataToInsert = [
        'user_id' => $userId,
        'service_provider_id' => $bookingData['provider']['service_provider_id'],
        'service_detail_id' => $bookingData['service_detail_id'], // Include service_detail_id
        'booking_date' => $bookingDateTime,
        'location' => $bookingData['provider']['address'] . ', ' . $bookingData['provider']['county_name'],
        'status' => 'Pending',
        'amount' => $totalCost,
        'payment_status' => 'Pending', 
    ];
 

    // Create ServiceRequest record
    $serviceRequest = ServiceRequest::create($bookingDataToInsert);

    return redirect()->route('appointments.index');
}
public function cancelService(Request $request, $id)
{
    $request->validate([
        'reasons' => 'required|array',
    ]);

    $serviceRequest = ServiceRequest::findOrFail($id);
    $serviceRequest->status = 'Cancelled by User';
    $serviceRequest->save();

    // Save the cancellation reasons
    CancelledRequest::create([
        'service_request_id' => $id,
        'reasons' => json_encode($request->reasons),
    ]);

    return  redirect ()->back()->with('success', 'Service request cancelled successfully'); 
}
}