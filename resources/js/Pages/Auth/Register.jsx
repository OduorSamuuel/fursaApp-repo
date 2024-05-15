import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (Object.keys(errors).length === 0 && successMessage) {
            // Clear success message after 5 seconds
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errors]);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onError: (errors) => {
                // Handle registration errors here
            },
            onSuccess: () => {
                setSuccessMessage('Registration successful. Please check your email for verification.');
                setTimeout(() => {
                    window.location.href = route('login');
                }, 5000); 
            },
        });
    };


    return (<>
   
   {successMessage && (
        <div className="success-message">
            {successMessage}
        </div>
    )}
   <GuestLayout>
<Head title="Register" />

<div className="max-w-md mx-auto relative">
   

    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 leading-9">Create an account</h2>
    <p className="mt-2 text-sm text-center text-gray-600 leading-5 max-w">
        Or
        <Link href={route('login')} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Sign in to your account
        </Link>
    </p>

    <form onSubmit={submit}>
                    <div className="mt-4">
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

                    <div className="mt-4">
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

                    <div className="mt-4">
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

                    <div className="mt-4">
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

                    <div className="mt-6">
                        <PrimaryButton type="submit" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
</div>
</GuestLayout>
        </>
    );

}
