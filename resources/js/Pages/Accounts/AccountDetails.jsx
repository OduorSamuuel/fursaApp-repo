import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faUser, faEnvelope, faUserShield, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import Layout from '@/Layouts/Layout';
import Accounts from '@/Layouts/Accounts/Accounts';

function AccountDetails({ auth }) {
  const { user } = usePage().props;
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    contact_number: user.contact_number || '',
    image: null,
  });

  useEffect(() => {
    setData('name', user.name || '');
    setData('username', user.username || '');
    setData('email', user.email || '');
    setData('contact_number', user.contact_number || '');
    setPreviewImage(user.image ? `/${user.image}` : null);
  }, [user]);

  const handleToggleEdit = () => {
    if (isEditing) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('contact_number', data.contact_number);
      
      if (data.image) {
        formData.append('image', data.image);
      }
      
      post(route('accounts.update'), formData, {
        onSuccess: () => {
          toast.success('Profile updated successfully!', { duration: 2000 });
          setIsEditing(false);
        },
        onError: () => {
          toast.error('Failed to update profile.', { duration: 2000 });
        },
      });
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setData('image', file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setData(e.target.name, e.target.value);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setData('image', null);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleToggleEdit();
  };

  return (
    <Layout auth={auth}>
      <Accounts>
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Account Details</h2>
              <button
                type="submit"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                disabled={processing}
              >
                <FontAwesomeIcon icon={isEditing ? faSave : faEdit} size="lg" />
              </button>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className={`h-40 w-40 rounded-full overflow-hidden relative cursor-pointer`} onClick={() => document.getElementById('fileInput').click()}>
                <input
                  type="file"
                  id="fileInput"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white hover:bg-opacity-75 cursor-pointer">
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 m-2">
                      {isEditing && (
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                          onClick={handleRemoveImage}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                    <FontAwesomeIcon icon={faUpload} size="3x" />
                  </div>
                )}
              </div>
              {/* Error handling for image upload */}
              {errors.image && <div className="text-red-600">{errors.image}</div>}
            </div>

            <div className="space-y-6 bg-gray-100 p-4 rounded">
              {/* Name */}
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

              {/* Username */}
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

              {/* Email */}
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

              {/* Contact Number */}
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserShield} className="w-6 h-6 text-gray-600 mr-3" />
                <label className="w-1/4 text-gray-700 font-semibold">Contact Number:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="contact_number"
                    value={data.contact_number}
                    onChange={handleChange}
                    className="w-3/4 p-3 border rounded-lg focus:ring focus:border-blue-300"
                  />
                ) : (
                  <div className="w-3/4 text-gray-900">{user.contact_number || '-'}</div>
                )}
              </div>
              {errors.contact_number && <div className="text-red-600">{errors.contact_number}</div>}
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  onClick={() => setIsEditing(false)}
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </Accounts>
    </Layout>
  );
}

export default AccountDetails;
