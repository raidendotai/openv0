import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function GenerateNewComponent() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!userInput || isLoading) {
      return;
    }

    // Disable the button and show "Processing..." text
    setIsLoading(true);

    try {
      // Make the API POST request with the user input
      const response = await fetch("http://localhost:3000/component/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      if (response.ok) {
        // Handle a successful response here
        const data = await response.json();
        console.log("API response:", data);
        navigateTo(`/view/?componentId=${data.componentId.toLowerCase()}`);
      } else {
        // Handle an error response here
        console.error("API error:", response.statusText);
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      // Re-enable the button
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full gap-1.5">
      <div className="mb-4">
        <Label>Component description</Label>
        <Textarea
          placeholder="A table component that displays invoices"
          value={userInput}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </div>
      <div className="text-center w-4xl">
        <Button
          onClick={handleButtonClick}
          disabled={isLoading || !userInput.length}
          className="p-4 shadow"
        >
          {isLoading ? "Processing ..." : "Generate"}
        </Button>
      </div>
    </div>
  );
}
