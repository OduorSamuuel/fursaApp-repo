import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function PrimaryButton({ className = '', processing, children, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(true); // Initially set to true to allow submission

    useEffect(() => {
        if (!isLoading && hasError) {
           setHasError(false);
            setIsSubmit(true); 
        }
    }, [isLoading, hasError]);

    const handleClick = () => {
        if (!processing && isSubmit) {
            setIsLoading(true);
           
            setTimeout(() => {
               
                setHasError(true);
                setIsLoading(false);
                setIsSubmit(false); 
            }, 2000);
        } else if (hasError) {
      
            setHasError(false);
            setIsSubmit(true); 
        }
    };

    return (
        <button
            {...props}
            className={
                `flex justify-center  px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out max-w-md h-10 ${
                    processing || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                } ${className}`
            }
            onClick={handleClick}
        >
            {isLoading && !hasError ? (
                <ClipLoader color={'#ffffff'} loading={true} size={30} />
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
}
