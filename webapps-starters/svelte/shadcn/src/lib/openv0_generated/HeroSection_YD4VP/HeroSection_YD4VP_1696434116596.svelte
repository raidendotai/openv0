<script>
import { Button } from '$lib/components/ui';
import { Label } from '$lib/components/ui';
import { Github } from 'lucide-svelte';
</script>
   <section class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black p-4">
       <Label hidden for="heroTitle">Hero section title</Label>
       <h1 id="heroTitle" class="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white">
           OpenV0 - Generative UI Components
       </h1>
       <p class="mb-8 text-center text-gray-700 dark:text-gray-200">
           Welcome to OpenV0, the home of generative UI components. Browse our selection or learn how to create your own.
       </p>
       <div class="flex space-x-4">
           <Button variant="outline">
               <Github class="mr-2 h-5 w-5" />
               Login with Google
           </Button>
           <Button variant="outline">
               <Github class="mr-2 h-5 w-5" />
               Login with Github
           </Button>
       </div>
   </section>
