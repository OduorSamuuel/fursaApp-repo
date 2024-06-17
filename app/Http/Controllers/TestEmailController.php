<?php
// In app/Http/Controllers/TestEmailController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TestEmailController extends Controller
{
    public function index()
    {
        return Inertia::render('Test', ['status' => session('status')]);
    }

    public function send(Request $request)
    {
        Mail::raw('This is a test email.', function ($message) {
            $message->to('onyangos949@gmail.com')  // Replace with your test email address
                    ->subject('Test Email from Laravel');
        });

        return redirect()->route('test-email')->with('status', 'Test email sent!');
    }
}
