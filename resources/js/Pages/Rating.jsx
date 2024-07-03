import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const Rating = () => {
    const {serviceDetail} = usePage().props;
    console.log(serviceDetail);
  const { data, setData, post, reset } = useForm({
    service_providers_id: serviceDetail.service_provider_id, 
    rating: 1, // Default rating
    comment: '',
    user_id: usePage().props.auth.user.id, // Assuming you have auth user data in page props
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/rate-provider', {
      onSuccess: () => {
        console.log('Rating submitted successfully!');
        setSuccessMessage('Rating submitted successfully!');
        reset(); // Reset form fields
      },
      onError: (errors) => {
        console.error('Error submitting rating:', errors);
        // Handle error, e.g., show error message to user
      },
    });
  };

  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating) => {
    setData('rating', rating);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">Rate Service Provider</h2>
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className="cursor-pointer"
              onClick={() => handleStarClick(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <input
                type="radio"
                name="rating"
                value={value}
                className="sr-only"
                onChange={() => {}}
              />
              <FontAwesomeIcon
                icon={solidStar}
                className={`text-gray-300 text-3xl ${
                  value <= (hoverRating || data.rating) ? 'text-yellow-500' : ''
                }`}
              />
            </label>
          ))}
          <div className="ml-3 flex items-center">
            <span className="text-xl font-semibold mr-2">{data.rating}</span>
            {data.rating === 1 && <span>😞</span>}
            {data.rating === 2 && <span>😐</span>}
            {data.rating === 3 && <span>😊</span>}
            {data.rating === 4 && <span>😄</span>}
            {data.rating === 5 && <span>😎</span>}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review:
          </label>
          <textarea
            id="comment"
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none h-24"
            placeholder="Write your review..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Rating
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Your feedback helps others make better decisions. Thank you for contributing!
        </p>
      </form>
    </div>
  );
};

export default Rating;
