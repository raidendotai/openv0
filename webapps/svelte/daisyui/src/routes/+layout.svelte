<script>
  import "../app.postcss";
  import { Skull } from 'lucide-svelte';

</script>

<div class="bg-[#151515]" data-theme="black">
<div class="max-w-5xl mx-auto h-screen">
	<button class="btn">
		Henlo skelly <Skull class="ml-2 h-4 w-4"/>
	</button>
	<details class="dropdown mb-32">
	  <summary class="m-1 btn">open or close</summary>
	  <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
		<li><a>Item 1</a></li>
		<li><a>Item 2</a></li>
	  </ul>
	</details>
</div>
</div>

<slot />
