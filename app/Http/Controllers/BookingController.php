<?php
// app/Http/Controllers/BookingController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
