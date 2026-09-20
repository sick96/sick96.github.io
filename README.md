# sick96.github.io

A small TypeScript 7 web page built with Vite and deployed to GitHub Pages.

## Requirements

- Node.js 22 or newer
- npm

## Development

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

The development server prints its local URL in the terminal, usually
`http://localhost:5173`.

## Production build

Build the site into `dist/`:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Project structure

```text
.
├── index.html       # Vite HTML entrypoint
├── src/
│   ├── main.ts      # TypeScript entrypoint
│   └── style.css    # Global styles
├── dist/            # Generated production output
└── .github/
    └── workflows/
        └── deploy-pages.yml
```

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the
site to GitHub Pages whenever changes are pushed to `main`. It can also be
started manually from the GitHub Actions tab.

In the repository settings, configure **Pages** to use **GitHub Actions** as
the deployment source.
