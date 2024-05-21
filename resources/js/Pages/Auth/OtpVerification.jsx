import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgress, Backdrop } from '@mui/material';

const OtpVerification = ({ userId }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success message
    try {
      console.log('Sending OTP verification request...'); // Debug statement
      const response = await axios.post('/verify-otp', { userId, otp });
      console.log('Response received:', response); // Debug statement

      if (response.data.success) {
        const successMessage = response.data.success;
        console.log('Success:', successMessage); // Debug statement
        setSuccess('OTP Verified Successfully. Redirecting...');
        
        setTimeout(() => {
          if (successMessage === 'serviceprovider_admin') {
            window.location.href = '/service/dashboard';
          } else if (successMessage === 'general_admin') {
            window.location.href = '/admin/dashboard';
          }
        }, 2000); // 2 seconds delay before redirect
      } else if (response.data.error) {
        const errorMessage = response.data.error;
        console.log('Setting error:', errorMessage); // Debug statement
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error occurred during OTP verification:', error); // Debug statement
      setError('Invalid hgvhgOTP');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">OTP Verification</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-blue-500 text-white rounded-md py-2 transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify OTP
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">Didn't receive OTP? <span className="underline cursor-pointer">Resend OTP</span></p>
      </div>
    </div>
  );
};

export default OtpVerification;
