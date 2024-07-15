import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faCar, faWrench, faHammer, faPaintBrush, faLaptop, faBicycle, faHome } from '@fortawesome/free-solid-svg-icons';
import Image1 from '../../../public/Images/home.jpg';
import Image2 from '../../../public/Images/homeservices.jpg';
import Image3 from '../../../public/Images/automotive.jpg';
import Image4 from '../../../public/Images/painter.jpg';
import Image5 from '../../../public/Images/renovation.jpg';
import Image7 from '../../../public/Images/service-01.jpg';
import Image8 from '../../../public/Images/it.jpg';

import { Link } from '@inertiajs/react';

const categories = [
  { name: 'Home', icon: faHome, image: Image1 },
  { name: 'Home Services', icon: faTools, image: Image2 },
  { name: 'Automotive', icon: faCar, image: Image3 },
  { name: 'Plumbing', icon: faWrench, image: Image4 },
  { name: 'Renovation', icon: faHammer, image: Image5 },
  { name: 'Painting', icon: faPaintBrush, image: Image3},
  { name: 'Electrical', icon: faWrench, image: Image7 },
  { name: 'IT Services', icon: faLaptop, image: Image8 },

];

function FeatureCategory() {
  return (
    <div className="flex flex-wrap">
      {categories.map((category, index) => (
        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-2">
          <Link href="/services" className="feature-box aos block bg-white p-4 rounded-lg shadow-lg" data-aos="fade-up">
            <div className="feature-icon mb-4">
              <span>
                <FontAwesomeIcon icon={category.icon} className="fa-3x text-yellow-600" />
              </span>
            </div>
            <h5 className="text-lg font-semibold">{category.name}</h5>
            <div className="feature-overlay mt-4">
              <img src={category.image} alt={category.name} className="rounded-lg" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FeatureCategory;
