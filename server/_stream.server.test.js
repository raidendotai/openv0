const express = require("express");
const { PassThrough } = require("stream");
const cors = require("cors"); // Import the CORS middleware
const app = express();
app.use(cors());

const port = 3000;

const sub = require("./_stream.server.sub.test.js");

app.get("/streaming-text", async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  const duplexStream = new PassThrough(); // Create a duplex stream

  // Function to simulate text generation
  async function generateText() {
    for (let i = 0; i < 10; i++) {
      const chunk = `Chunk ${i}\n`;
      duplexStream.write(chunk);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate work with a sleep
    }
  }

  // Pass the req object to submodules
  sub.addComments(duplexStream);

  // Pipe the duplex stream to the response object
  duplexStream.pipe(res);

  // Start generating text
  await generateText();

  duplexStream.write("------- the end --------");
  duplexStream.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
