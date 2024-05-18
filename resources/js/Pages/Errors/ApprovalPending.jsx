// PendingApproval.jsx

import React from 'react';
import Layout from '@/Layouts/GuestLayout';

const PendingApproval = () => {
    const goToHomePage = () => {
        window.location.href = '/';
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <div className="mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-semibold mb-4">Pending Approval</h1>
                    <p className="text-gray-700 mb-4">
                        Your request is pending approval. You will be notified once it's approved.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={goToHomePage}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PendingApproval;
