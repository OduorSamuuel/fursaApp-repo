import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function RegistrationChoice() {
    return (
    <>
      <Head title="Choose Registration Type" />
            <div className="flex justify-center items-center h-screen bg-stone-100" >
                <div className=" bg-slate-300 rounded-lg shadow-lg p-8" >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register as</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href='/register' className="py-3 px-6 border border-transparent text-center text-sm font-semibold rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Client
                        </Link>
                        <Link href='/provider' className="py-3 px-6 border border-transparent text-center text-sm font-semibold rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Service Provider
                        </Link>
                    </div>
                </div>
            </div>
     </>
          
    );
}
