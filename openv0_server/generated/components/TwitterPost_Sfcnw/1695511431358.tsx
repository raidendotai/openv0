import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const TwitterPost = () => {
  return (
    <Card className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-2">
        <CardHeader className="flex items-start">
          <Avatar className="mr-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Label className="font-medium text-gray-700 dark:text-gray-200">
            Username
          </Label>
        </CardHeader>
        <CardContent>
          <Input
            className="w-full py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:bg-white dark:focus:bg-gray-600"
            type="text"
            placeholder="What's happening?"
          />
        </CardContent>
        <div className="flex justify-end">
          <Button
            variant="filled"
            className="inline-flex items-center bg-blue-500 text-white rounded-md py-1 px-2 hover:bg-blue-600 dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300"
          >
            <Send className="mr-1 h-3 w-3" />
              Tweet
          </Button>
        </div>
    </Card>
  );
};

export default TwitterPost;