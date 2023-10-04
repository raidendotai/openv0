<script>
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';
import * as Tooltip from '$lib/components/ui/tooltip';
import { PencilLine } from 'lucide-svelte';
let username = 'Username';
	let apiKey = 'Your API Key Here';
</script>
   <article class="p-4 space-y-4 bg-white dark:bg-black shadow rounded-lg">
   	<section class="flex items-center space-x-2">
   		<h2 class="text-xl font-semibold">Update Username</h2>
   		<PencilLine className="h-4 w-4" />
   	</section>
   	<section class="flex items-center space-x-2">
   		<Input bind:value={username} class="w-full" />
   		<Button variant="outline">
   			Save
   		</Button>
   	</section>
   	<section>
   		<h2 class="text-xl font-semibold">API Key</h2>
   		<div class="flex items-center">
   			<p class="mr-2 py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-lg">{apiKey}</p>
   			<Tooltip.Root>
   				<Tooltip.Trigger>
   					<svg
   						class="h-4 w-4 cursor-pointer"
   						fill="none"
   						stroke="currentColor"
   						viewBox="0 0 24 24"
   					>
   						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12a2 2 0 114 0 2 2 0 01-4 0z"></path>
   						<path fill-opacity=".5" d="M12 14a2 2 0 00-2-2v2a2 2 0 002-2zm-6 0c-.7514 0-1.5.01-2.252.03.91209.19173 1.7248.47767 2.4012.86867C6.53283 12.70825 7.76027 12 9 12a4 4 0 100-8 4 4 0 00-6.8391 1.59626 14.0137 14.0137 0 00-4.0693 9.85342A18.2804 18.2804 0 0012 22a18.2804 18.2804 0 0011.9083-4.55032l.0422-.03734c-.8528-.91223-1.9317-1.65055-3.1684-2.186A6 6 0 016 14z"></path>
   					</svg>
   				</Tooltip.Trigger>
   				<Tooltip.Content>
   					<p>This is your sensitive API key. Keep it safe!</p>
   				</Tooltip.Content>
   			</Tooltip.Root>
   		</div>
   	</section>
   </article>