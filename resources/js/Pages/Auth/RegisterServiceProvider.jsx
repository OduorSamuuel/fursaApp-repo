import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop, MenuItem, Select, FormControl, InputLabel as MuiInputLabel } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
    country_code: '254',
    county_id: '',
    service_category: '',
    service_image: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [counties, setCounties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get(route('counties')).then(response => {
      setCounties(response.data);
    });

    axios.get(route('categories')).then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);

    if (name === 'service_category') {
      setSelectedCategory(value);
      setData('service_type', '');
      axios.get(route('services.byCategory', value)).then(response => {
        setServices(response.data);
      });
    }
  };

  const handleFileChange = (e) => {
    setData('service_image', e.target.files[0]);
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const fullPhoneNumber = `${data.country_code}${data.contact_number}`;
  console.log('Full Phone Number:', fullPhoneNumber);
  post('/register', {
    data: {
      ...data,
      contact_number: fullPhoneNumber,
    },
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
                <MuiInputLabel htmlFor="service_category">Service Category</MuiInputLabel>
                <FormControl fullWidth className="mt-1">
  <Select
    id="service_category"
    name="service_category"
    value={data.service_category}
    onChange={handleChange}
    displayEmpty
    className="input-field"
    renderValue={() => {
      if (selectedCategory === '') {
        return '- Select Category -';
      } else {
        return selectedCategory;
      }
    }}
  >
    {categories.map((category, index) => (
      <MenuItem key={index} value={category.category}>
        {category.category}
      </MenuItem>
    ))}
  </Select>
</FormControl>

                <InputError message={errors.service_category} className="mt-2" />
              </div>
              {selectedCategory && (
                <div>
                  <MuiInputLabel htmlFor="service_type">Service Type</MuiInputLabel>
                  <FormControl fullWidth className="mt-1">
                    <Select
                      id="service_type"
                      name="service_type"
                      value={data.service_type}
                      onChange={handleChange}
                      displayEmpty
                      className="input-field"
                    >
                      <MenuItem disabled value="">
                        - Select Service Type -
                      </MenuItem>
                      {services.map((service, index) => (
                        <MenuItem key={index} value={service.name}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <InputError message={errors.service_type} className="mt-2" />
                </div>
              )}
              <div>
                <InputLabel htmlFor="county_id" value="County" />
                <FormControl fullWidth className="mt-1">
                  <Select
                    id="county_id"
                    name="county_id"
                    value={data.county_id}
                    onChange={handleChange
                    }
                    displayEmpty
                    className="input-field"
                  >
                    <MenuItem disabled value="">
                      - Select County -
                    </MenuItem>
                    {counties.map((county) => (
                      <MenuItem key={county.id} value={county.id}>
                        {county.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <InputError message={errors.county_id} className="mt-2" />
              </div>
              <div>
              <InputLabel htmlFor="contact_number" value="Contact Number" />
              <div className="relative flex">
                
                <span className="inline-flex h-10 items-center px-3 mt-1 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +{data.country_code}
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
              
                            <InputError message={errors.contact_number} className="mt-2" />
                            <div>
              </div>
             
                <InputLabel htmlFor="service_image" value="Service Image" />
                <input
                  type="file"
                  id="service_image"
                  name="service_image"
                  className="mt-1 block w-full"
                  onChange={handleFileChange}
                />
                <InputError message={errors.service_image} className="mt-2" />
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
