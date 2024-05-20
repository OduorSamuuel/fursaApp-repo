import React, { useState } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <Backdrop open={processing} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an account</h2>
          {errors && (
            <p className="text-red-500 mb-4 text-sm">{Object.values(errors).flat().join(', ')}</p>
          )}
          {data.success && (
            <p className="text-green-500 mb-4 text-sm">{data.success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
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
            </div>
            <div className="mt-6">
              <PrimaryButton type="submit" disabled={processing} className="w-full">
                Register as Service Provider
              </PrimaryButton>
            </div>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Or <Link href={route('login')} className="underline cursor-pointer">Sign in to your account</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterServiceProvider;
