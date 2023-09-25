import {
  Command,
  HelpCommand,
  CompletionsCommand,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import meta from "./meta.ts";
import { downloadCommand } from "./commands/global.ts";
import { setOpenv0ServerCommand } from "./commands/setServer.ts";
import { getComponentCommand } from "./commands/getComponent.ts";

await new Command()
  .name(meta.name)
  .version(meta.version)
  .description(`${meta.description}`)
  .default("help")
  .command("help", new HelpCommand().global())
  .command("completions", new CompletionsCommand())
  .command(
    "setup",
    new Command()
      .name("setup")
      .description("Set openv0 server")
      .alias("set")
      .alias("s")
      .usage("<server> OpenV0 server")
      .option("-f, --force", "Override existing server")
      .arguments("<server> [output:string]")
      .action((options, ...args) => {
        setOpenv0ServerCommand(options, args);
      })
  )
  .command(
    "install",
    new Command()
      .name("install")
      .alias("i")
      .description("Install openv0 server")
      .arguments("[destination] [output:string]")
      .action(async (_, args) => {
        await downloadCommand(args);
      })
  )
  .command(
    "add",
    new Command()
      .name("add")
      .description("Add a component to the components (or destination) folder")
.usage("(<id>, [version]) \nIf no version is provided, the latest version will be used")
      .example("Add a component","openv0 add my-component")
      .arguments(
        "<component_id...>"
      )
      .alias("a")
      .alias("get")
      .action(async (_, ...args) => {
        await getComponentCommand(args as [string, (string | undefined)?]);
      })
  )
  .parse(Deno.args);
