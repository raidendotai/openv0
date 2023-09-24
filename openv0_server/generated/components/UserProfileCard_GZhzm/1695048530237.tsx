import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2, MessageSquare, MapPin } from 'lucide-react';

const UserProfileCard = () => {
    return (
        <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <Avatar className="h-48 w-full object-cover md:w-48">
                        <AvatarImage src="https://picsum.photos/200" alt="Profile Picture" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
                <div className="p-8">
                    <CardHeader className="block mt-1 text-lg leading-tight font-medium text-black">
                        <CardTitle>
                            <UserCircle2 className="inline mr-2 text-blue-lucide" />
                            Jessica, 24
                        </CardTitle>
                        <CardDescription>
                            <MapPin className="inline mr-2 text-blue-lucide" />
                            New York, USA
                        </CardDescription>
                    </CardHeader>            
                    <CardContent className="mt-2 text-gray-500">
                        Hi, I'm Jessica. I love adventure and travelling. Looking for someone with the same interests!
                    </CardContent>
                    <CardFooter className="flex justify-between mt-4">
                        <Button variant="outline">
                            <MessageSquare className="mr-2 h-4 w-4" /> 
                            Message
                        </Button>
                        <Button className="bg-blue-lucide text-white" variant="solid">
                            More Info
                        </Button>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}

export default UserProfileCard;