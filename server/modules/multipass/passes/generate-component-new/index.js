const path = require("path");
const { OpenAI } = require("openai");
const tiktoken = require("@dqbd/tiktoken");
const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  console.log(
    "************** debug: multipass/generate-component-new *****************************",
  );
  console.dir(req, { depth: null });
  process.exit();

  return {
    type: `component`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
