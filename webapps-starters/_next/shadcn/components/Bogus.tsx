"use client";

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col space-y-2">
      wtf
      <Textarea className="border border-gray-300 dark:border-gray-700 p-2 rounded" placeholder="Write your text here" />
      <Button variant="primary" className="p-2 rounded text-white bg-blue-500 dark:bg-blue-700 flex items-center justify-center">
        <SendHorizontal className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
}
