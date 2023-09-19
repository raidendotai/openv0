import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle2, MessageSquare, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfileCard = () => {
    return (
        <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <CardContent>
                <CardHeader className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="https://picsum.photos/200" alt="Profile Picture" className="object-cover" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="block mt-1 text-lg leading-tight font-medium text-black">
                            <span>
                                Jessica, 24
                            </span>
                        </CardTitle>
                        <CardDescription className="flex items-center">
                            <MapPin className="inline mr-2 text-blue-lucide" />
                            New York, USA
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="mt-2 text-gray-500">
                    Hi, I'm Jessica. I love adventure and travelling. Looking for someone with the same interests!
                </CardContent>
                <CardFooter className="flex justify-between mt-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                            Message
                        </span>
                    </Button>
                    <Button className="bg-blue-lucide text-white" variant="solid">
                        More Info
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;