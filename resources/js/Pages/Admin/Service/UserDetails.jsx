import Sidebar from '@/Layouts/Admin/Sidebar'
import TopBar from '@/Layouts/Admin/TopBar'
import React, { useState } from 'react'
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faMapMarkerAlt, faDollarSign, faClock, faCheckCircle, faTimesCircle, faEdit, faCreditCard } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
    const { appointment } = usePage().props;
    const { service_request, user } = appointment;
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

    const updateStatus = () => {
        setIsUpdatingStatus(true);
        Inertia.post(`/update-status/${service_request.id}`, {
            status: 'Completed'
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsUpdatingStatus(false);
            },
            onError: () => {
                setIsUpdatingStatus(false);
                alert('Failed to update status. Please try again.');
            }
        });
    };

    const initiatePayment = () => {
        setIsInitiatingPayment(true);
        Inertia.post(`/initiate-payment/${service_request.id}`, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsInitiatingPayment(false);
            },
            onError: () => {
                setIsInitiatingPayment(false);
                alert('Failed to initiate payment. Please try again.');
            }
        });
    };

    return (
        <TopBar>
            <Sidebar>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">User Details</h1>
                    
                    <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                                <div className="text-center">
                                    <img 
                                        src={user.image ? `/storage/${user.image}` : '/path/to/default/image.jpg'} 
                                        alt={user.name} 
                                        className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
                                    />
                                    <h2 className="text-3xl font-semibold">{user.name}</h2>
                                    <p className="text-blue-200">{user.email}</p>
                                </div>
                                <div className="mt-8 space-y-4">
                                    <p><FontAwesomeIcon icon={faUser} className="mr-2" /> Username: {user.username}</p>
                                    <p><FontAwesomeIcon icon={faClock} className="mr-2" /> Last Seen: {new Date(user.last_seen_at).toLocaleString()}</p>
                                    <p><FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Verified: {user.is_verified ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div className="md:w-2/3 p-8">
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Booking Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 sm:col-span-1">
                                        <p className="text-gray-600 mb-1">Booking ID</p>
                                        <p className="font-semibold text-lg">{service_request.id}</p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <p className="text-gray-600 mb-1">Status</p>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            service_request.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                            service_request.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                            'bg-red-200 text-red-800'
                                        }`}>
                                            {service_request.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Booking Date</p>
                                        <p className="font-semibold">{new Date(service_request.booking_date).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />Location</p>
                                        <p className="font-semibold">{service_request.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><FontAwesomeIcon icon={faDollarSign} className="mr-2" />Amount</p>
                                        <p className="font-semibold text-lg">${service_request.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Payment Status</p>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            service_request.payment_status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                        }`}>
                                            {service_request.payment_status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 space-x-4">
                                    {service_request.payment_status === 'Pending' && service_request.status !== 'Cancelled by User' && (
                                        <button 
                                            onClick={initiatePayment}
                                            disabled={isInitiatingPayment}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                                            {isInitiatingPayment ? 'Initiating...' : 'Initiate Payment'}
                                        </button>
                                    )}
                                    {service_request.payment_status === 'Paid' && service_request.status !== 'Completed' && (
                                        <button 
                                            onClick={updateStatus}
                                            disabled={isUpdatingStatus}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            {isUpdatingStatus ? 'Updating...' : 'Mark as Completed'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-600 mb-1">Phone Number</p>
                                    <p className="font-semibold text-lg">{user.contact_number}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-1">Email</p>
                                    <p className="font-semibold text-lg">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </TopBar>
    )
}

export default UserDetails;