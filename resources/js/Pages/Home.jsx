import React from 'react';
import Layout from '../Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import ServicesLeft from '../Layouts/ServicesLeft';
import SliderComponent from '../Components/Slider';
import CardBox from '../Components/Services/Cardbox'; // Assuming this is the correct path

export default function Home({ auth, laravelVersion, phpVersion }) {
  const { serviceProviders } = usePage().props;
  console.log(serviceProviders);

  return (
    <Layout auth={auth}>
      <Head title="Home" />

      <ServicesLeft
        className=""
        categories={['All', 'Beauty', 'Home Services']}
      >
        {/* Render service providers using CardBox component */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {serviceProviders.map((provider, index) => (
            <CardBox key={index} provider={provider} />
          ))}
        </div>
      </ServicesLeft>

      <div className="bg-gray-100 py-8">
        <div className="overflow-hidden mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Discover Our Popular Services</h2>
          {/* <SliderComponent sliderData={sliderData} /> */}
        </div>
      </div>
    </Layout>
  );
}
