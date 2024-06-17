import React from 'react';
import { Head } from "@inertiajs/react";
import App from "@/Layouts/Chat.jsx";
import ChatLayout from '@/Layouts/Chat.jsx';


export default function Index() {
    return (
 <>
 
 <Head title="Chats" />

<div className="flex-col hidden lg:flex lg:w-2/3">
    <div className="flex items-center justify-center h-screen bg-gray-500" >
       <div className=" font-semibold tracking-tight text-gray-300">
           Search and select someone to start chatting with 
       </div>
    </div>
</div>
</>

       
    )
}

Index.layout = (page) => <ChatLayout children={page}/>;
