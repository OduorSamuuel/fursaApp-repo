// Accounts.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react'; 

function Accounts({ children, selectedLink }) {
  return (
    <div className="flex min-h-screen p-4 bg-gray-100">
      <div className="w-1/4 p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Account </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/accounts"
                className={`w-full flex items-center text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                  selectedLink === 'accountDetails' ? 'bg-gray-500 text-white font-semibold focus:bg-gray-600 hover:bg-gray-600' : 'focus:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                <span>Account Details</span>
              </Link>
            </li>
            <li>
              <Link
                href="/accounts/appointments"
                className={`w-full flex items-center text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                  selectedLink === 'appointments' ? 'bg-gray-500 text-white font-semibold focus:bg-gray-600 hover:bg-gray-600' : 'focus:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/accounts/messages"
                className={`w-full flex items-center text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                  selectedLink === 'messages' ? 'bg-gray-500 text-white font-semibold focus:bg-gray-600 hover:bg-gray-600' : 'focus:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link
                href="/accounts/transactions"
                className={`w-full flex items-center text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                  selectedLink === 'transactions' ? 'bg-gray-500 text-white font-semibold focus:bg-gray-600 hover:bg-gray-600' : 'focus:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>Transactions</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-3/4 p-2 bg-white shadow-lg rounded-md ml-4">
        {children}
      </div>
    </div>
  );
}

export default Accounts;
