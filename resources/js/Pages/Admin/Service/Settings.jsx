// Settings.js
import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faUser, faEnvelope, faUserShield, faCalendarAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';

function Settings({ auth }) {
  const { user } = usePage().props;
  const [selectedOption, setSelectedOption] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    username: user.username,
    email: user.email,
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsEditing(false); // Exit edit mode when switching options
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      put(route('settings.update'), {
        onSuccess: () => {
          toast.success('Profile updated successfully!', { duration: 2000 });
          setIsEditing(false);
        },
        onError: () => {
          toast.error('Failed to update profile.', { duration: 2000 });
        }
      });
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  return (
    <TopBar auth={auth}>
      <SidebarLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex space-x-4">
              <button
                className={`${
                  selectedOption === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } px-4 py-2 rounded-md`}
                onClick={() => handleOptionChange('profile')}
              >
                Profile Settings
              </button>
              <button
                className={`${
                  selectedOption === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } px-4 py-2 rounded-md`}
                onClick={() => handleOptionChange('account')}
              >
                Account Settings
              </button>
            </div>
          </div>

          {selectedOption === 'profile' && (
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={handleToggleEdit}
                  disabled={processing}
                >
                  <FontAwesomeIcon icon={isEditing ? faSave : faEdit} size="lg" />
                </button>
              </div>
              <div className="space-y-8">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                    />
                  ) : (
                    <div className="w-3/4 text-gray-900">{user.name}</div>
                  )}
                </div>
                {errors.name && <div className="text-red-600">{errors.name}</div>}

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserShield} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Username:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={data.username}
                      onChange={handleChange}
                      className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                    />
                  ) : (
                    <div className="w-3/4 text-gray-900">{user.username}</div>
                  )}
                </div>
                {errors.username && <div className="text-red-600">{errors.username}</div>}

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                    />
                  ) : (
                    <div className="w-3/4 text-gray-900">{user.email}</div>
                  )}
                </div>
                {errors.email && <div className="text-red-600">{errors.email}</div>}

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Last Seen At:</label>
                  <div className="w-3/4 text-gray-900">{user.last_seen_at}</div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Verified:</label>
                  <div className="w-3/4 text-gray-900">{user.is_verified ? 'Yes' : 'No'}</div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserShield} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Admin:</label>
                  <div className="w-3/4 text-gray-900">{user.is_admin ? 'Yes' : 'No'}</div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                    onClick={() => setIsEditing(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedOption === 'account' && (
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h2>
              {/* Include account settings options here */}
              <p>Manage your subscription, view account status, delete account, etc.</p>
            </div>
          )}
        </div>
      </SidebarLayout>
    </TopBar>
  );
}

export default Settings;
