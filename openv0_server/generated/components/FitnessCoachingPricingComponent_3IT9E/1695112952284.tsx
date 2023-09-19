import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Tag, DollarSign } from 'lucide-react'
import { CheckSquare, HeartPulse } from 'lucide-react';

const FitnessCoachingPricingComponent = () => {

  const plans = [
    {
      name: "Basic",
      features: [
        "2 Personalized workouts per week",
        "Email support",
        "Monthly Progress checks",
      ],
      price: "49"
    },
    {
      name: "Pro",
      features: [
        "5 Personalized workouts per week",
        "Priority Email support",
        "Weekly Progress checks",
        "Nutritionist calls",
      ],
      price: "79"
    },
    {
      name: "Elite",
      features: [
        "Unlimited Personalized workouts",
        "24/7 Customer support",
        "Daily Progress checks",
        "Nutritionist calls",
        "Diet Plans, Supplement Guidance",
      ],
      price: "99"
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-x-6 gap-y-10 p-8 dark:bg-gray-800">
      {plans.map((plan, index) => (
        <Card key={index} className="rounded-lg shadow-lg overflow-hidden mx-3 transform hover:scale-105 transition transform ease-in-out duration-700 bg-white p-6 dark:bg-gray-700">
          <Badge className="w-full bg-indigo-600 dark:bg-indigo-500 text-white text-lg font-bold py-3 rounded-lg" >{plan.name}</Badge>
          <CardHeader className="py-5">
            <CardTitle className="text-3xl"><DollarSign className="h-6 w-6 inline-block align-middle text-indigo-600 dark:text-indigo-500"/>{plan.price}/ month</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {plan.features.map((feature, index) => (
                <li key={index} className="py-2">
                  {index === 0 ? <HeartPulse className="h-4 w-4 inline-block align-middle text-indigo-800 mr-2 dark:text-yellow-500"/> : <CheckSquare className="h-4 w-4 inline-block align-middle text-indigo-800 mr-2 dark:text-yellow-500"/>}
                  <CardDescription className="inline-block align-middle text-indigo-800 dark:text-yellow-500">{feature}</CardDescription>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-600">
            <Button variant="secondary" className="w-full text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors">Subscribe</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default FitnessCoachingPricingComponent;