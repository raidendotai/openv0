import { Link } from 'react-router-dom';
import { Button } from 'react-daisyui';
import { Camera } from 'lucide-react';

function App() {
  return (
	
    <div className="flex h-screen flex-col justify-center gap-2 p-6 text-center" data-theme="black">
	  
      <h5 className="sm:text-5xl">Welcome to your new app!</h5>
      <p className="sm:text-2xl">
        This starterkit contains React Typescript, Vite, DaisyUI and
        TailwindCSS.
      </p>
      <Link to="/theme">
		<Button color="primary">Click me! <Camera className="ml-4 text-red-500 w-4 h-4" /></Button>
        <button className="text-md btn-primary btn mt-5 ">
          Go to Theme Page
		  
        </button>
      </Link>
    </div>
  );
}

export default App;
