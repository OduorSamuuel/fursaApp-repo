import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material'; // Use CircularProgress from @mui/material
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';

function ServicesCard({ service }) {
  const { image, service_name, county, rating, price, id } = service;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = `/${image}`;
    imageLoader.onload = () => setIsLoading(false);
  }, [image]);

  return (
    <div className="service-widget aos ml-4 mr-4 mt-0 p-2 w-full" data-aos="fade-up">
      <div className="service-img p-3">
        <a href="service-details.html">
          {isLoading ? (
            <div className="flex justify-center items-center h-36">
              <CircularProgress />
            </div>
          ) : (
            <img className="serv-img h-36" alt="Service Image" src={`/${image}`} />
          )}
        </a>
        <div className="fav-item">
          <a href="categories.html"><span className="item-cat">{service_name}</span></a>
          <a href="javascript:void(0)" className="fav-icon">
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </div>
        <div className="item-info">
          <a href="providers.html"><span className="item-img"><img src={`/${image}`} className="avatar" alt="User" /></span></a>
        </div>
      </div>
      <div className="service-content">
        <h3 className="title">
          <a href="service-details.html">{service_name}</a>
        </h3>
        <p><FontAwesomeIcon icon={faMapPin} /> {county}, Kenya<span className="rate"><FontAwesomeIcon icon={faStar} className="filled" />{rating}</span></p>
        <div className="serv-info">
          <h6 className="">ksh {price}</h6>
          <Link href={`/description/${id}`} className='btn btn-book'> Book Now</Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
