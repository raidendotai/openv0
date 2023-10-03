<script>
import { Button } from 'flowbite-svelte';
import { SendHorizontal } from 'lucide-svelte';
let inputMessage = '';
</script>
   <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
     <div class="flex justify-between items-center p-6 space-x-4">
       <div className="relative">
         <input
           type="text"
           placeholder="Type your message..."
           class="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
           bind:value={inputMessage}
         />
         {#if inputMessage === ''}
           <SendHorizontal
             class='absolute top-2/4 transform -translate-y-2/4 right-3 h-5 w-5 text-gray-400'
           />
         {/if}
       </div>
       <Button
         disabled={inputMessage === ''}
         color={inputMessage === '' ? "grey" : "blue"}
         class="transform transition ease-in-out duration-500"
       >
         <SendHorizontal class="w-5 h-5" />
       </Button>
     </div>
   </div>