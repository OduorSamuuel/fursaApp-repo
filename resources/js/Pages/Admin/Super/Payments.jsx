import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import Header from '@/Components/Header';

function Payments() {
  const { serviceRequests,user } = usePage().props;
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const confirmPayment = () => {
    setLoading(true);

    Inertia.post('/payprovider', {
      requestId: selectedRequest.id,
      providerName: selectedRequest.user.name,
      originalAmount: selectedRequest.amount,
      amountAfterCommission: calculatePaymentAmount(selectedRequest.amount),
      serviceRequestId: selectedRequest.service_detail_id,
      // Add other necessary data you want to send
    })
    .then(() => {
      console.log('Payment confirmed successfully.');
      setShowModal(false);
      setLoading(false);
      // Optionally, update UI or perform other actions upon successful payment
    })
    .catch((error) => {
      console.error('Error confirming payment:', error);
      setLoading(false);
      // Handle errors here
    });
  };

  const parseAmount = (amount) => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatAmount = (amount) => {
    return parseAmount(amount).toFixed(2);
  };

  const calculatePaymentAmount = (amount) => {
    const parsedAmount = parseAmount(amount);
    const commission = parsedAmount * 0.15;
    return (parsedAmount - commission).toFixed(2);
  };

  return (
    <SidebarLayout user={user}>
   
      <main className="nxl-container">
        <div className="nxl-content">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Service Provider Payments</h1>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviceRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{request.service_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">sh {formatAmount(request.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handlePayment(request)}
                          className={`${
                            request.status === 'Completed'
                              ? 'bg-indigo-600 hover:bg-indigo-700'
                              : 'bg-gray-300 cursor-not-allowed'
                          } text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                          disabled={request.status !== 'Completed' || loading}
                        >
                          {loading ? 'Processing...' : 'Pay'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 sm:mx-auto">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Confirm Payment</h3>
                    <p className="text-sm text-gray-500">
                      You are about to pay <span className="font-bold">{selectedRequest?.user.name}</span> for their service.
                    </p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Total Amount: <span className="font-bold">sh {formatAmount(selectedRequest?.amount)}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Commission (15%): <span className="font-bold">sh {formatAmount(parseAmount(selectedRequest?.amount) * 0.15)}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Amount to be paid: <span className="font-bold">sh {calculatePaymentAmount(selectedRequest?.amount)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={confirmPayment}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Confirm Payment'}
                    </button>
                    <button
                      type="button"
                      className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </SidebarLayout>
  );
}

export default Payments;
