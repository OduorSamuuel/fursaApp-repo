import React from 'react';

function Card({ title, children }) {
    return (
        <div className="p-4 rounded-lg shadow border border-gray-400">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {children}
        </div>
    );
}

export default Card;
