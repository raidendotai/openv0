import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Browse() {
	const navigateTo  = useNavigate();

	const [generateMode, setGenerateMode] = useState('description');
	const [componentStream, setComponentStream] = useState(false);
	const [userInputDescription, setUserInputDescription] = useState('');
	const [userInputJson, setUserInputJson] = useState('');
	const [processing, setProcessing] = useState(false);

	const libRelativePath = `../components/openv0_generated`
	const [loadedComponents, setLoadedComponents] = useState([]);
	const [openv0ComponentsList, setOpenv0ComponentsList] = useState([]);

	const svgStyle = { fill: '#777' };

	async function fetchComponents(){
		const response = await fetch(
			`http://localhost:3000/components/list?framework=react&components=nextui&icons=lucide`
		);
		const data = await response.json();
		console.log(data)
		setOpenv0ComponentsList( data.items )
		setLoadedComponents( [...Array(data.items.length).keys()].map(e=>false) )

		const imports = data.items.map(async (component) => {
			// Construct the import path for each child component
			const importPath = `${libRelativePath}/${component.name}/${component.name}_${component.latest}.tsx`;
			console.log(importPath)
			try {
				// Use dynamic import to load the component, and catch any errors
				let module
				try {
					module = await import(importPath);
				} catch(e) {
					return false
				}
				return {
					name: component.name,
					versions: component.versions,
					latest: component.latest,
					component: module.default,
				};
			} catch (error) {
				console.error(error);
				return false
			}
		});

		Promise.all(imports).then((components) => {
			setLoadedComponents(components.filter(e=>e));
		});

	}

	const newComponent = async () => {
		if (processing) return;
		if (generateMode === 'description' && !userInputDescription) return;
		if (generateMode === 'json' && !userInputJson) return;
		setProcessing(true)
		setComponentStream('')
		let received_stream = ''
		console.dir({
			framework : `react`,
			components: `nextui`,
			icons: `lucide`,
			description: generateMode === `description` ? userInputDescription : userInputJson,
		})
		const response = await fetch(
			`http://localhost:3000/components/new/${generateMode}` ,
			{
				method: "POST",
				headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
				body : JSON.stringify({
					framework : `react`,
					components: `nextui`,
					icons: `lucide`,
					description: generateMode === `description` ? userInputDescription : false,
					json: generateMode === `json` ? userInputJson : false,
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
			setComponentStream( received_stream.split('\n').slice(-5).join('\n') )
		}

		setComponentStream(false)
		setProcessing(false)

		fetchComponents()
	}

  useEffect(() => {
		fetchComponents()
  }, []);


	return (
		<>
			<div className="min-h-screen min-h-screen overflow-y-auto antialiased">
				<div className={!processing ? "" : 'opacity-20'}>
					<div className="fixed bottom-0 left-0 w-screen max-w-screen
				    px-6 md:px-32 xl:px-72 py-8
				    grid sm:flex items-center space-x-2 xl:space-x-4 space-y-1 z-50">

						<div>
				      {generateMode === 'json' ? (
				        <a href="#" onClick={() => setGenerateMode('description')} id="mode_json" className="hidden sm:block md:-ml-10">
				          <div className="rounded rounded-full shadow shadow-md dark:shadow-[#111]
				            text-center p-4 text-center
				            bg-[#ddd] hover:bg-white
				            dark:bg-[#151515] dark:hover:bg-[#212121]
				            duration-200 cursor-pointer">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3a3a3a" viewBox="0 0 24 24">
											<path d="M23 10.826v2.349c-1.562 0-3 1.312-3 2.857 0 2.181 1.281 5.968-6 5.968v-2.002c4.917 0 3.966-1.6 3.966-3.967 0-2.094 1.211-3.5 2.278-4.031-1.067-.531-2.278-1.438-2.278-3.312 0-2.372.94-4.692-3.966-4.686v-2.002c7.285 0 6 4.506 6 6.688 0 1.544 1.438 2.138 3 2.138zm-19-2.138c0-2.182-1.285-6.688 6-6.688v2.002c-4.906-.007-3.966 2.313-3.966 4.686 0 1.875-1.211 2.781-2.278 3.312 1.067.531 2.278 1.938 2.278 4.031 0 2.367-.951 3.967 3.966 3.967v2.002c-7.281 0-6-3.787-6-5.969 0-1.545-1.438-2.857-3-2.857v-2.349c1.562.001 3-.593 3-2.137z"/>
										</svg>
				          </div>
				        </a>
				      ) : (
				        <a href="#" onClick={() => setGenerateMode('json')} id="mode_description" className="hidden sm:block md:-ml-10">
				          <div className="rounded rounded-full shadow shadow-md dark:shadow-[#111]
				            text-center p-4 text-center
				            bg-[#ddd] hover:bg-white
				            dark:bg-[#151515] dark:hover:bg-[#212121]
				            duration-200 cursor-pointer">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3a3a3a" viewBox="0 0 24 24">
											<path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm-3.5 10c0 .829-.671 1.5-1.5 1.5-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5zm5 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5z"/>
										</svg>
				          </div>
				        </a>
				      )}
				    </div>

						<div className="sm:hidden flex flex-grow items-center pb-1 space-x-1">
				      <a
				        href="#"
				        onClick={() => setGenerateMode('description')}
				        className="shadow shadow-md
				          text-base text-center p-2
				          rounded rounded-lg
				          bg-[#f0f0f0] hover:bg-white
				          dark:bg-[#151515] dark:hover:bg-[#111] dark:text-[#bbb]
				          duration-200 cursor-pointer w-full"
				      >
				        description
				      </a>
				      <a
				        href="#"
				        onClick={() => setGenerateMode('json')}
				        className="shadow shadow-md
				          text-base text-center p-2
				          rounded rounded-lg
				          bg-[#f0f0f0] hover:bg-white
				          dark:bg-[#151515] dark:hover:bg-[#111] dark:text-[#bbb]
				          duration-200 cursor-pointer w-full"
				      >
				        json
				      </a>
				    </div>

						<div className="sm:w-full rounded rounded-xl p-2 flex items-center text-xl duration-200 shadow shadow-lg dark:shadow-[#090909] bg-[#ddd] dark:bg-[#222] dark:text-white">
				      <div className="sm:mx-4 w-full max-h-32 overflow-auto">
				        {generateMode === 'description' ? (
				          <input
				            className="w-full p-2 text-base md:text-xl bg-transparent outline-none border-none ring-none"
				            placeholder="describe your component"
				            value={userInputDescription}
				            onChange={(e) => setUserInputDescription(e.target.value)}
				          />
				        ) : (
				          <textarea
				            className="w-full p-2 text-sm md:text-xs resize-none font-light font-mono bg-transparent outline-none border-none ring-none"
				            rows="4"
				            placeholder="paste your json object here"
				            value={userInputJson}
				            onChange={(e) => setUserInputJson(e.target.value)}
				          />
				        )}
				      </div>
				    </div>

						<div className="sm:mx-4 duration-200">
				      <div
				        onClick={newComponent}
				        className="rounded rounded-full shadow shadow-md shadow-[#e0e0e] p-4 text-lg bg-[#ccc] hover:bg-[#111] duration-200 cursor-pointer dark:invert"
				      >
								<svg height="30" width="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#777">
									<g id="SVGRepo_bgCarrier" strokeWidth="0"/>
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
									<g id="SVGRepo_iconCarrier">
										<path style={svgStyle} d="M333.411,188.132c-6.534-6.534-17.132-6.534-23.666,0L14.443,483.433 c-6.535,6.535-6.535,17.131,0,23.666c3.268,3.268,7.551,4.902,11.834,4.901c4.283,0,8.566-1.634,11.832-4.901l295.302-295.301 C339.947,205.263,339.946,194.666,333.411,188.132z"/>
										<path style={svgStyle} d="M333.411,188.132c-0.297-0.297-0.611-0.566-0.925-0.836L13.607,506.175 c0.27,0.312,0.539,0.627,0.836,0.924c3.268,3.268,7.551,4.902,11.834,4.901c4.283,0,8.566-1.634,11.832-4.901l295.302-295.301 C339.947,205.263,339.946,194.666,333.411,188.132z"/>
										<path style={svgStyle} d="M454.32,219.728l-38.766-51.947l20.816-61.386c2.046-6.032,0.489-12.704-4.015-17.208 c-4.504-4.504-11.175-6.061-17.208-4.015l-61.385,20.816l-51.95-38.766c-5.103-3.809-11.929-4.392-17.605-1.499 c-5.676,2.893-9.217,8.756-9.136,15.125l0.829,64.815l-52.924,37.426c-5.201,3.678-7.863,9.989-6.867,16.282 c0.996,6.291,5.479,11.471,11.561,13.363l61.898,19.241l19.24,61.897c1.891,6.082,7.071,10.565,13.363,11.561 c0.876,0.138,1.75,0.206,2.622,0.206c5.375,0,10.494-2.595,13.66-7.072l37.426-52.924l64.815,0.828 c6.322,0.051,12.233-3.462,15.125-9.136C458.713,231.661,458.13,224.833,454.32,219.728z"/>
										<polygon style={svgStyle} points="160.014,42.848 173.373,67.274 197.799,80.633 173.373,93.991 160.014,118.417 146.656,93.991 122.23,80.633 146.656,67.274 "/>
										<g>
											<polygon style={svgStyle} points="352.14,364.732 362.946,384.489 382.703,395.294 362.946,406.1 352.14,425.857 341.335,406.1 321.577,395.294 341.335,384.489 "/>
											<polygon style={svgStyle} points="367.337,0 378.142,19.757 397.9,30.563 378.142,41.368 367.337,61.126 356.531,41.368 336.775,30.563 356.531,19.757 "/>
											<polygon style={svgStyle} points="484.168,130.689 490.635,142.514 502.459,148.98 490.635,155.447 484.168,167.271 477.702,155.447 465.877,148.98 477.702,142.514 "/>
										</g>
										<g>
											<polygon style={svgStyle} points="492.627,294.117 484.792,320.866 492.627,347.615 465.877,339.78 439.129,347.615 446.963,320.866 439.129,294.117 465.877,301.951 "/>
											<path style={svgStyle} d="M455.82,237.334c2.892-5.675,2.311-12.501-1.499-17.606l-38.766-51.947l20.816-61.387 c2.046-6.032,0.49-12.704-4.014-17.208c-0.296-0.296-0.6-0.576-0.914-0.846L288.228,231.555l1.343,0.417l19.24,61.898 c1.891,6.082,7.071,10.565,13.363,11.561c0.876,0.138,1.75,0.206,2.622,0.206c5.375,0,10.494-2.595,13.66-7.072l37.426-52.924 l64.815,0.828C447.017,246.522,452.928,243.009,455.82,237.334z"/>
										</g>
									</g>
								</svg>
				      </div>
				    </div>

					</div>
				</div>

				<div className="max-w-8xl mx-auto
				  text-base
				  py-3 pt-0 px-6 xl:px-32
				  mb-52
				  min-h-screen
				  dark:bg-[#050505] dark:text-[#fff]">

					{openv0ComponentsList.length || componentStream ? (
		        <div className="p-2 rounded grid sm:grid-cols-2 xl:grid-cols-3 items-start">

						{loadedComponents.map((component, index) => (

							<a href={`/view/${component.name}`} key={index} className="m-1 hover:m-2 duration-200 cursor-pointer">
					      <div className="p-2 rounded rounded-md">
					        <h2 className="text-base font-medium opacity-50">{component.name}</h2>
					        <h2 className="text-xs opacity-30 font-light">{component.versions} version(s)</h2>
					        <div className="my-2 bg-white dark:bg-[#222] dark:text-white p-4 text-sm max-h-52 max-w-32 overflow-hidden">
					          {component && component.component !== 'fail' ? (
					            <div style={{zoom: '30%'}}>
												<component.component  />
											</div>
					          ) : component.component === 'fail' ? (
					            <p className="text-xs">could not import</p>
					          ) : (
					            <p className="text-xs">loading</p>
					          )}
					        </div>
					      </div>
					    </a>

			      ))}

						{componentStream && (
				      <div className="m-1 hover:m-2 duration-200 cursor-pointer opacity-70">
				        <div className="p-2 rounded rounded-md">
				          <h2 className="text-base font-medium opacity-50">New Component</h2>
				          <h2 className="text-xs opacity-70 font-light">in process</h2>
				          <div className="my-2 bg-white dark:bg-[#222] dark:text-white p-4 text-xs max-h-52 max-w-32 overflow-hidden whitespace-pre-wrap break-words font-mono">
				            {componentStream}
				          </div>
				        </div>
				      </div>
				    )}


		        </div>
		      ) : (
		        <div className="max-w-5xl py-52 mx-auto text-center text-7xl opacity-30 text-[#777] break-words font-bold">
		          openv0
		        </div>
		      )}

				</div>
			</div>
		</>
  )
}
