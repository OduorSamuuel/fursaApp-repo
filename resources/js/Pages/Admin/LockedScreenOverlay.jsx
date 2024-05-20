import React, { useState } from 'react';
import axios from 'axios';


import { CircularProgress, Backdrop } from '@mui/material';

function LockedScreenOverlay() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlockScreen = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error

    try {
      const response = await axios.post('/unlock-screen', { password });

      if (response && response.data && response.data.success) {
        setPassword('');
        setError('');
        // Redirect based on the success response
        switch (response.data.success) {
          case 'serviceprovider_admin':
            window.location.href = '/service/dashboard';
            break;
          case 'general_admin':
            window.location.href = '/admin/dashboard';
            break;
          default:
            // Redirect to a default route if the user role is not recognized
            Inertia.reload();
            break;
        }
      } else if (response && response.data && response.data.error) {
        setError(response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error occurred while unlocking the screen:', error);
      setError('An error occurred while unlocking the screen.');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-white w-96 p-8 rounded-lg shadow-xl">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-red-500"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm2 13a2 2 0 11-4 0 2 2 0 014 0zm-2-7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Screen is Locked</h2>
          <p className="text-gray-600 mb-4">Please enter your password to unlock</p>
          <form onSubmit={handleUnlockScreen} className="mb-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your password"
            />
            <button type="submit" className="btn btn-primary w-full mt-4">Unlock</button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
          <div className="text-sm text-gray-500">For security reasons, access is restricted.</div>
        </div>
      </div>
    </div>
  );
}

export default LockedScreenOverlay;
