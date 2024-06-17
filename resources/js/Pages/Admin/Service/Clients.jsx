// Clients.jsx

import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';
import { usePage } from '@inertiajs/react';
import PaymentModal from '../../PaymentModal'; // Adjust the path as per your file structure

const Clients = () => {
  const { appointments } = usePage().props;
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleInitiatePayment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <TopBar>
      <SidebarLayout>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Client Name</th>
                  <th className="px-4 py-3">Appointment Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Appointment Date</th>
                  <th className="px-4 py-3">Services</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {appointments.map((appointment, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">{appointment.user.name}</td>
                    <td className="px-4 py-3">{appointment.appointment_datetime}</td>
                    <td className="px-4 py-3 text-xs">
                      <span
                        className={`px-2 py-1 font-semibold leading-tight ${
                          appointment.status === 'Confirmed'
                            ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                            : appointment.status === 'Pending'
                            ? 'text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600'
                            : 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700'
                        } rounded-full`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{appointment.appointment_date}</td>
                    <td className="px-4 py-3">{appointment.service}</td>
                    <td className="px-4 py-3">
                      {appointment.status === 'Pending' && (
                        <button
                          onClick={() => handleInitiatePayment(appointment)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                          Initiate Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SidebarLayout>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={selectedAppointment !== null}
        onClose={handleCloseModal}
        clientName={selectedAppointment?.user.name}
        contactNumber={selectedAppointment?.user.contact_number}
        servicePrice={selectedAppointment?.servicePrice} // Replace with actual service price
      />
    </TopBar>
  );
};

export default Clients;
