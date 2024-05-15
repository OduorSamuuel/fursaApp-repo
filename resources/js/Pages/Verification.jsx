import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from '@inertiajs/react';

const EmailVerification = ({ success, error }) => {
    useEffect(() => {
        if (success) {
            showVerificationPopup(success, 'success');
        } else if (error) {
            showVerificationPopup(error, 'error');
        }
    }, [success, error]);

    const showVerificationPopup = (message, type) => {
        Swal.fire({
            title: type === 'success' ? 'Success!' : 'Error!',
            text: message,
            icon: type,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            willClose: () => {
                if (type === 'success') {
                   
                    window.location.href = '/login'; 
                }
                window.location.href = '/'; 
            }
        });
    };

    return (
        <div>
            <p>Verifying your email...</p>
        </div>
    );
};

export default EmailVerification;
