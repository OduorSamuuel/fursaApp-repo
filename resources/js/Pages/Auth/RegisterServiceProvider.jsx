import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


const RegisterServiceProvider = ({ success, error }) => {
    const [successMessage, setSuccessMessage] = useState(success || '');
    const [errorMessage, setErrorMessage] = useState(error || '');
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

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onError: (errors) => {
                setErrorMessage(errors.email);
            },
            onSuccess: (page) => {
                setSuccessMessage(page.props.success);
                setErrorMessage(page.props.error);
                setTimeout(() => {
                    window.location.href = route('login');
                }, 5000);
                // Clear form inputs after successful submission
                setData({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    company_name: '',
                    service_type: '',
                    contact_number: '',
                    address: '',
                });
            },
        });
    };

    return (
        <>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <GuestLayout>
                <Head title="Register as Service Provider" />
                <div className="max-w-md mx-auto">
                <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="grid grid-cols-2 gap-x-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
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
                                    onChange={(e) => setData('email', e.target.value)}
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
                                    onChange={(e) => setData('password', e.target.value)}
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
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
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
                                    onChange={(e) => setData('company_name', e.target.value)}
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
                                    onChange={(e) => setData('service_type', e.target.value)}
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
                                    onChange={(e) => setData('contact_number', e.target.value)}
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
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                        </div>
                      <div className=' flex justify-center'>
                      <PrimaryButton type="submit" disabled={processing} className=" ">
                                Register as Service Provider
                            </PrimaryButton>
                     
                      </div>
                          
                    </form>
                </div>
            </GuestLayout>
        </>
    );
};

export default RegisterServiceProvider;
