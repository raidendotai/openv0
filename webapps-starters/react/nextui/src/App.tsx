import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Card, CardHeader, CardFooter, CardBody, Button, Image} from "@nextui-org/react";
import { Camera } from 'lucide-react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

	<div className="max-w-sm mx-auto dark">
		<Card
		  isFooterBlurred
		  radius="lg"
		  className="border-none"
		>
		  <Image
			alt="Woman listing to music"
			className="object-cover"
			height={500}
			src="https://media.pitchfork.com/photos/5929bb7aea9e61561daa7252/16:9/w_1280,c_limit/364a0059.jpg"
			width={1280}
		  />
		  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
			<p className="text-tiny text-white/80">Available soon.</p>
			<Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
			  Notify me
			</Button>
			<Camera className="text-red-500 w-4 h-4" />;
		  </CardFooter>
		</Card>
	</div>


    </>
  )
}

export default App
