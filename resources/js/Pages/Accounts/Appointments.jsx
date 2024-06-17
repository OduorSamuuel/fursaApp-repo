import React from 'react';
import Accounts from '@/Layouts/Accounts/Accounts';
import Layout from '@/Layouts/Layout';
import { usePage } from '@inertiajs/react';

function Appointments({ auth }) {
  const { appointments } = usePage().props;

  return (
    <Layout auth={auth}>
      <Accounts>
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Appointments</h2>
          <div className="grid grid-cols-1 gap-6">
            {appointments.map(appointment => (
              <div key={appointment.id} className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-800">{appointment.service}</div>
                  <div className={`px-3 py-1 text-xs font-semibold text-${appointment.status === 'Completed' ? 'green' : 'yellow'}-600 bg-${appointment.status === 'Completed' ? 'green-100' : 'yellow-100'} rounded-full`}>
                    {appointment.status}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">Service Provider:</span>
                    <span>{appointment.service_provider_user_name}</span> {/* Display service provider's name */}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span className="mr-2">Booked Time:</span>
                    <span>{appointment.appointment_datetime}</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span className="mr-2">Notes:</span>
                    <span>{appointment.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Accounts>
    </Layout>
  );
}

export default Appointments;
