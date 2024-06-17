import React from 'react';
import Slider from 'react-slick'; // Import the slider library
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ review }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={review.profilePicUrl} alt={review.name} className="object-cover w-full h-48" />
        <div className="p-4">
          <div className="flex items-center mb-2">
            <img src={review.profilePicUrl} alt={review.name} className="w-10 h-10 rounded-full mr-3" />
            <h3 className="text-xl font-semibold">{review.name}</h3>
          </div>
          <div className="flex items-center mb-2">
            {Array.from({ length: review.rating }, (_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
            ))}
          </div>
          <p>{review.review}</p>
        </div>
      </div>
    </Slider>
  );
};

export default ReviewCard;
