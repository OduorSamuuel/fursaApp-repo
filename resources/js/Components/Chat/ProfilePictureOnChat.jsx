import React from 'react';

// Function to generate a consistent color based on the user's name
const generateColorFromName = (name) => {
    // Define an array of colors to choose from
    const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#818CF8', '#F472B6', '#A78BFA', '#6EE7B7', '#93C5FD', '#EBCBCB'];

    // Use the ASCII values of the characters in the name to determine the index of the color
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = sum % colors.length;

    return colors[index];
};

export default function ProfilePictureOnChat({ user }) {
    // Generate a color based on the user's name
    const color = generateColorFromName(user.name);

    return (
        <div className="inline-block relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: color }}>
                <span className="text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                </span>
            </div>
        </div>
    );
}
