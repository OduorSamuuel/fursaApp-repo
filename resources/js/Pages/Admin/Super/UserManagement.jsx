import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShieldAlt, faClock, faPhone, faCalendar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

function UserManagement() {
  const { user } = usePage().props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleVerifyUser = () => {
    setConfirmAction(() => () => {
      Inertia.post(`/users/${user.id}/verify`, {}, {
        onSuccess: () => {
          toast.success('User verification status updated.');
        },
        onError: () => {
          toast.error('Failed to update user verification status.');
        }
      });
    });
    setShowConfirmModal(true);
  };

  const handleAssignRole = (role) => {
    setConfirmAction(() => () => {
      Inertia.post(`/users/${user.id}/assign-role`, { role }, {
        onSuccess: () => {
          toast.success('User role updated.');
        },
        onError: () => {
          toast.error('Failed to update user role.');
        }
      });
    });
    setShowConfirmModal(true);
  };

  const handleDeleteUser = () => {
    setConfirmAction(() => () => {
      Inertia.delete(`/users/delete/${user.id}`, {
        onSuccess: () => {
          toast.success('User deleted successfully.');
        },
        onError: () => {
          toast.error('Failed to delete user.');
        }
      });
    });
    setShowConfirmModal(true);
  };

  const executeConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmModal(false);
  };

  return (
    <SidebarLayout>
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    User Management
                  </h2>
                </div>
              </div>

              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:items-center">
                      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                        <img className="h-24 w-24 rounded-full" src={`/${user.image}`} alt={user.name} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                        <p className="mt-1 text-sm text-gray-500">{user.username}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.is_verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h5 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h5>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                            Contact Number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.contact_number}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-gray-400" />
                            Role
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.is_admin ? 'Admin' : 'User'}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
                            Last Seen
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.last_seen_at}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-gray-900 mb-4">Account Information</h5>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                            Created At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.created_at}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                            Updated At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.updated_at}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">User Actions</h3>
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center">
                    <button
                      onClick={handleVerifyUser}
                      className={`w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${user.is_verified ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-3 sm:mb-0 sm:mr-3`}
                    >
                      {user.is_verified ? 'Revoke Verification' : 'Verify User'}
                    </button>
                    {
                      /* 
                         <select
                      onChange={(e) => handleAssignRole(e.target.value)}
                      value={user.is_admin ? 'admin' : 'user'}
                      className="w-full sm:w-auto mt-3 sm:mt-0 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mb-3 sm:mb-0 sm:mr-3"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select> */
                    }
                 
                    <button
                      onClick={handleDeleteUser}
                      className="w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showConfirmModal && (
            <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Confirm Action
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to perform this action? 
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={executeConfirmAction}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </SidebarLayout>
  );
}

export default UserManagement;
