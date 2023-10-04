import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button"
import { Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { SunMoon } from "lucide-react"

export default function ComponentView() {
  const [generatedComponentImports, setGeneratedComponentImports] = useState([]);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);
  const [componentIdOg, setComponentIdOg] = useState('');

  const navigateTo  = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const componentId = searchParams.get('componentId')



  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!userInput || isLoading) {
      return;
    }

    // Disable the button and show "Processing..." text
    setIsLoading(true);

    try {
      // Make the API POST request with the user input
      const response = await fetch('http://localhost:3000/component/iterate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput , componentId: componentIdOg }),
      });

      if (response.ok) {
        // Handle a successful response here
        console.log('API response:', await response.json());
        setUserInput('')
      } else {
        // Handle an error response here
        console.error('API error:', response.statusText);
      }
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      // Re-enable the button
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function load_stuff(){
      const generatedComponents = await import(`../openv0_generated/${componentId}/metadata.json`);
      console.log(generatedComponents.iterations)
      setComponentIdOg(generatedComponents.componentId)
      // Load child components dynamically based on the JSON data
      const imports = generatedComponents.iterations.map(async (item) => {
        // Construct the import path for each child component
        const importPath = `../openv0_generated/${componentId}/${item.version}.tsx`;

        try {
          // Use dynamic import to load the component, and catch any errors
          const module = await import(/* @vite-ignore */ importPath);
          return {
            prompt: item.prompt,
            version: item.version,
            timestamp: item.timestamp,
            code: item.code,
            component: module.default,
          };
        } catch (error) {
          // Handle the error (e.g., log it)
          console.error(`Failed to import component for ${item.name}: ${error.message}`);
          // Return a placeholder component or null
          return false
        }
      });

      Promise.all(imports).then((components) => {
        setGeneratedComponentImports(components.filter(e=>e));
        if (components.length) {
          setSelectedComponentIndex( components.length-1 )
          console.log(selectedComponentIndex)
        }
        fetch(`http://localhost:3000/component/ping/?from=View Component&component=${componentId}`);
      });


    }
    load_stuff();


    // Wait for all dynamic imports to complete

  }, []);


  return (

    <div className={darkModeToggle ? "dark bg-black" : ""} >
      <div className="min-h-screen">

        <div className="text-right fixed top-0 right-0 p-2 pt-6">
          <Button className={darkModeToggle ? "rounded rounded-full dark" : "rounded rounded-full"}
                  onClick={() => setDarkModeToggle(() => !darkModeToggle)} >
            <SunMoon className="h-4 w-4" />
          </Button>
        </div>

        <div className={darkModeToggle ? "dark bg-black" : ""} >
          <div className="max-w-8xl mx-auto px-12 pt-6 grid xl:grid-cols-12 items-start">

            <div className="xl:col-span-10">

            <div  className={darkModeToggle ? "dark bg-black text-white px-6 py-1 pb-4" : "px-6 py-1 pb-4"} >
              <a href="/" className="opacity-50 hover:opacity-100 duration-200">← Browse Components</a>
            </div>

            <Tabs defaultValue="view" className="max-w-6xl mx-auto pb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="iterate">Iterate</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <Card className="shadow-none py-4 bg-opacity-0 shadow overflow-x-auto">
                  <CardContent className="space-y-2">

                  <div className="max-w-6xl mx-auto p-4">
                    {generatedComponentImports.slice(selectedComponentIndex,selectedComponentIndex+1).map((item, index) => (
                      <div key={index} >
                        { index === 0 ? <item.component /> : ''}
                      </div>
                    ))}
                  </div>

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code">
                <Card className="border-none shadow-none py-4 bg-opacity-0">
                  <CardContent className="space-y-2">

                  <div className="overflow-auto">
                    {generatedComponentImports.slice(selectedComponentIndex,selectedComponentIndex+1).map((item, index) => (
                      <p key={index} className="whitespace-pre-wrap font-mono p-4 text-xs border cursor-pointer hover:p-6 hover:text-pink-600 duration-200"
                      onClick={() => {navigator.clipboard.writeText(item.code)}} >
                        { index === 0 ? `${item.code}` : ''}
                      </p>
                    ))}
                  </div>

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="iterate">
                <Card>
                  <CardHeader className="border-b border-opacity-50">
                    <CardTitle>Iterate on component <span className="underline">{componentIdOg}</span></CardTitle>
                    <CardDescription>
                      Make changes to your component. This will iterate on the latest found version.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 mt-4">

                    <div className="grid w-full gap-1.5">
                      <div className="mb-4">
                        <Label>Iteration description</Label>
                        <Textarea placeholder="make the text bigger"
                                  value={userInput} onChange={handleInputChange} disabled={isLoading} />
                      </div>
                      <div className="text-center w-4xl">
                        <Button onClick={handleButtonClick} disabled={isLoading || !userInput.length} className="p-4 shadow" >
                          {isLoading ? 'Processing ...' : 'Make changes'}
                        </Button>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>






            </div>

            <div className="xl:col-span-2 grid grid-cols-3 xl:grid-cols-1 max-h-screen items-start overflow-y-auto border-l border-b border-r pb-12 rounder rounded-xl shadow shadow-xl xl:max-w-[25vw] overflow-x-auto">

              <p className="p-2 pl-4 opacity-70 text-base break-words">Iterations History</p>

              {generatedComponentImports.map((item,idx) => generatedComponentImports[generatedComponentImports.length-1-idx]).map((item, index) => (
                <div key={index} className="mt-0 m-1 mx-0 border-t hover:p-1 duration-200 cursor-pointer shadow shadow-xl"
                  onClick={()=>{ setSelectedComponentIndex( generatedComponentImports.length-1-index) }} >
                  <div className="p-1 px-2 m-2 mb-0 break-words text-sm cursor-pointer duration-200 xl:max-w-[13vw] overflow-x-auto"
                        onClick={()=>{ setSelectedComponentIndex( generatedComponentImports.length-1-index) }} >
                    <p className={darkModeToggle ? "dark text-white text-xs whitespace-pre-wrap" : "text-black text-xs whitespace-pre-wrap"} >
                      • {item.prompt}
                      <br/><span className="text-xs font-normal opacity-50">{item.version}</span>
                    </p>
                  </div>
                  {/*<div className="p-1 max-h-52 w-56 max-w-56 overflow-hidden"><item.component /></div>*/}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
