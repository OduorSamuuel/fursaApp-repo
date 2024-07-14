import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { PhoneIcon, EnvelopeIcon, BuildingOfficeIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

function EditCustomer() {
    const { serviceProvider } = usePage().props;
    const [isApproved, setIsApproved] = useState(serviceProvider.is_approved);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');

    const handleApprove = (action) => {
        setActionType(action);
        setShowModal(true);
    };

    const confirmAction = () => {
        const isApprovedAction = actionType === 'approve';
        Inertia.post(route('admin.updateApprovalStatus', serviceProvider.id), {
            is_approved: isApprovedAction,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
        setIsApproved(isApprovedAction);
        setShowModal(false);
    };

    return (
        <SidebarLayout>
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
                            <h1 className="text-4xl font-extrabold text-white tracking-wide">Service Provider Details</h1>
                        </div>
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">User Information</h2>
                                    <div className="space-y-3">
                                        <p className="flex items-center text-gray-700">
                                            <span className="font-semibold mr-2 text-indigo-600">Name:</span> {serviceProvider.user.name}
                                        </p>
                                        <p className="flex items-center text-gray-700">
                                            <EnvelopeIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                            {serviceProvider.user.email}
                                        </p>
                                        <p className="flex items-center text-gray-700">
                                            <PhoneIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                            {serviceProvider.user.contact_number}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">Company Details</h2>
                                    <div className="space-y-3">
                                        <p className="flex items-center text-gray-700">
                                            <BuildingOfficeIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                            {serviceProvider.company_name}
                                        </p>
                                        <p className="flex items-center text-gray-700">
                                            <ComputerDesktopIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                            {serviceProvider.service_type}
                                        </p>
                                        <p className="flex items-center text-gray-700">
                                            <span className="font-semibold mr-2 text-indigo-600">County:</span> {serviceProvider.county.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">Service Details</h2>
                                    <div className="space-y-3">
                                        <p className="text-gray-700">
                                            <span className="font-semibold text-indigo-600">Category:</span> {serviceProvider.service_details.category}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-semibold text-indigo-600">Description:</span> {serviceProvider.service_details.service_description}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">Approval Status</h2>
                                    <button
                                        onClick={() => handleApprove(isApproved ? 'revoke' : 'approve')}
                                        className={`w-full px-6 py-3 rounded-full text-white font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                                            isApproved 
                                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                        }`}
                                    >
                                        {isApproved ? 'Revoke Approval' : 'Approve Service Provider'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 4h.01M6 8h.01M6 16h.01M18 8h.01M18 16h.01" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        {actionType === 'approve' ? 'Approve Service Provider' : 'Revoke Approval'}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to {actionType === 'approve' ? 'approve' : 'revoke the approval of'} this service provider?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={confirmAction}
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}

export default EditCustomer;
