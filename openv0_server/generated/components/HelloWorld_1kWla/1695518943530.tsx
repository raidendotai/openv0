import React from 'react';

const HelloWorld: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center dark:bg-gray-900 text-lg text-center">
        <p className="text-2xl font-bold dark:text-white">Hello World!</p>
    </div>
  );
};

export default HelloWorld;