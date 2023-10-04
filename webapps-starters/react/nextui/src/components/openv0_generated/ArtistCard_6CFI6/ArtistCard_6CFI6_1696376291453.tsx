"use client";

import { Card } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';
import { CardFooter } from '@nextui-org/react';
import { CardHeader } from '@nextui-org/react';
import { Image } from '@nextui-org/react';

const ArtistCard_6CFI6 = () => {
  return (
    <Card className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden dark:bg-black">
      <CardHeader className="flex items-center justify-between text-xl font-semibold">
        <span>Jorja Smith</span>
      </CardHeader>
      <CardBody>
        <Image
          width={320}
          height={420}
          alt="Jorja Smith"
          src="https://consequence.net/wp-content/uploads/2023/05/Jorja-Smith-photo-courtesy-of-the-artist.jpg"
        />
      </CardBody>
      <CardFooter className="p-4 text-center bg-cover text-white bg-blur opacity-80 dark:bg-black">
        <p>Introducing - Jorja Smith</p>
      </CardFooter>
    </Card>
  );
}

export default ArtistCard_6CFI6;