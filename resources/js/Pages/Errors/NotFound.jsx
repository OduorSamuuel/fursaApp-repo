import React from 'react';
import { Link } from '@inertiajs/react';
import NotFoundIllustration from '../../../../public/Images/Oops! 404 Error with a broken robot-rafiki.png'; // Import your custom SVG illustration

const Error404 = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-indigo-400 text-white">
      <img src={NotFoundIllustration} alt="404 Illustration" className="w-96 h-auto mb-12" />
      <div className="text-center">

        <p className="text-lg mb-8">Oops! The page you are looking for could not be found.</p>
        {/* Use the random segment in the back-to-home link */}
        <Link
          href='/'
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out inline-block font-semibold text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
