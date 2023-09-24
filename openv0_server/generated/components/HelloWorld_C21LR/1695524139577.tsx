import React from 'react';

const HelloWorld = () => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
    <p className="text-xl font-bold text-black dark:text-white">Hello, World!</p>
    <p className="text-sm text-gray-800 dark:text-gray-400">
      This is a basic HelloWorld component. It displays a simple greeting of 'Hello, World!' on the screen. The Hello, World! will be wrapped in a paragraph tag. Next to this message, the component will also include a description area wrapped in another paragraph tag, where you can add additional explanatory text if needed.
    </p>
  </div>
);

export default HelloWorld;