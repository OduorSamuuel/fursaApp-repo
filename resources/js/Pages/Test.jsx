
import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Test = ({ status }) => {
    const sendTestEmail = () => {
        Inertia.post('/send-test-email');
    };

    return (
        <div>
            <h1>Send Test Email</h1>
            {status && <p>{status}</p>}
            <button onClick={sendTestEmail}>Send Test Email</button>
        </div>
    );
};

export default Test;
