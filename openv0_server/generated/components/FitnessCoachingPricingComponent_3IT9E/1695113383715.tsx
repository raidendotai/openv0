import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Vegan, Carrot, Apple, Sandwich, Soup, Banana } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FitnessNutritionPricingComponent = () => {

  const plans = [
    {
      name: "Green Glow",
      icon: <Vegan className="h-4 w-4 inline-block mr-2" />,
      features: [
        "5 vegan meals daily",
        "Email support",
        {
          feature: "Weekly Progress checks",
          tooltip: "Get a progress check every week to keep you stay motivated and on track."
        }
      ],
      price: "59"
    },
    {
      name: "Active Apple",
      icon: <Apple className="h-4 w-4 inline-block mr-2" />,
      features: [
        "7 balanced meals daily",
        "Priority Email support",
        {
          feature: "Personal nutritionist calls",
          tooltip: "Need a quick consult? No worries! Your personal nutritionist is only a call away."
        },
        "Diet Plans, Supplement Guidance",
      ],
      price: "89"
    },
    {
      name: "Fruity Fiesta",
      icon: <Banana className="h-4 w-4 inline-block mr-2" />,
      features: [
        "Unlimited fruit-based meals",
        "24/7 Customer support",
        {
          feature: "Priority delivery",
          tooltip: "Get your meals delivered to your doorstep before 7AM everyday."
        },
        "Diet Plans, Supplement Guidance",
      ],
      price: "109"
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-x-6 gap-y-10 p-8 dark:bg-gray-900">
      {plans.map((plan, index) => (
        <Card key={index} className="rounded-lg shadow-lg overflow-hidden mx-3 transform hover:scale-105 transition transform ease-in-out duration-700 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
          <CardHeader className="py-5">
            <CardTitle className="text-3xl">{plan.price}/ month</CardTitle>
            <CardDescription>{plan.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside">
              {plan.features.map((feature, index) => {
                if (typeof feature === "string") {
                  return <li key={index} className="flex items-center">{plan.icon}<CardDescription>{feature}</CardDescription></li>
                } else {
                  return (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li className="flex items-center">{plan.icon}<CardDescription className="cursor-pointer">{feature.feature}</CardDescription></li>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-black dark:bg-gray-700 dark:text-white">
                          <p>{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                }
              })}
            </ul>
          </CardContent>
          <CardFooter className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" className="w-full text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors">Subscribe</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default FitnessNutritionPricingComponent;