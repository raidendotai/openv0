import consola from "consola";
import { colors } from "consola/utils";
import { fileURLToPath } from "node:url";
import { update } from "rc9";

import "dotenv/config";

if (!process.env.OPENAI_API_KEY) {
  consola.info("`OPENAI_API_KEY` is not set!");

  const key = await consola.prompt(
    `Enter your OpenAI API key: (you can fetch one from ${colors.cyan(
      "https://platform.openai.com/account/api-keys",
    )}`,
    {
      type: "text",
    },
  );

  if (!key) {
    consola.error("No key provided, exiting...");
    process.exit(1);
  }

  const dotEnvPath = fileURLToPath(new URL("./.env", import.meta.url));
  consola.info(`Writing key to \`${dotEnvPath}\``);
  await update(
    {
      OPENAI_API_KEY: key,
      OPENAI_MODEL: "gpt-4",
      CONTEXT_TOKENS_PER_LIBRARY_COMPONENT_LIMIT: 950,
      REACT_WEBAPP_DIR: "../ui",
      REACT_WEBAP_COMPONENT_PING_INTERVAL_MS: 5000,
    },
    {
      name: dotEnvPath,
    },
  );
}
