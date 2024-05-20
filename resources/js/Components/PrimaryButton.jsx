import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function PrimaryButton({ className = '', processing, children, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [redirected, setRedirected] = useState(false);

    const handleClick = () => {
        if (!processing && !isLoading) {
            setIsLoading(true);

            // Simulating an asynchronous action
            setTimeout(() => {
                // Simulate a success or error response
                if (Math.random() < 0.5) {
                    setHasError(true);
                } else {
                    setRedirected(true);
                }
                setIsLoading(false); // Re-enable the button after receiving the response
            }, 2000); // Simulating a 2-second delay for response
        }
    };

    return (
        <button
            {...props}
            className={`flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out max-w-md h-10 ${
                processing || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
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
