"use client";

import { Anchor } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { CardBody } from 'flowbite-react';
import { CardImage } from 'flowbite-react';
import { Heading } from 'flowbite-react';
import { Text } from 'flowbite-react';
// Import Necessary Libraries and Components
// Define the component
const ArtistCard_IC8E0 = () => {
    return (
        <Card className="max-w-xl overflow-hidden shadow-lg bg-white rounded-lg dark:bg-black mx-auto">
            <CardImage 
              src="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg" 
              alt="Jorja Smith"
              className="h-64 object-cover w-full"
            />
            <CardBody className="px-6 py-5 text-center">
              <Heading tag="h2" className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Jorja Smith</Heading>
              <Text className="text-gray-700 dark:text-gray-200">Jorja Smith is a British singer, originally from Walsall, West Midlands. In January 2016, she released 'Blue Lights', her debut single that she and her friend wrote in their school's music room.</Text>
              <Anchor href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4">
                View Profile
              </Anchor>
            </CardBody>
        </Card>
    )
}

// Export the component as default
export default ArtistCard_IC8E0;