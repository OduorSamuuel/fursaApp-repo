import React from 'react';
import Layout from '../Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import mpesa from '../../../public/Images/mpesa.jpeg';

const OrderConfirmation = ({ auth, bookingData }) => {
  const {
    date,
    time,
    notes,
    selectedTier,
    description,
    provider,
  } = bookingData;

  const { data, setData, post } = useForm({
    phone: '',
    date,
    time,
    notes,
    selectedTier,
    description,
    provider
  });

  const handleOrderConfirmation = () => {
    post('/appointments'); // Post to the Inertia route for creating appointments
  };

  return (
    <Layout auth={auth}>
      <Head title="Order Confirmation" />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Order Confirmation</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4 lg:pr-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Service Details</h2>
                  <p className="text-gray-700 mb-2"><strong>Company Name:</strong> {provider.company_name}</p>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {description}</p>
                  <p className="text-gray-700 mb-2"><strong>Service Provider:</strong> {provider.user_name}</p>
                  <p className="text-gray-700 mb-2"><strong>Contact Number:</strong> {provider.contact_number}</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> {provider.address}</p>
                  <p className="text-gray-700 mb-2"><strong>County:</strong> {provider.county_name}</p>
                  <p className="text-gray-700 mb-2"><strong>Service</strong> {provider.service_name}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Details</h2>
                  <p className="text-gray-700 mb-2"><strong>Date:</strong> {date}</p>
                  <p className="text-gray-700 mb-2"><strong>Time:</strong> {time}</p>
                  <p className="text-gray-700 mb-2"><strong>Notes:</strong> {notes || 'No additional notes'}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 col-span-1 md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pricing Tier</h2>
                  <p className="text-gray-700 mb-2"><strong>Name:</strong> {selectedTier.name}</p>
                  <p className="text-gray-700 mb-2"><strong>Price:</strong> {selectedTier.price}</p>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {selectedTier.description}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h2>
              <div className="flex justify-center mb-4">
                <img src={mpesa} alt="M-Pesa" className="h-20"/>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your phone number"
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleOrderConfirmation}
                >
                  Confirm to Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
