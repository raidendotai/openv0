const express = require('express');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const generate = require(`./generate.js`)
const export_react = require(`./modules/export/react.js`)

const EXPORT_PING_INTERVAL = parseInt(process.env.REACT_WEBAP_COMPONENT_PING_INTERVAL_MS)
let EXPORT_PING_STATUS = true

async function export_validity_check(query){
	if ( !EXPORT_PING_STATUS ) {
		console.dir({
			export_check_failed: {
				component: query,
				message: `did not received ping back from webapp after component export;\ngenerated component likely has issues (ie. syntax; nonexistent imports: ...)\nadding component to ./generated/export_ignore.txt and refreshing webapp exports`
			}
		})
		fs.appendFileSync(`./generated/export_ignore.txt`, `\n${query.componentId} ${query.version}`);
		await export_react.dump_webapp()
	}

}

async function exported_new_component(query){
	console.dir({
		export: {
			component: query,
			message: `exported new component to webapp; waiting for ping back in ${EXPORT_PING_INTERVAL/1e3} secs or will remove\n(in case generated component has issues)`
		}
	})
	EXPORT_PING_STATUS = false
	await new Promise(r => setTimeout(r, EXPORT_PING_INTERVAL));
	export_validity_check(query)
}

app.post(`/component/new`, async (req, res) => {
	try{
		const response = await generate.new_component({
	    query: req.body.query,
	  })
		exported_new_component({
			componentId: response.componentId,
			version: response.version,
		})
		res.json(response);
	} catch(e) {
		console.log(e)
	}
});

app.post(`/component/iterate`, async (req, res) => {
	try{
		const response = await generate.iterate_component({
			componentId: req.body.componentId,
	    query: req.body.query,
	  })
		exported_new_component({
			componentId: response.componentId,
			version: response.version,
		})
		res.json(response);
	} catch(e) {
		console.log(e)
	}
});

// is used after generating and exporting a new component/iteration
// if ping not received within time interval, component is likely invalid (ie. hallucinated imports)
// and component is added to generated/export_ignore.txt, then webapp exports are refreshed
app.get(`/component/ping`, async (req, res) => {
	/*
		exported_new_component({
			componentId: req.query.componentId,
			version: req.query.version,
		})
		*/
		console.dir({
			ping: `received ping from webapp; components loaded successfully :)`,
			...req.query,
		})
		EXPORT_PING_STATUS = true
		res.json({status:true})
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port} --------------------\n`);
	export_react.dump_webapp()
});
