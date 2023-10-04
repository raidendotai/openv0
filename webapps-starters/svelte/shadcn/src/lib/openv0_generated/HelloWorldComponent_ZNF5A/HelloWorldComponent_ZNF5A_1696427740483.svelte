<script>
import { onMount } from 'svelte';
let message = "Hello World";
  onMount(async () => {
  });
</script>
   <div class="flex justify-center items-center h-screen dark:bg-black">
       <h1 class="text-5xl font-bold text-center dark:text-white">{message}</h1>
   </div>