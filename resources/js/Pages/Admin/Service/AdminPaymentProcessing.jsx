import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function AdminPaymentProcessing() {
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({ message: 'Processing your payment... Please be patient', icon: 'spinner', color: 'text-blue-500' });
  const [awaitingResponse, setAwaitingResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');
    if (!idFromUrl) {
      setResponseMessage('Error: No transaction ID found in URL');
      setLoading(false);
      setAwaitingResponse(false);
      return;
    }

    const interval = setInterval(() => {
      fetchPaymentStatus(idFromUrl);
    }, 5000);

    fetchPaymentStatus(idFromUrl);

    return () => clearInterval(interval);
  }, []);

  const fetchPaymentStatus = async (id) => {
    try {
      const response = await fetch('/admin-querystk-push');
      const data = await response.json();

      if (data.resultCode !== undefined) {
        handleResponse(data.resultCode, id);
        setLoading(false);
        setAwaitingResponse(false);
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      setLoading(false);
      setAwaitingResponse(false);
      setResponseMessage('Failed to retrieve payment status.');
    }
  };

  const handleResponse = (resultCode, id) => {
    if (resultCode === '1032') {
      setRedirecting(true);
      console.log(`Redirecting to user details page with id: ${id}`);
      Inertia.post(`/update-payment/${id}`, {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          // Handle success
        },
        onError: () => {
          setRedirecting(false);
          setResponseMessage('Error updating payment status. Please try again.');
        }
      });
    } else {
      switch (resultCode) {
        case '0':
          setPaymentStatus({ message: 'Payment successful', icon: faCheckCircle, color: 'text-green-500' });
          break;
        default:
          setPaymentStatus({ message: 'Payment failed', icon: faTimesCircle, color: 'text-red-500' });
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto text-center">
        {loading || redirecting ? (
          <div className="flex items-center justify-center mb-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mr-3"></div>
            <p className="text-lg font-semibold text-gray-800">{redirecting ? 'Success... ' : paymentStatus.message}</p>
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={paymentStatus.icon} size="4x" className={`mb-4 ${paymentStatus.color}`} />
            <p className="text-lg font-semibold text-gray-800">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPaymentProcessing;