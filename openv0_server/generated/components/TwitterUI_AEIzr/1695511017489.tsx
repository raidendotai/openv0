import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, Repeat1, HeartPulse, Share2 } from "lucide-react";

export const TwitterUI = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Card>
          <h2 className="text-2xl font-bold">Menu</h2>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink>Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>Notifications</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>Messages</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>Profile</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button>Log Out</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Card>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold">Home</h2>
        <Input type="text" placeholder="What's happening?" />

        <div className="mt-4">
          <Card>
            <CardHeader>
              <Avatar>
                <AvatarImage src="https://github.com/user.png" alt="@user" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <CardTitle>Username</CardTitle>
                <CardDescription>@username</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                One of React.JS great features is the ability to break down UIs
                into reusable, testable pieces — components.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>
                <Repeat1 className="h-4 w-4" /> 1K
              </Button>
              <Button>
                <HeartPulse className="h-4 w-4" /> 2K
              </Button>
              <Button>
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};