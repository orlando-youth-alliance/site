# go-oya-go

Hugo + PocketBase site for [Orlando Youth Alliance](https://orlandoyouthalliance.org/).

## Dev Setup

### Prerequisites
- [Hugo](https://gohugo.io/installation/) (extended edition)
- [PocketBase](https://pocketbase.io/docs/) binary on your PATH
- [1Password CLI](https://developer.1password.com/docs/cli/) (needed to load `cms/.env` secrets locally)

### Start the dev environment

```bash
make dev
# Hugo serves at http://localhost:1313
# PocketBase admin at http://127.0.0.1:8090/_/
```

Other useful commands:
```bash
make build   # production Hugo build
make admin   # open PocketBase admin UI in browser
make open    # open local Hugo site in browser
make clean   # remove build artifacts
```

---

## Cheatsheet

### Config
| What | Where |
|------|-------|
| Site title, language, author/headline/socials | `site/config/_default/languages.en.toml` |
| Theme params (logo, colors, homepage layout) | `site/config/_default/params.toml` |
| Base URL, theme | `site/hugo.toml` |
| Local dev overrides (PocketBase URL) | `site/config/development/params.toml` |

### Layouts (our overrides — edit these)
| What | Where |
|------|-------|
| Full page wrapper (body, header slot, main slot) | `site/layouts/_default/baseof.html` |
| Homepage: hero image + title + socials + button panel + content | `site/layouts/partials/home/hero.html` |
| Pages section list (PocketBase integration) | `site/layouts/pages/list.html` |

### Layouts (theme originals — read for reference, don't edit)
| What | Where |
|------|-------|
| Hero title/headline/socials HTML | `site/themes/blowfish/layouts/partials/home/hero.html` |
| Navbar (logo + menu) | `site/themes/blowfish/layouts/partials/header/basic.html` |
| Header wrapper (fixed/scroll behavior) | `site/themes/blowfish/layouts/partials/header/fixed.html` |
| All homepage layout variants (profile, card, background…) | `site/themes/blowfish/layouts/partials/home/` |

### Content
| What | Where |
|------|-------|
| Homepage text (mission, youth, parents sections) | `site/content/_index.md` |
| Pages section stub | `site/content/pages/_index.md` |

### Assets
| What | Where |
|------|-------|
| All images (logo, hero, section photos) | `site/assets/img/` |

### Key rule
To override any theme partial/layout, copy it to the same relative path under `site/layouts/` and edit there. Hugo will use your version over the theme's.

---

## CMS (Production)

The `cms/` directory contains the production PocketBase deployment:
- Hosted on **Fly.io** (`cms/fly.toml`)
- Built with `cms/Dockerfile`
- On every content change (create/update/delete), `cms/pb_hooks/on_content_change.pb.js` triggers a GitHub Actions workflow dispatch, which rebuilds and deploys the Hugo site

### Environment / Secrets

`cms/.env` stores a 1Password reference for the GitHub token used by the webhook:

```
GITHUB_TOKEN="op://Personal/github pbtoken/credential"
```

To run the CMS locally, you need the [1Password CLI](https://developer.1password.com/docs/cli/) and access to the Personal vault. In production, the secret is set directly as a Fly.io secret (`fly secrets set GITHUB_TOKEN=...`).

> **Note**: The GitHub Actions workflow URL in `cms/pb_hooks/on_content_change.pb.js` points to the current repo. Update it if the repo is moved.
