import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clipboard, Code2 } from "lucide-react";

const CodeSnippet = () => {
  const [isCopied, setIsCopied] = useState(false);

  const exampleCode = `ffmpeg -i input.mp4 -vf "scale=640:480" output.mp4`;

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(exampleCode)
      .then(() => setIsCopied(true))
      .catch(() => setHasError(true));
  }, []);

  return (
    <Card className="dark:bg-gray-800 p-4 rounded-lg relative">
      <CardHeader>
        <CardTitle className="font-mono text-xl flex items-center pb-2">
          <Code2 className="h-4 w-4 mr-2"/>
          FFmpeg shell snippet
        </CardTitle>
        <CardDescription className="font-mono pb-4">This code scales the video to 640x480 resolution</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="font-mono text-sm p-4 dark:bg-gray-700 rounded bg-gray-200">{exampleCode}</pre>
      </CardContent>
      <CardFooter className="flex flex-row-reverse mt-4">
        <Button variant="outline" onClick={handleCopy}>
          <Clipboard className="h-4 w-4 mr-2 inline-block" />
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeSnippet;