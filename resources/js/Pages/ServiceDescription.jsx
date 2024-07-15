import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faPrint, faDownload,faStar, faCircleCheck, faMapPin,  faThumbsUp, faThumbsDown , faUser,  faEnvelope, faPhone,faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import "../../css/feather.css";
import "../../css/style.css";
import "aos/dist/aos.css";

import ServicesCard from '../Components/ServicesCard';
import "../../css/bootstrap-datetimepicker.min.css";
import "../../css/bootstrap.min.css";

import AOS from "aos";

import Image from "../../../public/Images/pic-3.png";
import Mapbox from "@/Components/Mapbox";

function formatTime(time) {
  if (time === null) {
    return 'Closed';
  }
  const [hours, minutes] = time.split(':');
  let formattedHours = parseInt(hours, 10);
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12;
  return `${formattedHours}:${minutes} ${ampm}`;
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true, 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function ServiceDescription() {
  const { description, provider, images, service_detail_id, pricingTiers, availability, serviceProviders, ratings } = usePage().props;

  const providersArray = Object.values(serviceProviders);
  const basicTier = pricingTiers.find(tier => tier.name === 'Basic');
  const standardTier = pricingTiers.find(tier => tier.name === 'Standard');
  const premiumTier = pricingTiers.find(tier => tier.name === 'Premium');

  const handleBookNow = (selectedTier) => {
    const bookingData = {
      provider,
      availability,
      selectedTier,
      service_detail_id,
    };
    Inertia.post('/booking', { data: bookingData });
  };

  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="container">
        </div>
      </header>
      
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Service Details</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">Service Details</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="serv-profile">
                <h2>{provider.service_name}</h2>
                <ul>
                  <li>
                    <span className="badge">{provider.service_name}</span>
                  </li>
                  <li className="service-map"><i className="feather-map-pin"></i> {provider.county_name}, Kenya</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="service-wrap">
                <h5>Service Details</h5>
                <p>{description}</p>
              </div>

              <div className="service-wrap provide-service">
                <h5>Service Provider</h5>
                <div className="row">
                  <div className="col-md-4">
                    <div className="provide-box">
                      <img src={Image} className="img-fluid" alt="img"/>
                      <div className="provide-info">
                        <p className="text-black">{provider.user_name}</p>
                        <div className="serv-review"><FontAwesomeIcon icon={faStarHalf} /> <span>{provider.rating} </span>{provider.rating}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="provide-box">
                      <span><FontAwesomeIcon icon={faMapPin} /></span>
                      <div className="provide-info">
                        <h6>Address</h6>
                        <p>{provider.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="provide-box">
                      <span><FontAwesomeIcon icon={faEnvelope} /></span>
                      <div className="provide-info">
                        <h6>Email</h6>
                        <p>{provider.email} </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                  </div>
                </div>
              </div>
              
              <div className="service-wrap">
                <h5>Reviews</h5>
                <ul>
                  {ratings.map((rating, index) => (
                    <li key={index} className="review-box">
                      <div className="review-profile">
                        <div className="review-img">
                          <img src={`/image-uploads/${rating.user.image}`} className="img-fluid" alt="img" />
                          <div className="review-name">
                            <h6>{rating.user.name}</h6>
                            <p>{new Date(rating.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="rating">
                          {[...Array(rating.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i}  icon={faStar} className="filled text-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p>{rating.comment}</p>
                      <div className="recommend-item">
                        <a href="#">Reply</a>
                        <div className="recommend-info">
                          <p>Recommend?</p>
                          <a href="#"><FontAwesomeIcon icon={faThumbsUp} /> Yes</a>
                          <a href="#"><FontAwesomeIcon icon={faThumbsDown} /> No</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a href="customer-reviews.html" className="btn btn-primary btn-review">View All Reviews</a>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="service-wrap">
                    <h5>Related Services</h5>
                  </div>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="owl-nav mynav"></div>
                </div>
              </div>

              <div className="service-slider ">
                <Slider {...settings}>
                  {providersArray.map((service, index) => (
                    <div key={index} className="p-2">
                      <ServicesCard service={service} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-lg-4 theiaStickySidebar">
              <div className="card card-provide mb-0">
                <div className="card-body">
                  <div className="provide-widget">
                    <div className="service-amount">
                      <p className="serv-review"><FontAwesomeIcon icon={faStar} /> <span>4.9 </span>(255 reviews)</p>
                    </div>
                  </div>
                  
                  <div className="package-widget">
                    {/* Basic Pricing */}
                    {basicTier && (
                      <div className="p-4 rounded-lg flex flex-col items-center mb-4">
                        <p className="text-lg font-bold mb-2 text-center">Basic Package</p>
                        <p className="mb-2 text-center">{basicTier.description}</p>
                        <div className="flex items-center mb-2">
                          <h5 className="font-bold mr-2">Ksh {basicTier.price}</h5>
                        </div>
                        <button onClick={() => handleBookNow(basicTier)} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Book Basic</button>
                      </div>
                    )}

                    {/* Standard Pricing */}
                    {standardTier && (
                      <div className="p-4 rounded-lg flex flex-col items-center mb-4">
                        <p className="text-lg font-bold mb-2 text-center">Standard Package</p>
                        <p className="mb-2 text-center">{standardTier.description}</p>
                        <div className="flex items-center mb-2">
                          <h5 className="font-bold mr-2">Ksh {standardTier.price}</h5>
                        </div>
                        <button onClick={() => handleBookNow(standardTier)} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Book Standard</button>
                      </div>
                    )}

                    {/* Premium Pricing */}
                    {premiumTier && (
                      <div className="p-4 rounded-lg flex flex-col items-center">
                        <p className="text-lg font-bold mb-2 text-center">Premium Package</p>
                        <p className="mb-2 text-center">{premiumTier.description}</p>
                        <div className="flex items-center mb-4">
                          <h5 className="font-bold mr-2">Ksh {premiumTier.price}</h5>
                        </div>
                        <button onClick={() => handleBookNow(premiumTier)} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Book Premium</button>
                      </div>
                    )}
                  </div>
            
                  <div className="card card-available">
                    <div className="card-body">
                      <div className="available-widget">
                        <div className="available-info">
                          <h5>Service Availability</h5>
                          <ul>
                            {availability.map((avail, index) => (
                              <li key={index}>
                                {avail.day_of_week}{' '}
                                {avail.open === null || avail.close === null ? (
                                  <span className="text-danger">Closed</span>
                                ) : (
                                  <span>
                                    {formatTime(avail.open)} - {formatTime(avail.close)}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Mapbox provider={provider} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDescription;