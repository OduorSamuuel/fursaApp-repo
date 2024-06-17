<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user()->only(['name', 'username', 'email', 'last_seen_at', 'is_verified', 'is_admin']);
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
    ]);

    $user->update($validatedData);

    return redirect()->route('accounts')->with('success', 'Account details updated successfully');
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
