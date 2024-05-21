import React, { useState } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterServiceProvider = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_name: '',
    service_type: '',
    contact_number: '',
    address: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register', {
      onSuccess: () => {
        setData('success', 'Registration successful. Check your email for verification.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
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
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an account</h2>
       
          {data.success && (
            <p className="text-green-500 mb-4 text-sm">{data.success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div>
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
              <div>
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
           
              <div>
                <InputLabel htmlFor="address" value="Address" />
                <TextInput
                  id="address"
                  name="address"
                  value={data.address}
                  className="mt-1 block w-full"
                  onChange={handleChange}
                />
                <InputError message={errors.address} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="company_name" value="Company Name" />
                <TextInput
                  id="company_name"
                  name="company_name"
                  value={data.company_name}
                  className="mt-1 block w-full"
                  onChange={handleChange}
                />
                <InputError message={errors.company_name} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="service_type" value="Service Type" />
                <TextInput
                  id="service_type"
                  name="service_type"
                  value={data.service_type}
                  className="mt-1 block w-full"
                  onChange={handleChange}
                />
                <InputError message={errors.service_type} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="contact_number" value="Contact Number" />
                <TextInput
                  id="contact_number"
                  name="contact_number"
                  value={data.contact_number}
                  className="mt-1 block w-full"
                  onChange={handleChange}
                />
                <InputError message={errors.contact_number} className="mt-2" />
              </div>
              <div className="relative">
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
             
              <div className="relative">
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
            </div>
            <div className="mt-6 flex">
              <PrimaryButton type="submit" disabled={processing} className="w-full">
                Register 
              </PrimaryButton>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Registration Rules</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>All fields must be filled.</li>
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

export default RegisterServiceProvider;