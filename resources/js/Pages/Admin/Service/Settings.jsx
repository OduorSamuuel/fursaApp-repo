import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faUser, faEnvelope, faUserShield, faCalendarAlt, faCheckCircle, faPhone, faImage, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

import Sidebar from '@/Layouts/Admin/Sidebar';
import TopBar from '@/Layouts/Admin/TopBar';

function Settings({ auth }) {
  const { user } = usePage().props;
  const [selectedOption, setSelectedOption] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const contactNumberHeader = '254';
  const contactNumberRest = user.contact_number.slice(3);

  const { data, setData, post, processing, errors } = useForm({
    name: user.name,
    username: user.username,
    email: user.email,
    contact_number: contactNumberRest,
    image: null,
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsEditing(false);
    setShowPasswordFields(false);
  };

  const handleToggleEdit = (e) => {
    if (isEditing) {
      const formData = new FormData();
      for (const key in data) {
        if (key === 'image' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (key !== 'image') {
          formData.append(key, data[key]);
        }
      }
      e.preventDefault();
      post(route('service.settings.update'), formData, {
   
        onSuccess: () => toast.success('Settings updated successfully.'),
        onError: () => toast.error('An error occurred while updating your profile.'),
        onAfter: () => setIsEditing(false),
      });
    } else {
      setIsEditing(true);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setData(name, files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setData(name, value);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <TopBar auth={auth}>
      <Sidebar>
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
                  <FontAwesomeIcon icon={faImage} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Profile Image:</label>
                  <div className="w-3/4">
                    {isEditing ? (
                      <div>
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="w-full p-3 border rounded-lg focus:ring focus:border-blue-300"
                        />
                        {previewImage && (
                          <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
                        )}
                      </div>
                    ) : (
                      <img
                        src={user.image !== 'null' ?  `/${user.image}`: '/path/to/default/image.jpg'}
                        alt={user.name}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>
                {errors.image && <div className="text-red-600">{errors.image}</div>}

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
                  <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-gray-600 mr-3" />
                  <label className="w-1/4 text-gray-700 font-semibold">Contact Number:</label>
                  <div className="w-3/4 flex items-center">
                    <span className="mr-2">{contactNumberHeader}</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="contact_number"
                        value={data.contact_number}
                        onChange={handleChange}
                        className="p-3 border rounded-lg focus:ring focus:border-blue-300"
                      />
                    ) : (
                      <div className="text-gray-900">{data.contact_number}</div>
                    )}
                  </div>
                </div>
                {errors.contact_number && <div className="text-red-600">{errors.contact_number}</div>}

                {isEditing && (
                  <div>
                    <button
                      type="button"
                      onClick={togglePasswordFields}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
                    </button>

                    {showPasswordFields && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-gray-600 mr-3" />
                          <label className="w-1/4 text-gray-700 font-semibold">Current Password:</label>
                          <input
                            type="password"
                            name="current_password"
                            value={data.current_password}
                            onChange={handleChange}
                            className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                          />
                        </div>
                        {errors.current_password && <div className="text-red-600">{errors.current_password}</div>}

                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-gray-600 mr-3" />
                          <label className="w-1/4 text-gray-700 font-semibold">New Password:</label>
                          <input
                            type="password"
                            name="new_password"
                            value={data.new_password}
                            onChange={handleChange}
                            className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                          />
                        </div>
                        {errors.new_password && <div className="text-red-600">{errors.new_password}</div>}

                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-gray-600 mr-3" />
                          <label className="w-1/4 text-gray-700 font-semibold">Confirm New Password:</label>
                          <input
                            type="password"
                            name="new_password_confirmation"
                            value={data.new_password_confirmation}
                            onChange={handleChange}
                            className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

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
                    onClick={() => {
                      setIsEditing(false);
                      setPreviewImage(null);
                      setShowPasswordFields(false);
                    }}
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
              <p>Manage your subscription, view account status, delete account, etc.</p>
            </div>
          )}
        </div>
      </Sidebar>
    </TopBar>
  );
}

export default Settings;