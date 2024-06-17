import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import '../../css/custom-swal.css'; 

const MySwal = withReactContent(Swal);

const EmailVerification = ({ success, error }) => {
    useEffect(() => {
        if (success) {
            showVerificationPopup(success, 'success');
        } else if (error) {
            showVerificationPopup(error, 'error');
        }
    }, [success, error]);

    const showVerificationPopup = (message, type) => {
        MySwal.fire({
            title: <strong className="text-2xl font-semibold">{type === 'success' ? 'Success!' : 'Error!'}</strong>,
            html: <p className="text-lg">{message}</p>,
            icon: type,
            customClass: {
                popup: 'bg-white rounded-lg shadow-xl p-8',
                title: 'text-gray-800',
                content: 'text-gray-600',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
            buttonsStyling: false,
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            willClose: () => {
                if (type === 'success') {
                    window.location.href = '/login';
                } else {
                    window.location.href = '/';
                }
            }
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

        </div>
    );
};

export default EmailVerification;
