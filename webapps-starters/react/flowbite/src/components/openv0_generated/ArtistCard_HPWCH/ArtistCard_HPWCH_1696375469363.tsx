"use client";

import { Avatar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';

const ArtistCard_HPWCH = () => {
    return (
        <Card className="max-w-sm bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-8">
                <Avatar
                    img="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg"
                    alt="Jorja Smith"
                    className="h-24 w-24 rounded-full mx-auto mb-4"
                />
                <div className="text-center">
                    <p className="text-gray-900 dark:text-white font-bold text-xl mb-2">Jorja Smith</p>
                    <p className="text-gray-600 dark:text-gray-300 text-base">
                        Jorja Smith is a British singer-songwriter from Walsall, West Midlands. She has independently released numerous singles and one extended play, Project 11 (2016).
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Button color="success" className="m-2">
                        Play Music
                    </Button>
                    <Button color="purple" className="m-2">
                        Contact
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ArtistCard_HPWCH;