import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const TwitterPost = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Card className="space-y-4">
        <CardHeader className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Label className="font-medium text-gray-700 dark:text-gray-200">
            Username
          </Label>
        </CardHeader>
        <CardContent>
          <Input
            className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:bg-white dark:focus:bg-gray-600"
            type="text"
            placeholder="What's happening?"
          />
        </CardContent>
        <div className="flex justify-end">
          <Button
            variant="filled"
            className="inline-flex items-center bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300"
          >
            <Send className="mr-2 h-4 w-4" />
              Tweet
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TwitterPost;