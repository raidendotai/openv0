import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Heart, Twitter } from "lucide-react";
import { Link } from 'react-router-dom';

const TweetUI: React.FC = () => {
  const handleSwitchChange = (checked: boolean) => {
    console.log(checked)
  }
  
  return (
    <div className="rounded-lg bg-white dark:bg-black shadow-lg max-w-xs mx-auto py-4 px-10 mt-6">
      <div className="flex items-center justify-between mb-6">
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/150" alt="User name" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start ml-4">
          <Link to="/user-profile" className="text-blue-500 dark:text-blue-300" role="button">Username</Link>
          <span className="text-gray-500 dark:text-gray-300">@userhandle</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Heart className="h-4 w-4 dark:text-gray-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to Favorites</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, doloribus, dolorem iusto dolorum longe aliquam.</p>
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Reply</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reply to tweet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Retweet</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Retweet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Share</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this tweet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default TweetUI;