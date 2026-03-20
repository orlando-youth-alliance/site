# go-oya-go Project

## Stack
- **Hugo** (static site generator) + **PocketBase** (CMS/backend)
- Theme: `blowfish`
- `site/` — Hugo project
- `pb_data/` — PocketBase data (local dev)
- `cms/` — PocketBase deployment for production (Fly.io)

## Hugo Config Layout
Config is split across two directories:

| Directory | Purpose |
|-----------|---------|
| `site/config/_default/` | Production config (params, languages, menus) |
| `site/config/development/` | Local dev overrides (e.g. PocketBase URL) |
| `site/hugo.toml` | Base URL and theme |

## Hugo + PocketBase Integration Pattern
PocketBase runs locally at `http://127.0.0.1:8090`, configured in `site/config/development/params.toml`:
```toml
pocketbaseURL = "http://127.0.0.1:8090"
```

Remote data is fetched in **layout files** using `resources.GetRemote` — NOT in the `data/` directory (static files only).

Example (`site/layouts/pages/list.html`):
```html
{{ define "main" }}
  {{ $url := printf "%s/api/collections/pages/records" site.Params.pocketbaseURL }}
  {{ $response := resources.GetRemote $url }}
  {{ $data := $response | transform.Unmarshal }}
  {{ range $data.items }}
    <h2>{{ .title }}</h2>
    {{ .body | safeHTML }}
  {{ end }}
{{ end }}
```

Each section needs a `content/<section>/_index.md` to activate its layout.

## Key File Map

```
site/                             ← repo root / working directory
├── .github/workflows/hugo.yml    ← build + deploy to GitHub Pages; stamps last_deployed_at after deploy
├── Makefile                      ← dev commands (dev, hugo, pb, build, deploy-cms, clean)
├── pb_migrations/                ← PocketBase JS migrations (auto-run on startup)
├── pb_data/                      ← local PocketBase data (gitignored)
├── cms/
│   ├── Dockerfile                ← PocketBase container (deploy from repo root)
│   ├── fly.toml                  ← Fly.io config (app: oya-cms, region: iad)
│   ├── pb_hooks/
│   │   └── on_content_change.pb.js  ← dispatches GitHub Actions on record changes;
│   │                                   skips dispatch if X-Deploy-Stamp header present
│   └── pb_public/                ← static files served by PocketBase at /
└── site/                         ← Hugo project
    ├── hugo.toml                 ← base URL, theme
    ├── config/_default/          ← production config (params, languages, menus)
    ├── config/development/       ← local dev overrides (pocketbaseURL)
    ├── layouts/
    │   ├── _default/baseof.html  ← base HTML wrapper
    │   ├── partials/home/hero.html   ← homepage hero + quick-links
    │   ├── partials/header/fixed.html
    │   └── pages/list.html       ← fetches pages from PocketBase via resources.GetRemote
    ├── content/
    │   ├── _index.md             ← homepage copy
    │   └── pages/_index.md       ← activates pages list layout
    └── assets/img/               ← logo, hero, section images
```

## PocketBase Collections
- `pages` — fields: `title`, `body` (HTML), `slug`, `published`, `last_deployed_at`
- Internal ID: `pbc_3945946014`

## CMS Deployment (Production)
The `cms/` directory contains a standalone PocketBase deployment for production:
- **Platform**: Fly.io (`cms/fly.toml`)
- **Container**: `cms/Dockerfile` — **must deploy from repo root** (`make deploy-cms`), because the Dockerfile copies `pb_migrations/` which lives at the repo root, not inside `cms/`
- **Webhook hook**: `cms/pb_hooks/on_content_change.pb.js` — fires a GitHub Actions workflow dispatch on every record create/update/delete, triggering a Hugo rebuild

The hook reads `GITHUB_TOKEN` from the environment. In production this is set via Fly.io secrets. Locally, `cms/.env` uses a 1Password reference (`op://...`) — collaborators need the [1Password CLI](https://developer.1password.com/docs/cli/) and access to the Personal vault to run this locally.

## Dev Commands
```bash
# Start both Hugo and PocketBase (recommended)
make dev

# Hugo only (cache-busted)
make hugo

# PocketBase only
make pb

# Production build
make build
```

Hugo caches `resources.GetRemote` between builds — always use `--ignoreCache` when PocketBase content has changed (the Makefile does this automatically).
