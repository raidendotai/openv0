import axios from "npm:axios";
import { join, dirname } from "https://deno.land/std@0.202.0/path/mod.ts";
import * as zip from "https://deno.land/x/zipjs@v2.7.29/index.js";
import { ensureDir } from "https://deno.land/std@0.202.0/fs/mod.ts";
import { green, yellow } from "https://deno.land/std@0.196.0/fmt/colors.ts";

const unzip = async (bufferAsset: Uint8Array) => {
  const reader = new zip.ZipReader(new zip.Uint8ArrayReader(bufferAsset));
  const entries = await reader.getEntries();
  const entriesPromises = entries.map(async (entry) => {
    if (entry) {
      const data = await entry.getData?.(new zip.Uint8ArrayWriter());
      if (data) {
        if (entry.directory) {
          await Deno.mkdir(entry.filename, { recursive: true });
        } else {
          const _dirname = dirname(entry.filename);
          await ensureDir(_dirname);
          await Deno.writeFile(entry.filename, data);
        }
      }
    }
  });
  await Promise.all(entriesPromises);
  reader.close();
};

export const downloadCommand = async (dest? : string) => {
  console.log("Downloading...");
  const url =
    "https://github.com/raidendotai/openv0/archive/refs/heads/main.zip";
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const path = join(Deno.cwd(), "openv0.zip");
  await Deno.writeFile(path, data);
  console.log("Extracting...");
  const zip = await Deno.readFile(path);
  await unzip(zip);
  await Deno.remove(path);
  if (dest) {
    await Deno.rename("openv0-main", dest);
  }
  console.log(green("Done!"));
  console.log(yellow(`Make sure to install dependencies!`)); 
  console.log(green(`cd ${dest || "openv0-main"}/openv0_server && node index.js`));
  console.log(green(`cd ${dest || "openv0-main"}/openv0_vitereact && pnpm run dev`));
};
