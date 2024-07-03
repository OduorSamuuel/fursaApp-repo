import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function PaymentProcessing() {
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({ message: 'Processing your payment... Please be patient', icon: 'spinner', color: 'text-blue-500' });
  const [awaitingResponse, setAwaitingResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPaymentStatus();
    }, 5000);

    fetchPaymentStatus();

    return () => clearInterval(interval);
  }, []);

  const fetchPaymentStatus = async () => {
    try {
      const response = await fetch('/querystk-push');
      const data = await response.json();
      
      if (data.resultCode !== undefined) {
        handleResponse(data.resultCode, data.message);
        console.log(data.responseData);
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

  const handleResponse = (resultCode, message) => {
    if (resultCode === '0') {
      setRedirecting(true);
      Inertia.get('/booking-done');
    } else {
      switch (resultCode) {
        case '1032':
          setPaymentStatus({ message: message, icon: faCheckCircle, color: 'text-green-500' });
          break;
        default:
          setPaymentStatus({ message: message, icon: faTimesCircle, color: 'text-red-500' });
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

export default PaymentProcessing;
