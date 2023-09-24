import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HeartOff, Twitter, ThumbsUp, Repeat1, Share2, ReplyAll } from "lucide-react";
import { Link } from 'react-router-dom';

const TweetUI: React.FC = () => {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader className="flex space-x-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link to="/user-profile" className="text-blue-500 dark:text-blue-300">Username</Link>
          <p className="text-gray-500 dark:text-gray-300">@userhandle</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat impedit voluptatibus reiciendis magni ratione laborum nobis officiis architecto, modi aspernatur?</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        <Button variant="outline" className="flex items-center space-x-1">
          <ReplyAll className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
          <span>Reply</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-1">
          <Repeat1 className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
          <span>Retweet</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-1">
          <HeartOff className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
          <span>Like</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-1">
          <Share2 className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TweetUI;