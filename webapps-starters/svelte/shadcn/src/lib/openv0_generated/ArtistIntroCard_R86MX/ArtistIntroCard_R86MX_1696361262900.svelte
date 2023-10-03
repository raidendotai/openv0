<script>
import * as Avatar from '$lib/components/ui/avatar';
</script>
   <article class="flex flex-col bg-white dark:bg-black rounded-xl shadow-md overflow-hidden m-4 sm:m-10 md:m-16">
     <div class="flex justify-center items-center w-full h-64 relative overflow-hidden">
       <Avatar.Root class="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden object-cover">
         <Avatar.Image src="https://indie-mag.com/wp-content/uploads/2018/09/010_081_v2_RGB.jpg" alt="Jorja Smith" />
         <Avatar.Fallback>JS</Avatar.Fallback>
       </Avatar.Root>
     </div>
     <div class="px-6 py-4 space-y-2">
       <div class="font-bold text-xl mb-2 dark:text-white">Jorja Smith</div>
       <p class="text-gray-700 text-base dark:text-gray-300">
         Jorja Smith is a British singer/songwriter whose soulful, jazz-tinged cadence, heartfelt lyrics, and retro sound 
         have invoked comparisons to the likes of Lauryn Hill, Amy Winehouse, Sade, and Alicia Keys.
       </p>
     </div>
   </article>