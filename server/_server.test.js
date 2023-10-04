const express = require("express");
const cors = require("cors");
const svelte = require("svelte/compiler");
const app = express();
const port = 3000;

app.use(cors());

// Compile and bundle the Svelte component
const componentCode = `
  ${
    svelte.compile(`
    <main>
      <h1 class="bg-pink-500">ayo</h1>
    </main>
  `).js.code
  }
`;

app.get("/get-svelte-component", (req, res) => {
  res.setHeader("Content-Type", "text/javascript");
  res.send(componentCode);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
