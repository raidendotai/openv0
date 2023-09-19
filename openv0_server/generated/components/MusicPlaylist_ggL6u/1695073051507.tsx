import React from 'react';
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
    return (
        <>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
                <div className="md:flex">
                    <div style={{ backgroundImage: 'url(MusicImageURL)', backgroundRepeat:'no-repeat', backgroundSize:'cover' }} 
                    className="md:flex-shrink-0 md:w-48 h-48 object-cover md:h-full">
                    </div>
                    <div className="p-8">
                        <Card className="space-y-4">
                        <CardContent>
                            <p className="text-xl font-semibold">Illmatic Album</p>
                            <p className="text-gray-500">1994 - Nas</p>
                            <ul className="mt-4 space-y-3">
                            {['N.Y. State of Mind', 'Life\'s a Bitch', 'The World Is Yours', 'Halftime', 'Memory Lane (Sittin\' in da Park)', 'One Love', 'One Time 4 Your Mind', 'Represent', 'It Ain\t Hard to Tell'].map((track, index) => (
                                <li key={index} className="flex justify-between items-center">
                                <p className="text-base">{track}</p>
                                <div className="flex space-x-2">
                                    <Button variant="link">
                                    <PlayCircle className="h-5 w-5" />
                                    </Button>
                                    <Button variant="link">
                                    <PauseCircle className="h-5 w-5" />
                                    </Button>
                                    <Button variant="link">
                                    <SkipForward className="h-5 w-5" />
                                    </Button>
                                    <Button variant="link">
                                    <ArrowLeftCircle className="h-5 w-5" />
                                    </Button>
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
        </>
    );
}

export default MusicPlaylist;