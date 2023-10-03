<script>
import { Button } from '$lib/components/ui/button';
import { Textarea } from '$lib/components/ui/textarea';
import { SendHorizontal } from 'lucide-svelte';
import { writable } from 'svelte/store';
let message = writable("");
const sendMessage = () => {
  const msg = $message;
  message.set("");
  dispatch('messageSent', msg);
};
</script>
   <div class="flex flex-col shadow-sm rounded-md p-2 bg-white dark:bg-black">
       <Textarea 
           bind:value={$message} 
           placeholder="Type your message..."
           rows="5"
           class="flex-grow px-3 py-2 text-base resize-none dark:bg-gray-800 dark:text-white rounded-t-md"
       />
       <Button 
           class="mt-3 self-end py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700" 
           on:click={sendMessage}
       >
           <SendHorizontal class="h-5 w-5"/>
           Send
       </Button>
   </div>