import React,{ useEffect } from 'react';
import Layout from '../Layouts/Layout';
import { Head, usePage ,Link} from '@inertiajs/react';
import ServicesLeft from '../Layouts/ServicesLeft';
import SliderComponent from '../Components/Slider';
import CardBox from '../Components/Services/Cardbox';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from 'react-slick';
import '../../css/feather.css';
import 'aos/dist/aos.css';
import '../../css/style.css';

import Image5 from '../../../public/Images/—Pngtree—cleaner work scene cartoon hand_3808068.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faSearch, faArrowRight, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import FeatureCategory from '@/Components/FeatureCategory';
import ServicesCard from '@/Components/ServicesCard';
import ServiceProviderCard from '@/Components/ServiceProviderCard';
// Import banner images
import RatingImage from '../../../public/Images/pic-2.png';
import ServiceProvider from './Admin/ServiceProvider';

export default function Home({ auth, laravelVersion, phpVersion }) {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired options
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,  // Enable auto-scrolling
    autoplaySpeed: 3000,  // Set auto-scrolling speed in milliseconds
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
  const settings1 = {

    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,  // Enable auto-scrolling
    autoplaySpeed: 3000,  // Set auto-scrolling speed in milliseconds
    arrows: true, 
    slidesToShow: 4,
    slidesToScroll: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //This prop the serviceProvider also carries the service details
  const { serviceProviders } = usePage().props;

  console.log(serviceProviders);
  const providersArray = Object.values(serviceProviders);
  

  const handleDragStart = (e) => e.preventDefault();



  

  return (
    <Layout auth={auth}>
      <Head title="Home" />

      <div className="bg-gray-100 ">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0" data-aos="fade-right">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">Find home and professional services near you</h1>
                <p className="text-xl text-gray-600 mb-8">Search hundreds of verified ads</p>
           
              </div>
              <div className="lg:w-1/2" data-aos="fade-left">
                <img src={Image5} alt="banner" className="w-full h-auto max-h-96 object-contain" />
              </div>
            </div>
          </div>
        </section>
        <section className="feature-section" data-aos="fade-up">
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Featured Categories</h2>
              <p className="mt-2">What do you need to find?</p>
            </div>
            <div className="w-full md:w-1/2 text-right">
              <Link href="/services" className="bg-yellow-700 text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-yellow-800 transition duration-300">
                View All
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        <FeatureCategory />
      </div>
    </section>

        {/* Search Bar */}
    

         

    
        <section className="service-section" data-aos="fade-up">
        <div className="container mx-auto p-4">
          <div className="section-heading">
            <h2 className="text-2xl">Featured Services</h2>
            <p>Explore our greatest services. </p>
          </div>

          {/* Slider or Carousel for services */}
         <div className="service-slider ">
              <Slider {...settings}>
                {providersArray.map((service, index) => (
                  <div key={index} className="p-2">
                    <ServicesCard service={service} />
                  </div>
                ))}
              </Slider>
            </div>
          
          <div className="btn-sec">
            <Link href="/services" className="btn btn-primary btn-view">
       
              View All <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>
       
       
      <section className="" data-aos="fade-up">
    <div className="container mx-auto"> <div className="section-heading" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h2 className="text-2xl font-bold">Top Providers</h2>
          <p className="mt-2">Meet Our Experts</p>
        </div>
        <div className="text-right">
          <a href="providers.html" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-blue-600 transition duration-300">
            View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
      </div>
    </div>



  <Slider {...settings1}>
    {providersArray.map((provider, index) => (
      <div key={index} className="p-2">
        <ServiceProviderCard provider={provider} />
      </div>
    ))}
  </Slider>



 
    </div>
  </section>

         


        
      

       
      
  

      </div>
    </Layout>
  );
}
