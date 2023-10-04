"use client";

import { Avatar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { MessageCircle } from 'lucide-react';
import { PlayCircle } from 'lucide-react';

const ArtistCard_HPWCH = () => {
    return (
        <Card className="max-w-sm bg-white dark:bg-black rounded-xl overflow-hidden shadow-md">
            <div className="p-4">
                <Avatar
                    img="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg"
                    alt="Jorja Smith"
                    className="h-36 w-36 rounded-full mx-auto mb-4"
                />
                <div className="text-center">
                    <p className="text-gray-900 dark:text-white font-bold text-xl mb-4">Jorja Smith</p>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-4">
                        Jorja Smith is a British singer-songwriter from Walsall, West Midlands. She has independently released numerous singles and one extended play, Project 11 (2016).
                    </p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <Button color="success" className="flex items-center">
                        <PlayCircle className="h-5 w-5 mr-2" />
                        Play Music
                    </Button>
                    <Button color="purple" className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Contact
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ArtistCard_HPWCH;