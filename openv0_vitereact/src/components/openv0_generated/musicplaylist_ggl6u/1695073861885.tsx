import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  PlayCircle,
  PauseCircle,
  SkipForward,
  ArrowLeftCircle,
 } from "lucide-react";

const MusicPlaylist = () => {
    const tracks = ['N.Y. State of Mind', 'Life\'s a B****', 'The World Is Yours', 'Halftime', 'Memory Lane (Sittin\' in da Park)', 'One Love', 'One Time 4 Your Mind', 'Represent', 'It Ain\'t Hard to Tell'];
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div style={{ backgroundImage: 'url(MusicImageURL)', backgroundRepeat:'no-repeat', backgroundSize:'cover' }} 
                className="md:flex-shrink-0 md:w-48 h-48 object-cover md:h-full">
                </div>
                <div className="p-8">
                    <Card className="space-y-4">
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg" alt="@nas" />
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="mt-4 text-xl font-semibold">Illmatic Album</p>
                                <p className="mt-2 text-gray-500">1994 - Nas</p>
                            </div>
                        </div>
                        <ul className="m-auto mt-4 space-y-3">
                        {tracks.map((track, index) => (
                            <li key={index} className="flex justify-between items-center">
                            <p className="text-base">{track}</p>
                            <div className="flex space-x-2">
                                <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">
                                        <PlayCircle className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>Play</HoverCardContent>
                                </HoverCard>
                                <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">
                                        <PauseCircle className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>Pause</HoverCardContent>
                                </HoverCard>
                                <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">
                                        <SkipForward className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>Skip Forward</HoverCardContent>
                                </HoverCard>
                                <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">
                                        <ArrowLeftCircle className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>Go Back</HoverCardContent>
                                </HoverCard>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-right text-xs text-gray-500">1994 Illmatic Album</p>
                    </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default MusicPlaylist;