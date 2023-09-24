import React from 'react';

const HelloWorld: React.FC = () => (
    <div className="dark:bg-gray-800 p-4 rounded-md shadow-md text-center">
        <h1 className="dark:text-white text-3xl font-semibold">Hello, World!</h1>
        <p className="dark:text-gray-300 pt-2">A simple 'Hello, World!' component with a description.</p>
    </div>
);

export default HelloWorld;