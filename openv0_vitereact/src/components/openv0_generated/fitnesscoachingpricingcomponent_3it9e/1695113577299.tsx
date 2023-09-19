import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vegan, Apple, Banana } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FitnessCoachingPricingComponent = () => {
  const plans = [
    {
      name: "Green Fit",
      icon: <Vegan className="h-6 w-6" />,
      features: ["5 Veggie Meals", "Fitness Trainer Access", "24/7 Health Support", "Daily Nutrition Counseling"],
      price: "$49",
    },
    {
      name: "Apple Active",
      icon: <Apple className="h-6 w-6" />,
      features: ["7 Balanced Meals", "Fitness Trainer Access", "24/7 Health Support", "Weekly Health Checkups", "Personal Nutritionist Calls"],
      price: "$69",
    },
    {
      name: "Vegan Vitality",
      icon: <Banana className="h-6 w-6" />,
      features: ["Unlimited Vegan Meals", "Fitness Trainer Access", "24/7 Health Support", "Weekly Health Checkups",
                  "Personal Nutritionist Calls", "Priority Food Delivery"],
      price: "$99",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-around items-center px-4 py-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-md shadow-lg">
      {plans.map((plan) => (
        <Card key={plan.name} className="m-4 md:m-0 p-6 bg-white rounded-lg shadow-md">
          <CardHeader className="flex flex-col items-center space-y-2">
            {plan.icon}
            <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
            <CardDescription className="text-xl text-gray-600">{plan.price}/mo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 py-6">
            {plan.features.map((feature) => (
              <TooltipProvider key={feature}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-center space-x-1 cursor-pointer text-gray-500">
                      <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
                      <CardDescription>{feature}</CardDescription>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black dark:bg-gray-700 dark:text-white">
                    <p>{feature}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CardContent>
          <CardFooter className="pt-8">
            <Button variant="outline" className="text-white bg-blue-500 hover:bg-blue-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors w-full py-2 rounded-lg">Get {plan.name}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FitnessCoachingPricingComponent;