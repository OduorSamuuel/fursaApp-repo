import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { Link } from '@inertiajs/inertia-react'; // Import Link from @inertiajs/inertia-react

function CardBox({ provider }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-4">
      {loading ? (
        <div>
          <Skeleton variant="rectangular" width="100%" height={125} className="rounded-md mb-4" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      ) : (
        <div>
          <img src={provider.image} alt="Service" className="w-full h-32 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{provider.user_name}</h2>
          <p className="text-gray-600 mb-4">{provider.service_name}</p>
          <div className="flex items-center mb-4">
            {[...Array(4)].map((_, index) => (
              <svg key={index} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15.27l-5.18 2.73 1-5.81-4.23-4.12 5.85-.85L10 .5l2.61 5.72 5.85.85-4.23 4.12 1 5.81L10 15.27z" />
              </svg>
            ))}
            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15.27l-5.18 2.73 1-5.81-4.23-4.12 5.85-.85L10 .5l2.61 5.72 5.85.85-4.23 4.12 1 5.81L10 15.27z" />
            </svg>
            <span className="ml-2 text-gray-600">{provider.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Ksh {provider.price}</span>
            <Link href={`/description/${provider.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Reach out</Link>

          </div>
        </div>
      )}
    </div>
  );
}

export default CardBox;
