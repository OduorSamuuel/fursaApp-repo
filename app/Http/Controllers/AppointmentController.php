<?php
namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ServiceProvider;

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
        $appointments = Appointment::where('user_id', Auth::id())
            ->with('serviceProvider.user') // Eager load the serviceProvider and its user relationship
            ->get();
    
        // Optionally, iterate through each appointment and load the service provider's user name
        $appointments->each(function ($appointment) {
            $appointment->service_provider_user_name = $appointment->serviceProvider->user->name ?? 'Unknown'; // Handle case where user is not found
        });
    
        //dd($appointments);
        return Inertia::render('Accounts/Appointments', [
            'appointments' => $appointments
        ]);
    }
}
