import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Inertia } from '@inertiajs/inertia';

const ServiceDescription = ({ auth, description, provider, images, pricingTiers, availability, service_name }) => {
  const { serviceProviders } = usePage().props;
  const [selectedProvider, setSelectedProvider] = useState(provider.id);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);

  const handleDateTimeChange = (event) => {
    const dateValue = event.target.value;
    setSelectedDateTime(dateValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTier) {
      alert('Please select a pricing tier.');
      return;
    }

    const serviceData = {
      service_provider_id: selectedProvider,
      date: selectedDateTime.split('T')[0],
      time: selectedDateTime.split('T')[1],
      selectedTier,
      description,
      provider,
    };

    Inertia.post(route('confirm-booking'), serviceData)
      .then(() => {
        console.log('Booking confirmed');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const carouselImages = images.map(image => `/${image.path}`);

  return (
    <Layout auth={auth}>
      <Head title={provider.company_name} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{provider.company_name}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Service: {service_name}</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 pr-4 mb-8 md:mb-0">
            <AliceCarousel autoPlay autoPlayInterval={3000} infinite disableButtonsControls>
              {carouselImages.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className="object-cover rounded-lg shadow-lg mx-auto" style={{ maxHeight: '400px' }} />
              ))}
            </AliceCarousel>
            <div className="bg-white rounded-lg shadow-md mt-8 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Service Details</h2>
              <p className="text-gray-700">{description}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Availability</h2>
              <p className="text-gray-700 mb-2">Available: {availability}</p>
              <p className="text-gray-700 mb-2">Location: {provider.county_name}</p>
              <p className="text-gray-700 mb-2">Contact: {provider.user_name} ({provider.contact_number})</p>
              <p className="text-gray-700 mb-2">Address: {provider.address}</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 pl-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pricing</h2>
              <div className="space-y-4">
                {pricingTiers.map((tier, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                    className={`block w-full py-2 px-4 text-center rounded-lg border transition duration-300 ${selectedTier === tier ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-purple-500 hover:text-white'}`}
                  >
                    {tier.name} - ${tier.price}
                  </button>
                ))}
              </div>
              {selectedTier && (
                <div className="bg-gray-100 rounded-lg border mt-4 p-4">
                  <h3 className="text-lg font-semibold mb-2">{selectedTier.name}</h3>
                  <p className="text-gray-700 mb-2">Price: ${selectedTier.price}</p>
                  <p className="text-gray-700 mb-2">Description: {selectedTier.description}</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book Service</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Select Date and Time:</label>
                  <input
                    type="datetime-local"
                    value={selectedDateTime}
                    onChange={handleDateTimeChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-full text-white font-bold ${selectedTier ? 'bg-orange-500 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!selectedTier}
                >
                  Book Now
                </button>
                {!selectedTier && (
                  <p className="mt-2 text-sm text-red-600">Please select a pricing tier.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDescription;
