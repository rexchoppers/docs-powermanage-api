# PowerManage API Docs

Documentation site and tooling for the PowerManage API. This repository contains the OpenAPI specification (both a main entry file and modular YAMLs) and a tiny local dev server that bundles the spec and serves a live preview using Scalar API Reference.

## Features
- Modular OpenAPI YAML under `./api` with a top-level `openapi.yaml` entry.
- One‑command local preview: bundles the spec with Redocly and serves via a simple Node HTTP server.
- Live reload during authoring via nodemon (watches `openapi.yaml` and `api/`).

## Quick start

### Prerequisites
- Node.js 20+ recommended

### Install dependencies
```
npm install
```

### Run the docs locally
This command will:
- Watch your YAML sources (`openapi.yaml` and `api/` directory)
- Bundle them into `complete.yaml` with Redocly
- Serve `index.html` and the bundled spec at http://localhost:8005
```
npm run dev
```
Open your browser to:
- Docs UI: http://localhost:8005/
- Bundled spec: http://localhost:8005/complete.yaml

### Manual bundle (optional)
If you just want to produce `complete.yaml` without running the watcher/server:
```
npx redocly bundle openapi.yaml -o complete.yaml
```

## Project layout
- `openapi.yaml` — main OpenAPI entry that references other YAML files
- `api/` — modular spec files (e.g., paths, components) under versioned folders
- `index.html` — lightweight Scalar API Reference page that points to `complete.yaml`
- `dev.js` — Node script that bundles the spec and serves the site on port 8005
- `complete.yaml` — generated artifact (do not hand‑edit)

## Editing the spec
- Modify `openapi.yaml` or the files under `api/`.
- Keep references valid; run `npm run dev` to see errors in the console if the bundle fails.
- The browser refreshes automatically when files change.

## Scripts
- `npm run dev` — start nodemon watcher and the local server defined in `dev.js`.

## Dependencies
- `@redocly/cli` — for bundling OpenAPI
- `nodemon` — for watching files during development
- `@scalar/api-reference` — loaded via CDN in `index.html` to render the docs UI

## License
MIT License. See `LICENSE` file.
