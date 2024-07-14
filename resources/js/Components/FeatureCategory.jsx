import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faCar, faWrench } from '@fortawesome/free-solid-svg-icons';
import Image3 from '../../../public/Images/service-01.jpg';
import { Link } from '@inertiajs/react';

function FeatureCategory() {
  return (
  <>
    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                   <Link href="/services" className="feature-box aos block bg-white p-4 rounded-lg shadow-lg" data-aos="fade-up">
                       <div className="feature-icon mb-4">
                           <span>
                               <FontAwesomeIcon icon={faTools} className="fa-3x text-yellow-600"/>
                           </span>
                       </div>
                       <h5 className="text-lg font-semibold">Construction</h5>
                       <div className="feature-overlay mt-4">
                           <img src={Image3} alt="img" className="rounded-lg"/>
                       </div>
                   </Link>
               </div>
  </>
  )
}

export default FeatureCategory