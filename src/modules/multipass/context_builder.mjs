import "dotenv/config";
import tiktoken from "@dqbd/tiktoken";
import * as rag_icons from "./rag_icons.mjs";
import * as rag_library_components from "./rag_library_components.mjs";

const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");

async function run(query) {
  // -> gets component design {name,description,library_components,icons}
  // -> builds completion context for library components + icons

  let retrieved = {
    icons: !query.icons ? [] : await rag_icons.run({ icons: query.icons }),
    library_components: !query.library_components
      ? []
      : await rag_library_components.run({
          library_components: query.library_components.map((e) => e.name),
        }),
  };

  retrieved.library_components = retrieved.library_components.map((e, idx) => {
    const examples_total_tokens = tiktokenEncoder.encode(
      e.docs.examples
        .map(
          (example) => example.source + "```\n" + example.code.trim() + "\n```",
        )
        .join("\n\n"),
    ).length;

    console.log(
      `tokens for context entry ${e.name} : ${examples_total_tokens} (limit : ${process.env.CONTEXT_TOKENS_PER_LIBRARY_COMPONENT_LIMIT})`,
    );

    if (
      examples_total_tokens >
      parseInt(process.env.CONTEXT_TOKENS_PER_LIBRARY_COMPONENT_LIMIT)
    ) {
      let updated_library_component = { ...e };
      updated_library_component.docs.examples = [
        e.docs.examples[Math.floor(Math.random() * e.docs.examples.length)],
      ];
      return updated_library_component;
    }
    return e;
  });

  return [
    ...retrieved.library_components.map((e, idx) => {
      return {
        role: `user`,
        content:
          `Library components can be used while making the new React component\n\n` +
          `Suggested library component (${idx + 1}/${
            retrieved.library_components.length
          }) : ${e.name} - ${e.description}\n` +
          `Suggested usage : ${query.library_components[idx].usage}\n\n\n` +
          `# ${e.name} can be imported into the new component like this:\n` +
          "```tsx\n" +
          e.docs.import.code.trim() +
          "\n```\n\n---\n\n" +
          `# examples of how ${e.name} can be used inside the new component:\n` +
          e.docs.use
            .map((block) => {
              return "```tsx\n" + block.code.trim() + "\n```";
            })
            .join(`\n\n`) +
          "\n\n---\n\n" +
          `# full code examples of React components that use ${e.name} :\n` +
          e.docs.examples
            .map((example) => {
              return example.source + "```\n" + example.code.trim() + "\n```";
            })
            .join(`\n\n`),
      };
    }),

    ...[
      retrieved.icons.length
        ? {
            role: `user`,
            content:
              `Icon elements can optionally be used when making the React component.\n\n` +
              `---\n\n* example: importing icons in the component (only import the ones you need) :\n\n` +
              "```tsx\n" +
              `import { ${retrieved.icons
                .map((e) => e.retrieved.join(" , "))
                .join(" , ")} } from "lucide-react";` +
              "\n```\n\n" +
              `* example: using an icon inside the component :\n\n` +
              "```tsx\n" +
              `<${retrieved.icons[0].retrieved[0]} className="h-4 w-4" />` +
              "\n```\n\n" +
              "---\n\n\n" +
              `Here are some available icons that might be relevant to the component you are making. You can choose from them if relevant :\n\n` +
              "```\n" +
              retrieved.icons
                .map((e) => {
                  // return `- role : ${e.icon}\n  available icons: ${e.retrieved.join(' , ')}` // it confuses the gpt
                  return `- ${e.retrieved.join(" , ")}`;
                })
                .join("\n") +
              "\n```",
            //'icon stuff >' + JSON.stringify(retrieved.icons)
          }
        : false,
    ],
  ].filter((e) => e);
}
export { run };
