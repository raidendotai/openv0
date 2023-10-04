import { useState } from 'react';

/*
import ReactSVG from '@/assets/react.svg';
import { Badge } from '@/components/ui/badge';
import CountBtn from '@/components/CountBtn';
import Cardo from '@/components/Cardo';
*/

import { Button } from "@/components/ui/button"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs"

import { SunMoon } from "lucide-react"

import GeneratedComponentsList from '@/components/generated-components-list';
import GenerateNewComponent from '@/components/generate-new-component';

export default function Home() {
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  return (
    <div className={darkModeToggle ? "dark bg-black" : ""} >
      <div className="">

      <div className="text-right fixed top-0 right-0 p-2 pt-6">
        <Button className={darkModeToggle ? "rounded rounded-full dark" : "rounded rounded-full"}
                onClick={() => setDarkModeToggle(() => !darkModeToggle)} >
          <SunMoon className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="browse" className="max-w-8xl mx-auto px-24 pt-6 items-start">

      <div  className={darkModeToggle ? "dark bg-black text-white py-1 pb-4" : "py-1 pb-4"} >
        <a href="https://raiden.ai" target='_blank' className="opacity-50 hover:opacity-100 duration-200">openv0 <span className="text-xs">by Raiden AI</span></a> <a className="opacity-50 text-xs hover:opacity-80 duration-200" target='_blank' href="https://v0.dev">&nbsp;/ an open source tool inspired by v0.dev, based on shadcn + lucide</a>
      </div>

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="new">New Component</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="pb-12">
          <Card>
            <CardHeader className="border-b border-opacity-50">
              <CardTitle>Browse generated components</CardTitle>
              <CardDescription>
                Preview and iterate on your generated components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 mt-4">
              <GeneratedComponentsList/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader className="border-b border-opacity-50">
              <CardTitle>Generate a new component</CardTitle>
              <CardDescription>
                Describe the component you would like to generate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 mt-4">
              <GenerateNewComponent/>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
      </div>
    </div>
  );
}
