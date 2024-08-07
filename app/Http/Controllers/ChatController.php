<?php
namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Events\ReadMessageEvent;
use App\Http\Requests\ChatRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Chat;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        return inertia('Chat/Index', [
            'users' => UserCollection::make($this->getAllUsersWithChatData()),
        ]);
    }
    

    public function show(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('chat.index');
        }

        UserResource::withoutWrapping();

        $chats = $user->messages()->where('receiver_id', auth()->id())->whereNull('seen_at')->get();
        $result = $chats->each->update(['seen_at' => now()]);
        if ($result->count()) {
            $message = $result->last()->load('sender');
            broadcast(new ReadMessageEvent($message))->toOthers();
        }

        return inertia('Chat/Show', [
            'users' => UserCollection::make($this->getAllUsersWithChatData()),
            'chat_with' => UserResource::make($user),
            'messages' => $this->loadMessages($user),
        ]);
    }

    public function chat(User $user, ChatRequest $request)
    {
        $message = \Auth::user()->messages()->create([
            'receiver_id' => $user->id,
            'message' => $request->message,
            'reply_id' => $request->reply_id,
        ]);

        broadcast(new NewMessageEvent($message->load('receiver')))->toOthers();

        return redirect()->back();
    }

    public function destroy(Chat $chat)
    {
        if ($chat->sender_id !== auth()->id()) {
            abort(403);
        }

        $message = tap($chat)->update([
            'message_deleted_at' => now(),
        ]);

        broadcast(new NewMessageEvent($message->load('receiver')))->toOthers();

        return redirect()->back();
    }

    private function getAllUsersWithChatData()
    {
        $currentUser = Auth::user();
    
        $query = User::query()
            ->where('id', '!=', $currentUser->id);  // Exclude the current user
    
        // Apply role-based filters
        if ($currentUser->admin && $currentUser->admin->title === 'general_admin') {
            // General admin can see all service providers
            $query->whereHas('serviceProvider');
        } elseif ($currentUser->admin && $currentUser->admin->title === 'serviceprovider_admin') {
            // Service provider admin can see users who have booked their services and general admins
            $query->where(function ($q) use ($currentUser) {
                $q->whereHas('serviceRequests', function ($sq) use ($currentUser) {
                    $sq->where('service_provider_id', $currentUser->serviceProvider->id);
                })->orWhereHas('admin', function ($aq) {
                    $aq->where('title', 'general_admin');
                });
            });
        } elseif ($currentUser->serviceProvider) {
            // Service providers can see users who have booked their services and general admins
            $query->where(function ($q) use ($currentUser) {
                $q->whereHas('serviceRequests', function ($sq) use ($currentUser) {
                    $sq->where('service_provider_id', $currentUser->id);
                })->orWhereHas('admin', function ($aq) {
                    $aq->where('title', 'general_admin');
                });
            });
        } else {
            // Regular user can only see service providers they've booked
            $query->whereHas('serviceProvider', function ($q) use ($currentUser) {
                $q->whereHas('serviceRequests', function ($sq) use ($currentUser) {
                    $sq->where('user_id', $currentUser->id);
                });
            });
        }
    
        $users = $query->withCount(['messages' => fn($query) => $query->where('receiver_id', $currentUser->id)->whereNull('seen_at')])
            ->with([
                'sendMessages' => function ($query) use ($currentUser) {
                    $query->whereIn('id', function ($query) use ($currentUser) {
                        $query->selectRaw('max(id)')
                            ->from('chats')
                            ->where('receiver_id', $currentUser->id)
                            ->groupBy('sender_id');
                    });
                },
                'receiveMessages' => function ($query) use ($currentUser) {
                    $query->whereIn('id', function ($query) use ($currentUser) {
                        $query->selectRaw('max(id)')
                            ->from('chats')
                            ->where('sender_id', $currentUser->id)
                            ->groupBy('receiver_id');
                    });
                },
                'admin' // Eager load the admin relationship
            ])
            ->orderByDesc(function ($query) {
                $query->select('created_at')
                    ->from('chats')
                    ->whereColumn('sender_id', 'users.id')
                    ->orWhereColumn('receiver_id', 'users.id')
                    ->orderByDesc('created_at')
                    ->limit(1);
            })
            ->get();
    
        // Add "(Admin)" to general admin names for service providers
        if ($currentUser->serviceProvider || ($currentUser->admin && $currentUser->admin->title === 'serviceprovider_admin')) {
            $users = $users->map(function ($user) {
                if ($user->admin && $user->admin->title === 'general_admin') {
                    $user->name .= ' (Admin)';
                }
                return $user;
            });
        }
    
        return $users;
    }
    private function loadMessages($user)
    {
        return Chat::query()
            ->where(fn($query) => $query->where('sender_id', auth()->id())->where('receiver_id', $user->id))
            ->orWhere(fn($query) => $query->where('sender_id', $user->id)->where('receiver_id', auth()->id()))
            ->with(['receiver', 'sender', 'reply' => fn($query) => $query->with('sender')])
            ->orderBy('created_at')
            ->get()
            ->groupBy(function ($message) {
                return $message->created_at->isToday() ? 'Today' : ($message->created_at->isYesterday() ? 'Yesterday' :
                    $message->created_at->format('F j, Y'));
            })
            ->map(function ($messages, $date) {
                return [
                    'date' => $date,
                    'messages' => MessageResource::collection($messages),
                ];
            })
            ->values()
            ->toArray();
    }
}