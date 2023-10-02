import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Card, CardHeader, CardFooter, CardBody, Button, Image} from "@nextui-org/react";
import { Camera } from 'lucide-react';

import Whatever from "./debug_openv0.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

	<div className="max-w-3xl mx-auto p-32 py-4">
	
		<Whatever></Whatever>

	</div>


    </>
  )
}

export default App
