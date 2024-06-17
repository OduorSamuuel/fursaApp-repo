import React, { useEffect } from 'react';
import MineProfileChat from "@/Components/MineProfileChat.jsx";
import SearchChatBar from "@/Components/Chat/SearchChatBar.jsx";
import ChatListUser from "@/Components/ChatListUser.jsx";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import Layout from './Layout';

export default function App ({ children}) {
    const { auth } = usePage().props;

    useEffect(() => {
        const debouncedReload = debounce(() => {
            router.reload({
                preserveScroll: true,
                only: ['messages', 'users'],
            });
        }, 350);

        Echo.private('message.' + auth.user.uuid)
            .listen('ReadMessageEvent', () => {
                debouncedReload();
            })
            .listen('NewMessageEvent', () => {
                debouncedReload();
            });

        return () => {
            Echo.private('message.' + auth.user.uuid)
                .stopListening('ReadMessageEvent', () => {
                    debouncedReload();
                })
                .stopListening('NewMessageEvent');
        };
    }, []);

    const renderSidebarScreen = () => {
        const currentPath = route().current();
        let className = "px-5 py-2 pb-5 lg:w-1/3  lg:border-r lg:border-gray-700 bg-slate-700 "

        if (currentPath === 'chat.index') className += "flex flex-col w-full "
        else  className += "hidden flex-col lg:flex"

        return className;
    }

    return (
 
     <Layout auth={auth}>

     
     <div className="px-6 mx-auto max-w-screen-2xl xl:px-0 ml-6 mr-6   "  >
                 <div className="  py-6" style={{ height: '550px ' }}>
                     <div className="flex h-full overflow-hidden border border-gray-700 rounded-lg shadow">
                         <div className={renderSidebarScreen()}>
                           
                           
                             <MineProfileChat auth={auth} />
                             <SearchChatBar />
                            
                         
                           
                           
                            
                         </div>

                    {children}      
                       
                     

                     </div>
                 </div>
             </div>

       
         </Layout>
   
      
           

       

       
    )
}
