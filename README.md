
# openv0

project website - [openv0.com](https://openv0.com)

**openv0** is a generative UI component framework

It allows you to AI generate and iterate on UI components, with live preview.

- **openv0** makes use of open source component libraries and icons to build a library of assets for the generative pipeline.
- **openv0** is highly modular, and structured for elaborate generative processes
- Component generation is a multipass pipeline - where every pass is a fully independent plugin

(say hi [@n_raidenai](https://twitter.com/n_raidenai) 👋)

![image](https://github.com/raidendotai/openv0/assets/127366981/65332d8b-6f95-4ce4-9b19-4be12762e4d8)

---

# Currently Supported

* Frontend frameworks
  * React
  * Next.js
  * Svelte
* UI libraries
  * NextUI
  * Flowbite
  * Shadcn
* Icons libraries
  * Lucide

The latest **openv0** update makes it easier to integrate new frameworks, libraries and plugins.

Docs & guides on how to do so will be soon posted.

Next updates :
- public explore+share web app on [openv0.com](https://openv0.com) *(you can use the openv0 share API already)*
- multimodal `UIray` vision model *(more details soon)*
- better validation passes, more integrations & plugins



---

# Demos

## Current version

https://github.com/raidendotai/openv0/assets/127366981/a249cf0d-ae44-4155-a5c1-fc2528bf05b5

## Previous version

[openv0_demo.webm](https://github.com/raidendotai/openv0/assets/127366981/53b14c27-22ec-40a3-a431-539daf197f49)

---

# Install

* Open your terminal and run

```sh
npx openv0@latest
```

It will download openv0, configure it based on your choices & install dependencies. Then :

* Start the local server + webapp
  * start server `cd server && node api.js`
  * start webapp `cd webapp && npm run dev`
* Open you web browser, go to `http://localhost:5173/`

That is all. Have fun 🎉

---

**Alternatively** - you can also clone this repo and install manually

To do so :
* Clone repo, run `npm i` in `server/`
* Unzip `server/library/icons/lucide/vectordb/index.zip` into that same folder
* Configure your OpenAI key in `server/.env`
* Web apps starter templates are in `webapps-starters/`
  * run `npm i` in the web app starter of your choice
  * make sure that `WEBAPP_ROOT` variable `server/.env` matches your webapp folder path
* Start the server with `node api.js` and the web app with `npm run dev`

---

# How It Works

### Multipass Workflow

A simple explanation is the following image

![openv0_process](https://github.com/raidendotai/openv0/assets/127366981/dad08255-f54a-4437-bf87-9560f69940a7)

### Codebase

Youtube video by user [@elie2222](https://www.youtube.com/@elie2222) explains parts of the previous openv0 code base


[![@elie2222](https://img.youtube.com/vi/fAEH2ZBO6BA/maxresdefault.jpg)](https://www.youtube.com/watch?v=fAEH2ZBO6BA)


