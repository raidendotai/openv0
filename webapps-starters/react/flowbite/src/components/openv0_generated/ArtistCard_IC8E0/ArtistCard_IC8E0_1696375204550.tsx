"use client";

import { Avatar } from 'flowbite-react';
import { Card } from 'flowbite-react';
// Import necessary components and libraries
// Define the component
const ArtistCard_IC8E0 = () => {
    return (
        <Card href="#" className="max-w-sm rounded overflow-hidden shadow-lg">
            <Avatar 
              img="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg" 
              alt="Jorja Smith"
              rounded
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 dark:text-white">Jorja Smith</div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a 
                href="#"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full text-sm"
              >
                View Profile
              </a>
            </div>
        </Card>
    )
}

// Export the component as default
export default ArtistCard_IC8E0;