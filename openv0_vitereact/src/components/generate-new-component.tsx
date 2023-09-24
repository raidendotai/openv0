import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

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
      const { data } = await axios.post(
        "http://localhost:3000/api/components/new",
        {
          query: userInput,
        }
      );

      // Handle a successful response here

      console.log("API response:", data);
      navigateTo(`/view/?componentId=${data.componentId}`);
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
