// PaymentModal.jsx

import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const PaymentModal = ({ isOpen, onClose, clientName }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const contactNumber = 254111978124;
  const servicePrice = 100;

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 300); // Duration should match the CSS animation
    }
  }, [isOpen]);

  const handlePayment = () => {
    setLoading(true);
    setPaymentStatus(null);

    Inertia.post('/perform-stk-push', {
      mpesa_number: contactNumber,
      amount: servicePrice,
    }, {
      onFinish: () => setLoading(false),
      onSuccess: (page) => {
        setPaymentStatus(page.props.flash.message);
      },
      onError: () => {
        setPaymentStatus('Payment failed. Please try again.');
      }
    });
  };

  return (
    <>
      {showModal && (
        <>
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none transition-transform duration-300 ease-in-out transform ${
              isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Payment Details</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Client Name:</span> {clientName}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Contact Number:</span> {contactNumber}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Service Price:</span> ksh {servicePrice}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                >
                  {loading ? 'Processing...' : 'Confirm Payment'}
                </button>
              </div>
              {paymentStatus && (
                <div className="mt-4 text-sm text-gray-700">
                  {paymentStatus}
                </div>
              )}
            </div>
          </div>
          <div
            className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'ease-in' : 'ease-out'}`}
            onClick={onClose}
          ></div>
        </>
      )}
    </>
  );
};

export default PaymentModal;
