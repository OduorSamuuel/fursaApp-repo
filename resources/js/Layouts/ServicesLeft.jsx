import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import '../../css/style.css'

function ServicesLeft({ categories, toggleCategory, selectedCategories, setPriceRange, setLocation, selectedRatings, handleRatingChange, ratingCounts ,children}) {
  const handleCategoryChange = (categoryName) => {
    toggleCategory(categoryName);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="flex">
      <div className="lg:w-1/4 sm:w-full sticky top-0 m-3 hidden sm:block">
        <div className="bg-white p-4 shadow-lg">
          <div className="mb-4">
            <h5 className="text-lg font-bold mb-2">Filter by</h5>
            <a href="#" className="text-blue-500">Reset Filters</a>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Keyword</h2>
            <input type="text" className="border-gray-300 border w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500" placeholder="What are you looking for?" />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categories <span><i className="feather-chevron-down"></i></span></h2>
            <ul>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" onChange={() => handleCategoryChange('All Categories')} checked={selectedCategories.length === 0} />
                  <span className="ml-2">All Categories</span>
                </label>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                </li>
              ))}
            </ul>
            <a href="#" className="text-blue-500 block mt-2">View More <i className="feather-arrow-down-circle"></i></a>
          </div>
        
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <div className="relative">
              <input 
                type="text" 
                className="border-gray-300 border w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500" 
                placeholder="Select Location" 
                onChange={handleLocationChange} 
              />
              <i className="feather-map-pin absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Price Range</h2>
            <input
              type="number"
              name="min"
              className="border-gray-300 border w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 mb-2"
              placeholder="Min price"
              onChange={handlePriceChange}
            />
            <input
              type="number"
              name="max"
              className="border-gray-300 border w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Max price"
              onChange={handlePriceChange}
            />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">By Rating <span><i className="feather-chevron-down"></i></span></h2>
            <ul>
              {Array.from({ length: 5 }, (_, i) => i + 1).map(stars => (
                <li key={stars} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() => handleRatingChange(stars)}
                    checked={selectedRatings.includes(stars)}
                  />
                  <a href="#" className="flex items-center ml-2">
                    {Array.from({ length: stars }, (_, i) => (
                      <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-500" />
                    ))}
                    {Array.from({ length: 5 - stars }, (_, i) => (
                      <FontAwesomeIcon key={i} icon={regularStar} className="text-yellow-500" />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({ratingCounts[stars] || 0})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ServicesLeft;
