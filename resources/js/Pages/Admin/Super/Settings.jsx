import React, { useEffect , useState} from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Settings() {
  const { user, success } = usePage().props;
console.log(user)
  const { data, put, processing, errors, setData } = useForm({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phoneNumber: user.contact_number || '',
    address: user.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    put(route('settings.update'), {
      onSuccess: () => {
        toast.success('Settings updated successfully.');
      },
      onError: (errors) => {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      },
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: faUser },
    { id: 'security', label: 'Security', icon: faLock },
  ];
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SidebarLayout user={user}>
    
      <main className="nxl-container bg-gray-100 min-h-screen">
        <div className="nxl-content max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Settings</h1>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-1/4 bg-gray-50 p-6">
                <div className="flex flex-col items-center mb-6">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                    src="https://via.placeholder.com/150"
                    alt="Admin profile"
                  />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">Administrator</p>
                </div>
                <nav>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-2 mt-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-lg ${
                        activeTab === tab.id
                          ? 'text-white bg-indigo-500'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FontAwesomeIcon icon={tab.icon} className="mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main content */}
              <div className="md:w-3/4 p-6">
                {activeTab === 'personal' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>{data.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>{data.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>{data.username}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>{data.phoneNumber}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={data.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                          ></textarea>
                        ) : (
                          <p>{data.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        {isEditing ? (
                          <input
                            type="password"
                            name="currentPassword"
                            value={data.currentPassword}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>********</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        {isEditing ? (
                          <input
                            type="password"
                            name="newPassword"
                            value={data.newPassword}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>********</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        {isEditing ? (
                          <input
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        ) : (
                          <p>********</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 text-right">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSaveChanges}
                  disabled={processing}
                  className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  {processing ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
}

export default Settings;
