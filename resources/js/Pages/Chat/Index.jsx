import React from 'react';
import { Head } from "@inertiajs/react";
import App from "@/Layouts/Chat.jsx";
import ChatLayout from '@/Layouts/Chat.jsx';
import Layout from '@/Layouts/Layout';
import Accounts from '@/Layouts/Accounts/Accounts';



export default function Index() {
    return (
 <>


<App>
<Head title="Chats" />

<div className="flex-col hidden lg:flex lg:w-2/3">
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-gray-600 text-white " >
        
       <div className=" font-semibold tracking-tight text-gray-300">
           Search and select someone to start chatting with 
       </div>
    </div>
</div>
</App>


</>

       
    )
}


