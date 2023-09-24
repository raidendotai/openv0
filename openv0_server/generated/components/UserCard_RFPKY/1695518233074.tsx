import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const UserCard: React.FC = () => {
    return (
        <Card className="transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            <CardHeader className="flex items-center space-x-2 p-4 dark:bg-gray-800">
                <Avatar className="w-14 h-14">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-medium dark:text-white">Full Name</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">UX Designer</p>
                </div>
            </CardHeader>
            <CardContent className="py-4 px-6 dark:bg-gray-800 border-t border-gray-200 dark:text-gray-300">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolorum error facilis veritatis.</p>
            </CardContent>
        </Card>
    );
};

export default UserCard;