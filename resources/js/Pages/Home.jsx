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
import '../../css/bootstrap-datetimepicker.min.css';
import Image5 from '../../img/—Pngtree—cleaner work scene cartoon hand_3808068.png';
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
      <section className="hero-section pr-4 pl-4">
            <div className="container mx-auto">
                <div className="">
                    <div className="flex flex-wrap items-center w-full">
                        <div className="lg:w-7/12 md:w-10/12 mx-auto">
                            <div className="section-search aos" data-aos="fade-up">
                                <h1 className="text-4xl font-bold">Find home and professional services near you</h1>
                                <p className="mt-2 text-lg">Search hundreds of verified ads</p>
                                <div className="search-box mt-4">
                                    <form action="">
                                        <div className="flex flex-wrap items-center space-x-4">
                                            <div className="search-input line flex flex-grow items-center space-x-2">
                                                <FontAwesomeIcon icon={faMapPin} />
                                                <div className="form-group mb-0">
                                                    <label className="block text-sm font-medium">Your Location</label>
                                                    <input type="text" className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Kenya"/>
                                                </div>
                                            </div>
                                            <div className="search-input flex flex-grow items-center space-x-2">
                                                <FontAwesomeIcon icon={faSearch} />
                                                <div className="form-group mb-0">
                                                    <label className="block text-sm font-medium">What are you looking for?</label>
                                                    <input type="text" className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Cleaning services"/>
                                                </div>
                                            </div>
                                            <div className="search-btn">
                                                <button className="btn bg-yellow-700 text-white px-4 py-2 rounded-md shadow-sm" type="submit"><FontAwesomeIcon icon={faSearch} className="mr-2" />Search</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-5/12">
                            <div className="banner-imgs">
                              
                                    <img className="w-full max-h-96" alt="banner" src={Image5}/>
                              
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="feature-section " data-aos="fade-up">
       <div className="container mx-auto p-4">
           <div className="section-heading">
               <div className="flex flex-wrap items-center">
                   <div className="w-full md:w-1/2 aos" data-aos="fade-up">
                       <h2 className="text-2xl font-bold">Featured Categories</h2>
                       <p className="mt-2">What do you need to find?</p>
                   </div>
                   <div className="w-full md:w-1/2 text-right aos" data-aos="fade-up">
                       <a href="categories.html" className="btn bg-yellow-700 text-white px-4 py-2 rounded-md inline-flex items-center">View All<FontAwesomeIcon icon={faArrowRight} className="ml-2" /></a>
                   </div>
               </div>
           </div>
           <div className="flex flex-wrap -mx-2">
             
              
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
<FeatureCategory/> 
           </div>
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
    <div className="container mx-auto">
      <div className="section-heading">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="aos" data-aos="fade-up">
            <h2 className="text-2xl">Top Providers</h2>
            <p>Meet Our Experts</p>
          </div>
          <div className="text-right aos" data-aos="fade-up">
            <a href="providers.html" className="btn btn-primary btn-view">
              View All <FontAwesomeIcon icon={faArrowRight} />
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

          <section className="client-section py-8 bg-white" data-aos="fade-up">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">What our clients say</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur elit</p>
          </div>
          <Slider {...settings}>
            <div className='p-3'>
            <div className="client-widget p-4  " data-aos="fade-up">
              <div className="client-img mb-4">
                <a href="#">
                  <img className="w-24 h-24 rounded-full mx-auto" alt="Image" src={RatingImage} />
                </a>
              </div>
              <div className="client-content text-center">
                <div className="rating mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
                <h5 className="font-bold">Sophie Moore</h5>
                <h6 className="text-gray-600">Director</h6>
              </div>
            </div>
            </div>
            <div className=' p-3'>
           <div className="client-widget p-4" data-aos="fade-up">
              <div className="client-img mb-4">
                <a href="#">
                  <img className="w-24 h-24 rounded-full mx-auto" alt="Image" src={RatingImage} />
                </a>
              </div>
              <div className="client-content text-center">
                <div className="rating mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
                <h5 className="font-bold">Mike Hussy</h5>
                <h6 className="text-gray-600">Lead</h6>
              </div>
            </div>
           </div>

           

           <div className=' p-3'>
          <div className="client-widget p-4" data-aos="fade-up">
              <div className="client-img mb-4">
                <a href="#">
                  <img className="w-24 h-24 rounded-full mx-auto" alt="Image" src={RatingImage} />
                </a>
              </div>
              <div className="client-content text-center">
                <div className="rating mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
                <h5 className="font-bold">John Doe</h5>
                <h6 className="text-gray-600">CEO</h6>
              </div>
            </div>
          </div>
          </Slider>
        </div>
      </section>


        
      

       
      
  

      </div>
    </Layout>
  );
}
