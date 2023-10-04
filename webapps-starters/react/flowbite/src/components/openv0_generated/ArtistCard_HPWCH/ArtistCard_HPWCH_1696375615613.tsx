import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { HiOutlineMail } from 'react-icons/hi';
"use client";

const ArtistCard_HPWCH = () => {
    return (
        <Card className="max-w-sm bg-white dark:bg-black rounded-xl overflow-hidden shadow-md">
            <img 
                className="w-full h-56 object-cover" 
                src="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg" 
                alt="Jorja Smith" />
            <div className="p-4">
                <div className="text-center">
                    <p className="text-gray-900 dark:text-white font-bold text-xl mb-4">Jorja Smith</p>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-4">
                        Jorja Smith is a British singer-songwriter from Walsall, West Midlands. She has independently released numerous singles and one extended play, Project 11 (2016).
                    </p>
                </div>
                <div className="flex justify-between items-center mt-8 space-x-4">
                    <Button color="success" className="flex items-center space-x-2">
                        <HiOutlineArrowRight className="h-5 w-5" />
                        <span>Play Music</span>
                    </Button>
                    <Button color="blue" className="flex items-center space-x-2">
                        <HiOutlineMail className="h-5 w-5" />
                        <span>Contact</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ArtistCard_HPWCH;