<script>
	import "../app.postcss";
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let dark = false
	let generate_mode = 'description'
	let component_stream = false

	let userInput_description = ''
	let userInput_json = ''
	let processing = false

	const libRelativePath = `../lib/openv0_generated`
	let LoadedComponents;
	let openv0_components_list = [];

	async function fetchComponents(){
		openv0_components_list = [...[]]
    LoadedComponents = false
		const response = await fetch(
			`http://localhost:3000/components/list?framework=svelte&components=shadcn&icons=lucide`
		);
		const data = await response.json();
		openv0_components_list = data.items
		console.log(openv0_components_list)
		LoadedComponents = [...Array(openv0_components_list.length).keys()].map(e=>false)
		LoadedComponents = await Promise.all(
			openv0_components_list.map( async(component,idx) => {
				try {
					return (await import(`${libRelativePath}/${component.name}/${component.name}_${component.latest}.svelte`)).default;
				} catch(e) {
					return 'fail'
				}
			})
		)
	}


	async function new_component() {
		if (processing) return;
		if (generate_mode === 'description' && !userInput_description) return;
		if (generate_mode === 'json' && !userInput_json) return;
		processing = true
		component_stream = ''
		let received_stream = ''
		console.dir({
			framework : `svelte`,
			components: `shadcn`,
			icons: `lucide`,
			description: generate_mode === `description` ? userInput_description : userInput_json,
		})
		const response = await fetch(
			`http://localhost:3000/components/new/${generate_mode}` ,
			{
				method: "POST",
				headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
				body : JSON.stringify({
					framework : `svelte`,
					components: `shadcn`,
					icons: `lucide`,
					description: generate_mode === `description` ? userInput_description : false,
					json: generate_mode === `json` ? userInput_json : false,
				}),
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const reader = response.body.getReader();
		const textDecoder = new TextDecoder(); // Create a TextDecoder instance
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			const text = textDecoder.decode(value); // Decode the received data as text
			received_stream += text; // Append received text to the container
			component_stream = received_stream.split('\n').slice(-5).join('\n')
		}

		component_stream = false
		processing = false

		fetchComponents()
	}




	onMount(async () => {
		fetchComponents()
	});
</script>

<svelte:head>
    <title>openv0 | by Raiden AI</title>
</svelte:head>

<div class={dark ? "dark" : ""}>
<div class="bg-[#f5f5f5] dark:bg-[#050505]">

<div class="max-w-8xl mx-auto
	text-base
	py-3 px-12 xl:px-4
	flex justify-between items-center
	dark:bg-[#050505] dark:text-white
	">
	<div class="text-right flex justify-end items-center space-x-2 dark:invert w-full">
		<a class="duration-200
			opacity-30 hover:opacity-100 duration-200
			p-1 text-center text-xs rounded rounded-full w-6 h-6 font-mono
			bg-black text-white"
			href="https://openv0.com" target="_blank">
		0v
		</a>
		<a class="opacity-30 hover:opacity-100 duration-200" href="https://github.com/raidendotai/openv0" target="_blank">
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
				<path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
			</svg>
		</a>
		<a class="opacity-30 hover:opacity-100 duration-200" href="https://twitter.com/n_raidenai" target="_blank">
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 25 25">
				<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
			</svg>
		</a>
		<a on:click={()=>{ dark = !dark }} class="cursor-pointer opacity-30 hover:opacity-100 duration-200" >
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 25 25">
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
			</svg>
		</a>
	</div>
</div>

{#if $page.route.id != '/'}
<slot></slot>
{:else}

<div class="min-h-screen min-h-screen overflow-y-auto antialiased">

	<div class={!processing ? "" : 'opacity-20'}>
	<div class="fixed bottom-0 left-0 w-screen max-w-screen
		px-6 md:px-32 xl:px-72 py-8
		grid sm:flex items-center space-x-2 xl:space-x-4 space-y-1"
		style="z-index:99;">


		{#if generate_mode === 'json'}
		<a on:click={()=>{ generate_mode = 'description' }} id="mode_json" class="cursor-pointer hidden sm:block md:-ml-10">
			<div class="rounded rounded-full shadow shadow-md dark:shadow-[#111]
				text-center p-4 text-center
				bg-[#ddd] hover:bg-white
				dark:bg-[#151515] dark:hover:bg-[#212121]
				duration-200 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3a3a3a" viewBox="0 0 24 24">
					<path d="M23 10.826v2.349c-1.562 0-3 1.312-3 2.857 0 2.181 1.281 5.968-6 5.968v-2.002c4.917 0 3.966-1.6 3.966-3.967 0-2.094 1.211-3.5 2.278-4.031-1.067-.531-2.278-1.438-2.278-3.312 0-2.372.94-4.692-3.966-4.686v-2.002c7.285 0 6 4.506 6 6.688 0 1.544 1.438 2.138 3 2.138zm-19-2.138c0-2.182-1.285-6.688 6-6.688v2.002c-4.906-.007-3.966 2.313-3.966 4.686 0 1.875-1.211 2.781-2.278 3.312 1.067.531 2.278 1.938 2.278 4.031 0 2.367-.951 3.967 3.966 3.967v2.002c-7.281 0-6-3.787-6-5.969 0-1.545-1.438-2.857-3-2.857v-2.349c1.562.001 3-.593 3-2.137z"/>
				</svg>
			</div>
		</a>
		{:else if generate_mode === 'description'}
			<a on:click={()=>{ generate_mode = 'json' }} id="mode_description" class="hidden cursor-pointer sm:block md:-ml-10">
				<div class="rounded rounded-full shadow shadow-md dark:shadow-[#111]
				text-center p-4 text-center
				bg-[#ddd] hover:bg-white
				dark:bg-[#151515] dark:hover:bg-[#212121]
				duration-200 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3a3a3a" viewBox="0 0 24 24">
					<path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm-3.5 10c0 .829-.671 1.5-1.5 1.5-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5zm5 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5z"/>
				</svg>
				</div>
			</a>
		{/if}

		<div class="sm:hidden flex flex-grow items-center pb-1 space-x-1">
			<a on:click={()=>{ generate_mode = 'description' }} class="cursor-pointer shadow shadow-md
				text-base text-center p-2
				rounded rounded-lg
				bg-[#f0f0f0] hover:bg-white
				dark:bg-[#151515] dark:hover:bg-[#111] dark:text-[#bbb]
				duration-200 cursor-pointer w-full">
				description
			</a>
			<a on:click={()=>{ generate_mode = 'json' }} class="cursor-pointer shadow shadow-md
				text-base text-center p-2
				rounded rounded-lg
				bg-[#f0f0f0] hover:bg-white
				dark:bg-[#151515] dark:hover:bg-[#111] dark:text-[#bbb]
				duration-200 cursor-pointer w-full">
				json
			</a>
		</div>
		<div class="sm:w-full
			rounded rounded-xl p-2
			flex items-center
			text-xl
			duration-200
			shadow shadow-lg
			dark:shadow-[#090909]
			bg-[#ddd] dark:bg-[#222]
			dark:text-white"
			>
			<div class="sm:mx-4 w-full max-h-32 overflow-auto">
				{#if generate_mode === 'description'}
					<input class="w-full p-2 text-base md:text-xl bg-transparent outline-none border-none ring-none"
					placeholder="describe your component"
					bind:value={userInput_description}
					/>

				{:else if generate_mode === 'json'}
					<textarea class="w-full p-2 text-sm md:text-xs resize-none font-light font-mono
					                bg-transparent outline-none border-none ring-none"
					          rows="4"
										placeholder='paste your json object here'
										bind:value={userInput_json}
					/>
				{/if}
			</div>
			<div class="sm:mx-4 duration-200" >
				<div on:click={()=>{ new_component() }}
					class="rounded rounded-full shadow shadow-md shadow-[#e0e0e]
					p-4 text-lg
					bg-[#ccc] hover:bg-[#111]
					duration-200 cursor-pointer dark:invert">
					<svg height="30" width="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#777">
						<g id="SVGRepo_bgCarrier" stroke-width="0"/>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
						<g id="SVGRepo_iconCarrier">
							<path style="fill:#777;" d="M333.411,188.132c-6.534-6.534-17.132-6.534-23.666,0L14.443,483.433 c-6.535,6.535-6.535,17.131,0,23.666c3.268,3.268,7.551,4.902,11.834,4.901c4.283,0,8.566-1.634,11.832-4.901l295.302-295.301 C339.947,205.263,339.946,194.666,333.411,188.132z"/>
							<path style="fill:#777;" d="M333.411,188.132c-0.297-0.297-0.611-0.566-0.925-0.836L13.607,506.175 c0.27,0.312,0.539,0.627,0.836,0.924c3.268,3.268,7.551,4.902,11.834,4.901c4.283,0,8.566-1.634,11.832-4.901l295.302-295.301 C339.947,205.263,339.946,194.666,333.411,188.132z"/>
							<path style="fill:#777;" d="M454.32,219.728l-38.766-51.947l20.816-61.386c2.046-6.032,0.489-12.704-4.015-17.208 c-4.504-4.504-11.175-6.061-17.208-4.015l-61.385,20.816l-51.95-38.766c-5.103-3.809-11.929-4.392-17.605-1.499 c-5.676,2.893-9.217,8.756-9.136,15.125l0.829,64.815l-52.924,37.426c-5.201,3.678-7.863,9.989-6.867,16.282 c0.996,6.291,5.479,11.471,11.561,13.363l61.898,19.241l19.24,61.897c1.891,6.082,7.071,10.565,13.363,11.561 c0.876,0.138,1.75,0.206,2.622,0.206c5.375,0,10.494-2.595,13.66-7.072l37.426-52.924l64.815,0.828 c6.322,0.051,12.233-3.462,15.125-9.136C458.713,231.661,458.13,224.833,454.32,219.728z"/>
							<polygon style="fill:#777;" points="160.014,42.848 173.373,67.274 197.799,80.633 173.373,93.991 160.014,118.417 146.656,93.991 122.23,80.633 146.656,67.274 "/>
							<g>
								<polygon style="fill:#777;" points="352.14,364.732 362.946,384.489 382.703,395.294 362.946,406.1 352.14,425.857 341.335,406.1 321.577,395.294 341.335,384.489 "/>
								<polygon style="fill:#777;" points="367.337,0 378.142,19.757 397.9,30.563 378.142,41.368 367.337,61.126 356.531,41.368 336.775,30.563 356.531,19.757 "/>
								<polygon style="fill:#777;" points="484.168,130.689 490.635,142.514 502.459,148.98 490.635,155.447 484.168,167.271 477.702,155.447 465.877,148.98 477.702,142.514 "/>
							</g>
							<g>
								<polygon style="fill:#777;" points="492.627,294.117 484.792,320.866 492.627,347.615 465.877,339.78 439.129,347.615 446.963,320.866 439.129,294.117 465.877,301.951 "/>
								<path style="fill:#777;" d="M455.82,237.334c2.892-5.675,2.311-12.501-1.499-17.606l-38.766-51.947l20.816-61.387 c2.046-6.032,0.49-12.704-4.014-17.208c-0.296-0.296-0.6-0.576-0.914-0.846L288.228,231.555l1.343,0.417l19.24,61.898 c1.891,6.082,7.071,10.565,13.363,11.561c0.876,0.138,1.75,0.206,2.622,0.206c5.375,0,10.494-2.595,13.66-7.072l37.426-52.924 l64.815,0.828C447.017,246.522,452.928,243.009,455.82,237.334z"/>
							</g>
						</g>
					</svg>
				</div>

			</div>
		</div>
	</div>
	</div>

	<div class="max-w-8xl mx-auto
		text-base
		py-3 pt-0 px-6 xl:px-32
		mb-52
		min-h-screen
		dark:bg-[#050505] dark:text-[#fff]">
		<div class="">
			{#if openv0_components_list.length || component_stream}
			<div class="p-2 rounded grid sm:grid-cols-2 xl:grid-cols-3 items-start">

				{#each openv0_components_list as component,idx}
				<a href={`/view/${component.name}`} class="m-1 hover:m-2 duration-200 cursor-pointer">
					<div class="p-2 rounded rounded-md">
						<h2 class="text-base font-medium opacity-50">{component.name}</h2>
						<h2 class="text-xs opacity-30 font-light">{component.versions} version(s)</h2>
						<div class="my-2 bg-white dark:bg-[#222] dark:text-white p-4 text-sm
												max-h-52 max-w-32 overflow-hidden">
							{#if LoadedComponents[idx] && LoadedComponents[idx] != 'fail'}
								<svelte:component this={LoadedComponents[idx]} >
								</svelte:component>
							{:else if LoadedComponents[idx] && LoadedComponents[idx] === 'fail'}
							  <p class="text-xs">could not import</p>
							{:else}
								<p class="text-xs">loading</p>
							{/if}
						</div>
					</div>
				</a>
				{/each}

				{#if component_stream}
				<div class="m-1 hover:m-2 duration-200 cursor-pointer opacity-70">
					<div class="p-2 rounded rounded-md">
						<h2 class="text-base font-medium opacity-50">New Component</h2>
						<h2 class="text-xs opacity-70 font-light">in process</h2>
						<div class="my-2 bg-white dark:bg-[#222] dark:text-white p-4 text-xs
												max-h-52 max-w-32 overflow-hidden whitespace-pre-wrap break-words font-mono">
							{component_stream}
						</div>
					</div>
				</div>
				{/if}

			</div>
			{:else}
				<div class="max-w-5xl py-52 mx-auto text-center text-7xl opacity-30 text-[#777] break-words font-bold">
					openv0
				</div>
			{/if}
		</div>
	</div>
</div>
{/if}
</div>
</div>
