import axios, { isAxiosError } from "npm:axios";
import { join } from "https://deno.land/std@0.202.0/path/join.ts";
import { ensureDir } from "https://deno.land/std@0.202.0/fs/ensure_dir.ts";

interface IComponent {
  name: string;
  code: string;
  componentId: string;
  slug: string;
  prompt: string;
  timestamp: Date;
  version: string;
}

interface IComponentResponse extends IComponent {
  iterations: IComponent[];
}

export const getComponentCommand = async ([id, version]: [string, string?]) => {
  const currentServer = localStorage.getItem("openv0_server");
  if (!currentServer) {
    console.log("Please provide a server using openv0 set [server]");
    return;
  }
  const url = `${currentServer}/api/components/${id}`;
  try {
    const { data } = await axios.get<IComponentResponse>(url);
    const path = join(Deno.cwd(), "components");
    if (version) {
      const component = data.iterations.find(
        (comp) => comp.version === version
      );
      if (!component) {
        console.log("Component version not found");
        return;
      }
      ensureDir(path);
      Deno.writeTextFile(`${path}/${component?.name}.tsx`, component.code);
    } else {
      ensureDir(path);
      Deno.writeTextFile(
        `${path}/${data.iterations[0].name}.tsx`,
        data.iterations[0].code
      );
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.message);
      return;
    }
    console.log("Something went wrong");
  }
};
