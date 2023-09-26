<script>
import "../app.css";
import { sveltify } from "svelte-preprocess-react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import { renderToString } from "react-dom/server";
const reactToSvelte = (components) => {
	return components.map((component)=>{return sveltify(component,createPortal,ReactDOM,renderToString);})
}

// instead of wrapping individual component, wrap the whole generated react component
// to be determined

import { Button as _Button, Card as _Card } from '@nextui-org/react';
const [ Button, Card ] = reactToSvelte([_Button,_Card])

</script>

<div class="dark">
	<Button>My button</Button>
</div>
<slot />
