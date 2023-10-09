<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let component_stream = false
  let userInput_description = ''
  let processing = false

  let userApiKey = ''
  let sharedComponent = false

  const libRelativePath = `../../../lib/openv0_generated`
  const name = $page.params.name;

  let component_versions = [];
  let currentComponentIndex = null
  let mode = 'view'
  let LoadedComponents;

  async function shareComponent() {
    if (processing) return;
    if (!userApiKey) return;
    processing = true

    const response = await fetch(
      `http://localhost:3000/components/share` ,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          key: userApiKey,
          name,
          framework : `svelte`,
          components: `flowbite`,
          icons: `lucide`,
          data: {
            versions: component_versions,
          },
        }),
      },
    );
    const responseData = await response.json()
    console.log(responseData)
    if (responseData.status) {
      sharedComponent = true
    } else {
      alert(JSON.stringify(responseData))
    }
    processing = false
  }

  async function iterate_component() {
    if (processing) return;
    if (!userInput_description) return;
    processing = true
    component_stream = ''

    let received_stream = ''
    const response = await fetch(
      `http://localhost:3000/components/iterate/description` ,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          framework : `svelte`,
          components: `flowbite`,
          icons: `lucide`,
          description: userInput_description,
          component : {
            name,
            description: component_versions[currentComponentIndex].description,
            code: component_versions[currentComponentIndex].code,
          }
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    currentComponentIndex = -1
    const reader = response.body.getReader();
    const textDecoder = new TextDecoder(); // Create a TextDecoder instance
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const text = textDecoder.decode(value); // Decode the received data as text
      received_stream += text; // Append received text to the container
      component_stream = received_stream.split('\n').slice(-15).join('\n')
    }

    component_stream = false
    processing = false
    currentComponentIndex = 0
    fetchComponents()
  }


  async function fetchComponents(){
    component_versions = [...[]]
    currentComponentIndex = null
    LoadedComponents = false
    const response = await fetch(
      `http://localhost:3000/components/get?framework=svelte&components=flowbite&icons=lucide&name=${name}`
    );
    const data = await response.json();
    component_versions = data.items
    // const metadata = (await import(`${libRelativePath}/${componentId}/metadata.json`)).default;
    // console.log({metadata})
    // LoadedComponent = (await import(`${libRelativePath}/${componentId}/${metadata.versions[0]}.svelte`)).default;
    LoadedComponents = await Promise.all(
      component_versions.map( async (entry) => {
        return (await import(`${libRelativePath}/${entry.name}/${entry.name}_${entry.version}.svelte`)).default;
      })
    )
    currentComponentIndex = component_versions.length ? 0 : null
  }

  onMount(async () => {
    fetchComponents()
  });
</script>

<div class="min-h-screen min-h-screen overflow-y-auto antialiased">
	<div class="dark:bg-[#050505]">

  <div class={!processing ? "" : 'opacity-20'}>
	<div class="fixed bottom-0 left-0 w-screen max-w-screen
		px-6 md:px-32 xl:px-72 py-8
		grid sm:flex items-center space-x-2 xl:space-x-4 space-y-1"
		style="z-index:99;">

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
				<input class="w-full p-2 text-base md:text-xl bg-transparent outline-none border-none ring-none"
					placeholder="describe component changes"
          bind:value={userInput_description}
				/>
			</div>
			<div class="sm:mx-4 duration-200">
				<div on:click={()=>{ iterate_component() }}
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
		py-3 pt-0
		pl-6 xl:pl-32 pr-2 xl:pr-2
		min-h-screen
		dark:bg-[#050505] dark:text-[#fff]">
		<div class="mb-52 mt-2 pt-2 grid md:grid-cols-12">
			<div class="md:col-span-9 lg:col-span-10 mb-2 pb-2 sm:flex sm:items-center ">
				<h1 class="">
		      <a href="/" class="opacity-50 hover:opacity-100 duration-200">← back</a>
					<span class="sm:hidden"><br/></span>
					<span class="ml-4 font-bold text-lg">{name}</span>
		    </h1>
				<div class="text-xs ml-4 flex">
					<a on:click={()=>{mode = 'view'}}
            class="cursor-pointer p-1 px-2 bg-[#ddd] dark:bg-[#222] rounded opacity-50 hover:opacity-100 duration-200">
						<img class="opacity-50 hover:opacity-100 dark:invert w-6 h-6" src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTEuOTk4IDVjLTQuMDc4IDAtNy43NDIgMy4wOTMtOS44NTMgNi40ODMtLjA5Ni4xNTktLjE0NS4zMzgtLjE0NS41MTdzLjA0OC4zNTguMTQ0LjUxN2MyLjExMiAzLjM5IDUuNzc2IDYuNDgzIDkuODU0IDYuNDgzIDQuMTQzIDAgNy43OTYtMy4wOSA5Ljg2NC02LjQ5My4wOTItLjE1Ni4xMzgtLjMzMi4xMzgtLjUwN3MtLjA0Ni0uMzUxLS4xMzgtLjUwN2MtMi4wNjgtMy40MDMtNS43MjEtNi40OTMtOS44NjQtNi40OTN6bTguNDEzIDdjLTEuODM3IDIuODc4LTQuODk3IDUuNS04LjQxMyA1LjUtMy40NjUgMC02LjUzMi0yLjYzMi04LjQwNC01LjUgMS44NzEtMi44NjggNC45MzktNS41IDguNDA0LTUuNSAzLjUxOCAwIDYuNTc5IDIuNjI0IDguNDEzIDUuNXptLTguNDExLTRjMi4yMDggMCA0IDEuNzkyIDQgNHMtMS43OTIgNC00IDQtNC0xLjc5Mi00LTQgMS43OTItNCA0LTR6bTAgMS41Yy0xLjM4IDAtMi41IDEuMTItMi41IDIuNXMxLjEyIDIuNSAyLjUgMi41IDIuNS0xLjEyIDIuNS0yLjUtMS4xMi0yLjUtMi41LTIuNXoiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==" />
					</a>

					<a on:click={()=>{mode = 'code'}}
            class="cursor-pointer p-1 px-2 ml-2 bg-[#ddd] dark:bg-[#222] rounded opacity-50 hover:opacity-100 duration-200">
						<img class="opacity-50 hover:opacity-100 dark:invert w-6 h-6" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTAuOTM1djIuMTMxbC04IDMuOTQ3di0yLjIzbDUuNjQtMi43ODMtNS42NC0yLjc5di0yLjIyM2w4IDMuOTQ4em0tMTYgMy44NDhsLTUuNjQtMi43ODMgNS42NC0yLjc5di0yLjIyM2wtOCAzLjk0OHYyLjEzMWw4IDMuOTQ3di0yLjIzem03LjA0Ny0xMC43ODNoLTIuMDc4bC00LjAxMSAxNmgyLjA3M2w0LjAxNi0xNnoiLz48L3N2Zz4=" />
					</a>

          <a on:click={()=>{mode = 'share'}}
            class="cursor-pointer p-1 px-2 ml-2 bg-[#ddd] dark:bg-[#222] rounded opacity-50 hover:opacity-100 duration-200">
            <img class="opacity-50 hover:opacity-100 dark:invert w-6 h-6 p-1" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNSA3YzIuNzYxIDAgNSAyLjIzOSA1IDVzLTIuMjM5IDUtNSA1LTUtMi4yMzktNS01IDIuMjM5LTUgNS01em0xMS4xMjIgMTIuMDY1Yy0uMDczLjMwMS0uMTIyLjYxMS0uMTIyLjkzNSAwIDIuMjA5IDEuNzkxIDQgNCA0czQtMS43OTEgNC00LTEuNzkxLTQtNC00Yy0xLjE2NSAwLTIuMjA0LjUwNi0yLjkzNSAxLjMwMWwtNS40ODgtMi45MjdjLS4yMy42MzYtLjU0OSAxLjIyOS0uOTQzIDEuNzY0bDUuNDg4IDIuOTI3em03Ljg3OC0xNS4wNjVjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDRjMCAuMzI0LjA0OS42MzQuMTIyLjkzNWwtNS40ODggMi45MjdjLjM5NS41MzUuNzEzIDEuMTI3Ljk0MyAxLjc2NGw1LjQ4OC0yLjkyN2MuNzMxLjc5NSAxLjc3IDEuMzAxIDIuOTM1IDEuMzAxIDIuMjA5IDAgNC0xLjc5MSA0LTR6Ii8+PC9zdmc+" />
					</a>

				</div>
			</div>
			<div class="md:col-span-9 lg:col-span-10">
	      <div class="p-2 rounded bg-white dark:bg-[#111] overflow-auto">
	        <div class="p-2">

            {#if LoadedComponents && (currentComponentIndex != null) && currentComponentIndex >=0 && LoadedComponents[currentComponentIndex]}
              {#if mode === `view`}
                  <svelte:component this={LoadedComponents[currentComponentIndex]} >
                  </svelte:component>
              {:else if mode === `code`}
                <div class="text-xs font-mono whitespace-pre-wrap break-words max-h-96 overflow-auto">
                  {#if currentComponentIndex>=0}
                    {component_versions[currentComponentIndex].code}
                  {/if}
                </div>
              {:else if mode === `share`}
                <div class="break-words max-h-96 overflow-auto">
                  {#if currentComponentIndex>=0}
                    <div class="border-b dark:border-[#222] pb-4">
                     Share this component on
                     <a class="font-medium text-purple-500 hover:text-purple-700 duration-200 dark:text-purple-400 dark:hover:text-purple-500" href="https://openv0.com" target="_blank">openv0.com</a>
                    </div>

                    {#if !sharedComponent}
                      <div class="pt-4">
                        Your openv0 API key
                        - <span class="text-sm">get your key from <a class="font-medium text-purple-500 hover:text-purple-700 duration-200 dark:text-purple-400 dark:hover:text-purple-500" href="https://openv0.com" target="_blank">openv0.com</a></span>
                        <br/>
                        <span class="text-sm">note : if you previously shared this component, it will be overridden</span>
                      </div>

                      <div class="pt-4 md:flex md:items-center md:space-x-2 ">
                        <input class="md:w-1/2 xl:1/3
                                      outline-none border-none bg-transparent focus:ring-0 p-4 bg-purple-50 dark:bg-black"
                                bind:value={userApiKey} placeholder="0v-01234567891489e8419ce357b2e0123" />
                        {#if !processing}
                          <button on:click={()=>{shareComponent()}} type="button" class="text-white duration-200
                          bg-[#252525] hover:bg-black
                          dark:bg-[#050708] dark:hover:bg-[#333]
                          outline-none ring-0
                          rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mt-2 md:mt-0 md:mr-2">
                            Share →
                          </button>
                        {:else}
                          <button disabled type="button" class="text-white opacity-50
                          bg-[#252525]
                          dark:bg-[#050708]
                          outline-none ring-0
                           rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mt-2 md:mt-0 md:mr-2">
                            processing
                          </button>
                        {/if}
                      </div>
                    {:else}
                      <div class="pt-4">
                        Thank you for sharing :)
                      </div>
                    {/if}

                  {/if}
                </div>
              {/if}
            {:else if (component_stream) && currentComponentIndex == -1}
              <div class="text-xs font-mono whitespace-pre-wrap break-words max-h-96 overflow-auto">
                {component_stream}
              </div>
            {/if}


	        </div>
	      </div>
	    </div>
			<div class="md:col-span-3 lg:col-span-2 md:ml-2 mt-2 md:mt-0 max-h-screen overflow-auto">
	      <div class="p-2 rounded bg-[#ccc] bg-opacity-10 grid grid-cols-2 md:grid-cols-1">
          {#if component_stream}
            <a on:click={()=>{ currentComponentIndex = -1 }}
              class="cursor-pointer m-1 p-2 hover:mx-2 duration-200 bg-white dark:bg-[#070707] dark:text-[#ccc] text-xs break-words">
              new iteration
              <br/>
              <span class="text-xs opacity-50">in process</span>
            </a>
          {/if}
	        {#each component_versions as c,i}
	          <a on:click={()=>{ currentComponentIndex = i }}
              class="cursor-pointer m-1 p-2 hover:mx-2 duration-200 bg-white dark:bg-[#070707] dark:text-[#ccc] text-xs break-words">
              {#if currentComponentIndex == i}
	             {c.description}
              {:else}
                {c.description.length > 23 ? `${c.description.slice(0,20)} ...` : c.description}
              {/if}
	            <br/>
              {#if LoadedComponents && i != null && i >= 0 && LoadedComponents[i]}
                <div style={{zoom: '15%', pointerEvents: 'none'}}>
                  <svelte:component this={LoadedComponents[i]} >
                  </svelte:component>
                </div>
              {/if}
	            <span class="text-xs opacity-50">{c.version}</span>
	          </a>
	        {/each}
	      </div>
	    </div>
		</div>
	</div>
	</div>
</div>
