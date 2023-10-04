<script>
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';
import { Github } from 'lucide-svelte';
</script>
   <section class="py-16 px-6 bg-white dark:bg-black">
     <div class="max-w-2xl mx-auto text-center">
       <h2 class="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
         openv0 - generative UI components
       </h2>
       <p class="text-xl text-gray-700 dark:text-gray-300 mb-10">
         Welcome to openv0, a web app platform offering an extensive suite of generative UI components that are completely customizable. Seamlessly designed to fit and upscale your project.
       </p>
       <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center m-auto">
         <Button variant="outline" class="w-full md:w-auto flex items-center">
           <Github class="h-4 w-4 mr-2" />
           Login with Github
         </Button>
         <div class="md:flex md:items-center">
           <Input type="email" id="email" placeholder="Email" class="w-full pr-12 md:pr-0 md:py-2 md:text-center"/>
           <Button class="w-full md:w-auto">Login with Email</Button>
         </div>
       </div>
     </div>
   </section>