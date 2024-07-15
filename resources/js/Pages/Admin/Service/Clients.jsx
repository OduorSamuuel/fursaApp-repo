import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';
import { Link, usePage } from '@inertiajs/react';
import PaymentModal from '../../PaymentModal'; // Adjust the path as per your file structure
import Sidebar from '@/Layouts/Admin/Sidebar';

const Clients = () => {
  const { appointments } = usePage().props;
  console.log(appointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handlePayment = (appointmentId) => {
    // Update payment status in the backend
    Inertia.post(`/appointments/${appointmentId}/pay`, {}, {
      onSuccess: () => {
        alert('Payment successful and invoice marked as paid.');
        handleCloseModal();
      },
      onError: (errors) => {
        alert('Payment failed.');
      },
    });
  };

  return (
    <TopBar>
      <Sidebar>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Client Name</th>
                  <th className="px-4 py-3">Appointment date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Services</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {appointments.map((appointment, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">{appointment.user.name}</td>
                    <td className="px-4 py-3">{appointment.booking_date}</td>
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
                    <td className="px-4 py-3">{appointment.service_type}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/userdetails/${appointment.id}`}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
                      >
                        View User
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Sidebar>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={selectedAppointment !== null}
        onClose={handleCloseModal}
        onPayment={() => handlePayment(selectedAppointment.id)}
        clientName={selectedAppointment?.user.name}
        contactNumber={selectedAppointment?.user.contact_number}
        servicePrice={selectedAppointment?.servicePrice} // Replace with actual service price
      />
    </TopBar>
  );
};

export default Clients;
