import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Chat/Checkbox';

const Login = ({ status, canResetPassword }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await post(route('login'));
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign in to your account</h2>
          {status && <p className="text-green-500 mb-4 text-sm">{status}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                autoFocus={true}
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
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </div>
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
            <PrimaryButton className="mt-4 w-full" disabled={processing || isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
            </PrimaryButton>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Or <Link href="/choice" className="underline cursor-pointer">create a new account</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
