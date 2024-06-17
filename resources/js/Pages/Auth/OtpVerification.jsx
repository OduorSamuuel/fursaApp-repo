import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Backdrop } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = ({ userId }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/verify-otp', { userId, otp });

            if (response.data.success) {
                const successMessage = response.data.success;
                toast.success('OTP Verified Successfully.'); // Use toast.success to display success message

                setTimeout(() => {
                    if (successMessage === 'serviceprovider_admin') {
                        window.location.href = '/service/dashboard';
                    } else if (successMessage === 'general_admin') {
                        window.location.href = '/admin/dashboard';
                    }
                }, 2000);
            } else if (response.data.error) {
                toast.error(response.data.error); // Use toast.error to display error message
            } else {
                toast.error('An unexpected error occurred.');
            }
        } catch (error) {
            toast.error('Invalid OTP.');
        }
        setLoading(false);
    };

    useEffect(() => {
        // Show OTP sent message when component mounts
        const otpSentMessage = 'OTP has been sent to your email'; // Retrieve this message from wherever it's stored
        toast.success(otpSentMessage); // Use toast.success to display OTP sent message
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-400">
            <ToastContainer /> {/* Include the ToastContainer component here */}
            <Backdrop open={loading} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">OTP Verification</h2>
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
                <p className="text-sm text-gray-500 mt-4 text-center">Didn't receive OTP?<span className="underline cursor-pointer">Resend OTP</span></p>
            </div>
        </div>
    );
};

export default OtpVerification;
