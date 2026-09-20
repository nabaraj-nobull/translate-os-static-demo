# TranslateOS — GitHub Pages (static)

This folder is generated from `build/` PHP templates. Do not edit HTML here by hand—change `build/` and re-export.

## Regenerate

From the repo root:

```bash
php build/scripts/export-static.php
```

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: `main` (or your default), folder: **`/docs`**
5. Save. The site will be at `https://<user>.github.io/<repo>/` (project site) or your custom domain.

For a **user/org site** (`username.github.io` repo), copy the contents of `docs/` to the root of that repo instead.
