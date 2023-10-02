/*

  - this takes care of duplicate imports
  - also, only react in case there are imports, otherwise wont return
*/

const { fixImport } = require("import-fixer");
const fs = require(`fs`);

const svelte_example = `
import * as axios from 'axios';
import * as icons from 'icons';

let count = 0;

function increment() {
  count += 1;
}

<main>
  <h1>Counter</h1>
  <p>Count: {count}</p>
  <button on:click={increment ; axios.get('https://example.com')}>Increment</button>
</main>
`.trim();

const svelte_example_2 = `
import { Bell } from "radix-icons-svelte";
import * as Card from "___lib/components/ui/card"; // <------- $ gets ignored, found problem
import { Button } from "___lib/components/ui/button";
import { Switch } from "___lib/components/ui/switch";
import { Switch } from "___lib/components/ui/switch";

export default function App(){

  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago"
    },
    {
      title: "You have a new message!",
      description: "1 hour ago"
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago"
    }
  ];

  return (
    <>
      <Card.Root class="w-[380px]">
        <Card.Header>
          <Card.Title>Notifications</Card.Title>
          <Card.Description>You have 3 unread messages.</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
          <div class="flex items-center space-x-4 rounded-md border p-4">
            <Bell />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Push Notifications</p>
              <p class="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {#each notifications as notification, idx (idx)}
              <div
                class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div class="space-y-1">
                  <p class="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </Card.Content>
        <Card.Footer>
          <Button class="w-full">
            <Check class="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </Card.Footer>
      </Card.Root>
    </>
  )
}
`.trim();

const react_example = `
"use client";
import React from 'react';
import * as axios from 'axios';
import MyComponent from './MyComponent';
import { SendIcon } from 'lucide-react';
import { DownloadIcon, SendIcon } from 'lucide-react';
import MyComponent from './MyComponent';

export default function App(){

  function postSomething() {
    axios.post("https://example.com" , {})
  }

  return (
    <>
      <MyComponent code={()=>{fetch('https://example.com/whatever')}}></MyComponent>
    </>
  )
}
`.trim();

const temp_file = `__import_fixer_temp_${Math.floor(
  Math.random() * (99999 - 10000) + 10000,
)}`;
let fixed_code;

fixed_code = fixImport(
  temp_file, // because this great library needs file lol
  svelte_example_2,
);

if (fixed_code.error) {
  console.dir({ fixed_code });
} else {
  console.log("no error *****");
  if (
    fixed_code.output.includes(`'use client'`) ||
    fixed_code.output.includes(`"use client"`)
  ) {
    fixed_code.output =
      `"use client";\n\n` +
      fixed_code.output
        .split(`\n`)
        .filter(
          (e) => !e.includes(`"use client"`) && !e.includes(`'use client'`),
        )
        .join(`\n`);
  }
  console.dir(fixed_code);
}

try {
  fs.unlinkSync(temp_file);
} catch (e) {
  true;
}

// ^ if components has no imports; will return {error:true}, so check for if component imports something first
