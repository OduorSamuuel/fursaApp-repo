import React, { useState } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterClient = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: '',
    contact_number: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleImageChange = (e) => {
    setData('image', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/register-client', {
      data: {
        ...data,
        contact_number: `254${data.contact_number}`, // Add prefix here if needed
      },
      onSuccess: () => {
        setData('success', 'Registration successful. Check your email for verification');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      },
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <Backdrop open={processing} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an account</h2>

          {data.success && (
            <p className="text-green-500 mb-4 text-sm">{data.success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  isFocused={true}
                  onChange={handleChange}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  onChange={handleChange}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4 relative">
                <InputLabel htmlFor="password" value="Password" />
                <div className="relative">
                  <TextInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full pr-10"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="absolute inset-y-0 right-3 top-3 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4 relative">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <div className="relative">
                  <TextInput
                    id="password_confirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full pr-10"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={showPasswordConfirmation ? faEyeSlash : faEye}
                    className="absolute inset-y-0 right-3 top-3 cursor-pointer"
                    onClick={toggleShowPasswordConfirmation}
                  />
                </div>
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="image" value="Profile Image" />
                <TextInput
                  id="image_input"
                  type="file"
                  accept="image/*"
                  name="image"
                  className="mt-1 block w-full pr-10"
                  onChange={handleImageChange}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="relative flex">
                
                <span className="inline-flex h-10 items-center px-3 mt-1 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +{254}
                </span>
               <TextInput
  id="contact_number"
  name="contact_number"
  value={data.contact_number}
  className="mt-1 h-10 block w-full rounded-l-none"
  onChange={handleChange}
  maxLength={9}
  inputMode="numeric" // This attribute restricts input to numeric characters
  pattern="[0-9]*" // This attribute further enforces numeric input
/>
              </div>
            </div>
            <div className="mt-6">
              <PrimaryButton type="submit" disabled={processing} className="w-full">
                Register
              </PrimaryButton>
            </div>
          </form>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Registration Rules</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li className="text-red-00">All fields must be filled.</li>
              <li>Password must be a minimum of 8 characters.</li>
              <li>Passwords must match.</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Or <Link href={route('login')} className="underline cursor-pointer">Sign in to your account</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterClient;
