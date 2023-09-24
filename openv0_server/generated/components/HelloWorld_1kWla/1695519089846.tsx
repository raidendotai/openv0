import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

const HelloWorld: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-center dark:bg-gray-900 text-lg text-center flex-col">
        <p className="text-2xl font-bold dark:text-white">Hello World!</p>
        <p className="text-2xl font-bold dark:text-white">{counter}</p>
        <Button variant="outline" onClick={handleClick}>Add 1</Button>
    </div>
  );
};

export default HelloWorld;