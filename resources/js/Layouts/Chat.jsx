import React, { useEffect } from 'react';
import MineProfileChat from "@/Components/MineProfileChat.jsx";
import SearchChatBar from "@/Components/Chat/SearchChatBar.jsx";
import ChatListUser from "@/Components/ChatListUser.jsx";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import Layout from './Layout';
import Accounts from './Accounts/Accounts';
import SidebarLayout from '../Layouts/Admin/SidebarLayout'; // Ensure this import matches your actual file structure
import TopBar from './Admin/TopBar';
import Sidebar from './Admin/Sidebar';

export default function App({ children }) {
    const { auth } = usePage().props;
    console.log("Auth ansnsn", auth.adminTitle);

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
        let className = "px-5 py-2 pb-5 lg:w-1/3 lg:border-r lg:border-gray-300 bg-violet-300";

        if (currentPath === 'chat.index') className += "flex flex-col w-full";
        else className += "hidden flex-col lg:flex";

        return className;
    };

    if (auth.user.is_admin) {
        if (auth.adminTitle === 'general_admin') {
            return (
                <SidebarLayout user={auth.user}>
                    <main className="nxl-container">
                        <div className="nxl-content">
                            <div className="px-6 mx-auto max-w-screen-2xl xl:px-0">
                                <div className="flex overflow-hidden w-full h-96 shadow">
                                    <div className={renderSidebarScreen()}>
                                        <MineProfileChat auth={auth} />
                                        <ChatListUser />
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </SidebarLayout>
            );
        } else if (auth.adminTitle === 'serviceprovider_admin') {
            return (
                <TopBar>
                    <Sidebar>
                        <div className="px-6 mx-auto max-w-screen-2xl xl:px-0">
                            <div className="flex overflow-hidden w-full h-96 shadow">
                                <div className={renderSidebarScreen()}>
                                    <MineProfileChat auth={auth} />
                                    <ChatListUser />
                                </div>
                                {children}
                            </div>
                        </div>
                    </Sidebar>
                </TopBar>
            );
        }
    }

    return (
        <Layout auth={auth}>
            <Accounts>
                <div className="px-6 mx-auto max-w-screen-2xl xl:px-0">
                    <div className="flex overflow-hidden w-full h-96 shadow">
                        <div className={renderSidebarScreen()}>
                            <MineProfileChat auth={auth} />
                            <ChatListUser />
                        </div>
                        {children}
                    </div>
                </div>
            </Accounts>
        </Layout>
    );
}
