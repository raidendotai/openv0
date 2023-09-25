# openv0 CLI

This module is a CLI designed for managing operations related to openv0. It is written in Deno, and currently, you can run it using Deno or install the binary globally using one of the methods described in the installation section.

Please note that running with `npx` is not supported at the moment. The intention is to build the binaries and publish them to npm so that the Node.js binary can be spawned as a child process.

> If Deno is not a suitable approach for this use case, we can consider using Deno Cliffy, which can be easily ported to [cliffy](https://github.com/drew-y/cliffy).

**NOTE:** This CLI is compatible with the new database/api implementation only.

## Run
To execute the CLI directly, you can use the following command:
```bash
deno run -A openv0.crawford.ml
```
> Please note that "openv0.crawford.ml" is a temporary domain.

## Install

### Using Deno
You can install the CLI using Deno with the following command:
```bash
deno install -A -n openv0 -f openv0.crawford.ml
```

### System-wide Installation

| Platform | Command |
|----------|---------------------------------------------------------|
| Windows  | `iwr instl.sh/denyncrawford/openv0/windows \| iex`      |
| Linux    | `curl -sSL instl.sh/denyncrawford/openv0/linux \| bash` |
| macOS    | `curl -sSL instl.sh/denyncrawford/openv0/macos \| bash` |

## Usage

### Installing openv0 Locally
To install openv0 locally or if you haven't installed it yet, you can use the following command:
```bash
openv0 install
```

**Arguments**
- `[destination]`: Specify the name of the destination folder. By default, it installs it in `/openv0-main`.

### Setting the Server
Since openv0 doesn't have an official host, you need to set an openv0 server to make it work:
```bash
openv0 set "https://localhost:3000"
```

### Getting a Component
You can add a generated component to your project by running:
```bash
openv0 add <component_id> [iteration_version]
```

**Arguments**:
- `<component_id>` (required): The actual name of your generated component.
- `[iteration_version]` (optional): The specific iteration version to use. By default, it adds the latest iteration of the component.

**Options**
- `--directory` (optional): Specify the component's destination directory. By default, it resolves to `/components`.

Example:
```bash
openv0 add HelloWorldButton_i9n25 1695552737252
```

Please note that this documentation assumes that "openv0.crawford.ml" and related domain-specific details are temporary and subject to change based on upstreams.