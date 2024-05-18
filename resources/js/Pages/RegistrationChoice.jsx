import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function RegistrationChoice() {
    return (
        <GuestLayout>
            <Head title="Choose Registration Type" />
            <div className="max-w-md mx-auto text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register as</h2>
                <div className="mt-6 flex flex-col space-y-4">
                    <Link href='/register' className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Client
                    </Link>
                    <Link href='/provider' className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Service Provider
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
