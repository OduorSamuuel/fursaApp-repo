import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react'; // Import Link from @inertiajs/inertia-react

function ServiceProviderCard({ provider }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = provider.image;
    imageLoader.onload = () => setLoading(false);
  }, [provider.image]);

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="providerset">
        <div className="providerset-img">
          <Link href={`/provider-details/${provider.id}`}>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : (
              <img src={provider.image} className="h-40" alt="Service Provider" />
            )}
          </Link>
        </div>
        <div className="providerset-content">
          <div className="providerset-price">
            <div className="providerset-name">
              <h4>
                <Link href={`/provider-details/${provider.id}`}>{provider.user_name}</Link>
                <FontAwesomeIcon icon={faCheckCircle} />
              </h4>
              <span>{provider.service_name}</span>
            </div>
            <div className="providerset-prices">
              <h6>Ksh {provider.price}<span>/hr</span></h6>
            </div>
          </div>
          <div className="provider-rating">
            <div className="rating">
              {[...Array(4)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="filled" />
              ))}
              <i className="fa-solid fa-star-half-stroke filled"></i>
              <span>({provider.rating})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderCard;
