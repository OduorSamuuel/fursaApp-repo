import React, { useState } from 'react';

function ServicesLeft({ categories, setSelectedCategory, children }) {
  const [categoryVisible, setCategoryVisible] = useState(true);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategoryVisible(false); // Close category dropdown after selection
  };

  return (
    <div className="flex " >
      <div className="hidden h-screen lg:block w-64 bg-white border border-gray-200 p-4 sticky top-14  m-2 shadow-lg rounded-lg ">
        <h3 className="text-center text-blue-700 text-xl mb-4 font-bold">Filter Services</h3>
        
        {/* Filter by Category */}
        <div className="mb-4">
          <h3 className="flex items-center justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold">Service Categories</span>
          </h3>
          <div className="pt-2" id="filter-category">
            <ul role="list" className="space-y-2 text-sm font-medium text-gray-700">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="hover:text-blue-700"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default ServicesLeft;
