This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Live demo: [https://flowbite-next-starter.vercel.app/](https://flowbite-next-starter.vercel.app/)

It also includes:

- [x] [`flowbite`](https://flowbite.com)
- [x] [`flowbite-react`](https://flowbite-react.com)
- [x] [`react-icons`](https://react-icons.github.io/react-icons)
- [x] [`tailwindcss`](https://tailwindcss.com)
- [x] Quality of life tools, like
  - [x] [`eslint`](https://eslint.org) with some plugins
  - [x] [`prettier`](https://prettier.io)

## Getting started

`Next.js` requires [`Node.js`](https://nodejs.org).

If you don't already have `npm` and `yarn` available, make sure you set them up.

```bash
npm i -g npm yarn
```

Install the dependencies:

```bash
yarn install
```

Now you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Add `flowbite-react` to `next` on your own

Follow these steps to add `flowbite-react` to a `next` project without cloning this repo.

### Requirements

- [x] [Node.js](https://nodejs.org/en/)

### How-to

#### Create a new `next` starter project:

```sh
npx create-next-app@latest --typescript
cd my-app
```

#### Install `tailwindcss` and `flowbite-react`:

```sh
npm install --save autoprefixer postcss tailwindcss flowbite flowbite-react
```

#### Create `postcss.config.js`:

```js
module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
  },
};
```

#### Create `tailwind.config.js`:

```js
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {},
};
```

#### And replace the contents of `styles/globals.css` by:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Start using `flowbite-react`!

```js
import { Alert } from "flowbite-react";

export default function MyPage() {
  return <Alert color="info">Alert!</Alert>;
}
```

## Outstanding issues

- **Carousel**s don't seem to work with [`next/image`](https://nextjs.org/docs/api-reference/next/image), so a normal `<img/>` is required, which ESLint will warn about
- **Modal**s don't work on `next` on `react@18` because of an hydration mismatch

## Learn more

### About `next`

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### About `flowbite`

[Flowbite](https://flowbite.com) is an open source collection of UI components built with the utility classes from Tailwind CSS that you can use as a starting point when coding user interfaces and websites.

In this repository, we setup [`flowbite-react`](https://flowbite-react.com) for you with examples of how to use the React components in `pages/index.tsx`.

## Deploy on `vercel`

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
