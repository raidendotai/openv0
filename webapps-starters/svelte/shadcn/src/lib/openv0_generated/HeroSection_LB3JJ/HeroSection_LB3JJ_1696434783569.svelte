<script>
import { Button } from '$lib/components/ui/button';
import { Github } from 'lucide-svelte';
import { Mail } from 'lucide-svelte';
</script>
   <section class="grid grid-cols-2 py-16 px-6 bg-white dark:bg-black">
       <div class="max-w-2xl mx-auto">
           <h2 class="text-4xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
               openv0 - generative UI components
           </h2>
           <p class="text-xl text-gray-700 dark:text-gray-300">
               Welcome to openv0, a web app platform offering an extensive suite of generative UI components that are completely customizable. Seamlessly designed to fit and upscale your project.
           </p>
       </div>
       <div class="flex flex-col justify-center items-center">
           <Button variant="outline" class="w-full mb-4 flex items-center">
               <Github class="h-4 w-4 mr-2" />
               Login with Github
           </Button>
           <Button variant="outline" class="w-full flex items-center">
               <Mail class="h-4 w-4 mr-2" />
               Login with Email
           </Button>
       </div>
   </section>