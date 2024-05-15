import ApplicationLogo from '@/Components/Chat/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
      
        <div className="   flex flex-col justify-center  min-h-screen items-center pb-12 bg-gray-50 sm:px-6 lg:px-8">
            <div>
          {children}
            </div>

           
        </div>
    );
}
