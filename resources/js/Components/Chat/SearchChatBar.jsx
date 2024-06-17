import React from 'react';

export default function SearchChatBar({ setSearchQuery }) {
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="px-2.5">
            <label htmlFor="search" className="sr-only">
                Search or start a new chat
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
                    <svg className="w-3 h-3 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                    </svg>
                </div>
                <input
                    type="text"
                    id="search"
                    className="block w-full h-full px-4 py-2 text-xs text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 pl-9"
                    placeholder="Chat with your providers"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
