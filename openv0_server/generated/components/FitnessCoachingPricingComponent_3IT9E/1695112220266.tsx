import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Tag, DollarSign } from 'lucide-react'

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
    <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
      {plans.map((plan, index) => (
        <Card key={index} className="rounded-lg shadow-lg overflow-hidden mx-3">
          <Badge className="w-full bg-indigo-600 text-white text-lg font-bold p-3" >{plan.name}</Badge>
          <CardHeader className="py-5">
            <CardTitle className="text-3xl">{plan.price} <DollarSign className="h-6 w-6 inline-block align-middle text-indigo-600"/>/ month</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {plan.features.map((feature, index) => (
                <li key={index} className="py-2">
                  <Tag className="h-4 w-4 inline-block align-middle text-indigo-600 mr-2"/> 
                  <CardDescription className="inline-block align-middle">{feature}</CardDescription>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="py-5">
            <Button variant="secondary" className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default FitnessCoachingPricingComponent;