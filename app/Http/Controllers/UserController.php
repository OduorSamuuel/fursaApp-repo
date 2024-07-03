<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;



class UserController extends Controller
{
    public function search(Request $request)
    {
        $users = User::search($request->query('q'))->get();

        return response()->json([
            'query' => $request->query('q'),
            'data' => $users,
        ]);
    }
    public function show()
    {
        
        $user = Auth::user()->only(['name', 'username', 'email', 'last_seen_at', 'is_verified', 'is_admin', 'contact_number', 'image']);
        //dd($user);
        return Inertia::render('Accounts/AccountDetails', [
            'user' => $user,
        ]);
    }
    
    public function update(Request $request)
    {
        $user = Auth::user();
    
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'contact_number' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max size if needed
        ]);
    
        if ($request->hasFile('image')) {
            // Handle image upload
            $image = $request->file('image'); // Get the uploaded file instance
            $imageName = time() . '_' . $image->getClientOriginalName(); // Generate a unique name for the file
    
            // Move the image to public/image-uploads directory
            $image->move(public_path('image-uploads'), $imageName);
    
            // Delete old image if it exists
            if ($user->image && file_exists(public_path('image-uploads/' . $user->image))) {
                unlink(public_path('image-uploads/' . $user->image));
            }
    
            // Update the user record with the new image path
            $validatedData['image'] = 'image-uploads/' . $imageName;
        } else {
            // If no new image is uploaded, do not update the 'image' field in $validatedData
            unset($validatedData['image']);
        }
    
        $user->update($validatedData);
    
        return redirect()->back()->with('success', 'Account details updated successfully');
    }
    
    


public function index()
    {
        $users = User::all();
        return Inertia::render('Chat/Index', ['users' => $users]);
    }
    public function appointments()
    {
        return Inertia::render('Accounts/Appointments');
    }

}
