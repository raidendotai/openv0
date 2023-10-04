<script>
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';
import { PencilLine } from 'lucide-svelte';
let username = 'Username';
let apiKey = 'Your API Key Here';
</script>
   <article class="mx-auto p-6 space-y-6 bg-white dark:bg-black shadow rounded-lg max-w-md">
       <section class="flex items-center space-x-3">
       	<h2 class="text-xl font-semibold">Update Username</h2>
       	<PencilLine className="h-5 w-5" />
       </section>
       <section class="flex items-center space-x-3">
       	<Input bind:value={username} class="w-full" />
       	<Button variant="outline">
       		Save
       	</Button>
       </section>
       <section>
       	<h2 class="text-xl font-semibold">API Key</h2>
       	<p class="py-3 px-6 bg-gray-300 dark:bg-gray-700 rounded-lg">{apiKey}</p>
       </section>
   </article>