<script>
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';
import { SendHorizontal } from 'lucide-svelte';
import { writable } from 'svelte/store';
let message = writable("");
    const sendMessage = () => {
        const msg = $message;
        message.set("");
        dispatch('messageSent', msg);
    };
</script>
   <div class="flex items-center shadow-sm rounded-md p-2">
       <Input 
           bind:value={$message} 
           type="text" 
           class="flex-grow px-3 py-2 text-base dark:bg-gray-800 dark:text-white rounded-md"
           placeholder="Type your message..."
       />
       <Button 
           class="ml-3 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700" 
           on:click={sendMessage}
       >
           <SendHorizontal class="h-4 w-4"/>
       </Button>
   </div>