<script>
import { AspectRatio } from '$lib/components/ui/aspect-ratio';
import { Label } from '$lib/components/ui/label';
</script>
   <div class="grid grid-flow-row md:grid-flow-col md:grid-cols-2 gap-4 md:gap-10 mt-4 dark:bg-gray-700">
   	<div>
   		<Label class="text-lg md:text-2xl font-semibold dark:text-white mb-2">
   			Metal Gear Solid
   		</Label>
   		<p class="text-sm md:text-base dark:text-gray-300">
   			Metal Gear Solid is a stealth game developed by Konami and released for the PlayStation in 1998. The story follows Solid Snake, a soldier who infiltrates a nuclear weapons facility to neutralize the terrorist threat from FOXHOUND, a renegade special forces unit.
   		</p>
   	</div>
   	<div class="flex justify-center items-center h-full">
   		<AspectRatio ratio={4 / 3} class="w-full object-contain">
   			<img src="https://cdn.staticneo.com/w/metalgear/Arsenalgearbrief.jpg" alt="Metal Gear Solid Artwork" class="rounded-md" />
   		</AspectRatio>
   	</div>
   </div>