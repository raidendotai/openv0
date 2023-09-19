import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle2, MessageSquare, MapPin, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfileCard = () => {
    return (
        <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 dark:bg-black">
            <CardContent>
                <CardHeader className="flex items-center justify-center">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="https://picsum.photos/200" alt="Profile Picture" className="object-cover" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-center mt-4">
                        <CardTitle className="block text-lg leading-tight font-medium text-black dark:text-white">
                            <span>
                                Jessica, 24
                            </span>
                        </CardTitle>
                        <CardDescription className="flex items-center justify-center dark:text-gray-200">
                            <MapPin className="inline mr-2 text-blue-lucide dark:text-blue-lucide" />
                            New York, USA
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="mt-2 text-gray-500 dark:text-gray-300">
                    Hi there! My name is Jessica, and I'm passionate about adventure and travelling. Friends describe me as free-spirited and brave—always ready to face new challenges. I'm eager to connect with fellow travellers who share my enthusiasm for exploring.
                </CardContent>
                <CardFooter className="flex justify-center mt-4 space-x-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                            Message
                        </span>
                    </Button>
                    <Button variant="solid" className="bg-red-500 hover:bg-red-700 flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>
                            Like
                        </span>
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;