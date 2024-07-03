import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import ServicesLeft from '@/Layouts/ServicesLeft';
import ServicesCard from '@/Components/ServicesCard';
import { usePage } from '@inertiajs/react';

function Services({ auth }) {
  const { serviceProviders, categories } = usePage().props;
  const providersArray = Object.values(serviceProviders);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [location, setLocation] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [ratingCounts, setRatingCounts] = useState({});

  useEffect(() => {
    // Calculate counts of services for each rating
    const counts = {};
    providersArray.forEach(provider => {
      const roundedRating = Math.round(provider.rating);
      if (counts[roundedRating]) {
        counts[roundedRating]++;
      } else {
        counts[roundedRating] = 1;
      }
    });
    setRatingCounts(counts);
  }, [providersArray]);

  const toggleCategory = (categoryName) => {
    if (categoryName === 'All Categories') {
      setSelectedCategories([]);
    } else if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const filteredProviders = providersArray.filter(provider => {
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(provider.category) : true;
    const matchesPrice = (!priceRange.min || provider.price >= parseFloat(priceRange.min)) &&
                         (!priceRange.max || provider.price <= parseFloat(priceRange.max));
    const matchesLocation = location ? (provider.county && provider.county.includes(location)) : true;
  
    // Check if provider's rating is selected in filters
    const matchesRating = selectedRatings.length > 0 ? selectedRatings.includes(Math.round(provider.rating)) : true;
  
    return matchesCategory && matchesPrice && matchesLocation && matchesRating;
  });

  // Display all providers if no filters are applied or if no matches are found
  const displayProviders = filteredProviders.length > 0 ? filteredProviders : providersArray;

  return (
    <Layout auth={auth}>
      <ServicesLeft
        categories={categories}
        toggleCategory={toggleCategory}
        selectedCategories={selectedCategories}
        setPriceRange={setPriceRange}
        setLocation={setLocation}
        selectedRatings={selectedRatings}
        handleRatingChange={handleRatingChange}
        ratingCounts={ratingCounts}
      >
        <div className="content">
          <div className="container">
            <div className="flex p-5">
              <div className="w-full lg:w-full sm:w-full">
                <div className="flex items-center justify-between sorting-div bg-gray-100 p-4 rounded-md mb-4">
                  <div className="w-full sm:w-4/12">
                    <div className="count-search">
                      <h6 className="text-lg font-semibold">Found {filteredProviders.length} Services</h6>
                      {filteredProviders.length === 0 && (
                        <p className="text-gray-500">No matching services found.</p>
                      )}
                    </div>
                  </div>
                  {/* Sorting options */}
                </div>

                <div className="grid grid-cols-3 m-4">
                  {displayProviders.map((service, index) => (
                    <div key={index} className="p-2">
                      <ServicesCard service={service} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
              </div>
            </div>
          </div>
        </div>
      </ServicesLeft>
    </Layout>
  );
}

export default Services;
