<?php
namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ServiceProvider;
use App\Models\ServiceRequest;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
       // dd($request->all());
        $request->validate([
            'phone' => 'required',
            'date' => 'required',
            'time' => 'required',
        ]);
   

        $appointment = Appointment::create([
            'user_id' => Auth::id(),
            'service_provider_id' => $request->provider['service_provider_id'], 
            'appointment_datetime' => $request->date . ' ' . $request->time,
            'service' => $request->provider['service_name'],
            'status' => 'Pending',
            'notes' => $request->notes,
        ]);

       // dd($appointment);
        return redirect()->route('appointments.index');
    }

    public function index()
    {
        $serviceRequests = ServiceRequest::where('user_id', Auth::id())
            ->with([
                'serviceProvider.user', // Eager load the serviceProvider and its user relationship
                'payment',
                'serviceProvider.serviceDetails.images', // Eager load images related to serviceDetails
            ])
            ->get();
    
        $serviceRequests->each(function ($serviceRequest) {
            // Extract service provider user name
            $serviceProviderUserName = $serviceRequest->serviceProvider->user->name ?? 'Unknown';
            $serviceRequest->setAttribute('service_provider_user_name', $serviceProviderUserName);
    
            // Extract first image path from images relation of service details
            $firstImagePath = $serviceRequest->serviceProvider->serviceDetails->images->first()->path ?? null;
            $serviceRequest->setAttribute('first_image_path', $firstImagePath);
        });
    
   
    
        return Inertia::render('Accounts/Appointments', [
            'serviceRequests' => $serviceRequests
        ]);
    }
}   
