# openv0

**openv0** is a generative UI component tool

It allows you to AI generate and iterate on React+Tailwind components, with live preview. openv0 makes use of library components from [shadcn/ui](https://ui.shadcn.com/) and icons from [lucide-icons/lucide](https://lucide.dev/)

The open-source project is inspired by vercel's [v0.dev](https://v0.dev/), which, at the time of writing, is still on private waitlisted alpha


Say hi [@n_raidenai](https://twitter.com/n_raidenai) 👋


# Demo

[openv0_demo.webm](https://github.com/raidendotai/openv0/assets/127366981/53b14c27-22ec-40a3-a431-539daf197f49)

# Install

* Open your terminal and run

```sh
npx openv0
```

It will download openv0 and install dependencies *(alternatively, you can also clone this repo and install manually)*

* Replace your OpenAI API key in `openv0_server/.env`
* Make sure you have MongoDB on your system or provide your mongo uri in `openv0_server/.env`
* Start the local server + webapp
  * Bulk shadcn components into the database `cd openv0_server/modules/db/scripts && node bulk-shadcn.js`
  * start server `cd openv0_server && node index.js`
  * start webapp `cd openv0_vitereact && npm run dev`
* Open you web browser, go to `http://localhost:5173/`

That is all. Have fun 🎉

# How It Works

Here is a simple explanation

![openv0_process](https://github.com/raidendotai/openv0/assets/127366981/dad08255-f54a-4437-bf87-9560f69940a7)

