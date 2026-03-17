# Advanced Data Cleaner Suite (Static)

This folder is a static-only build intended for GitHub Pages.

- No PHP
- No MySQL
- No Admin/Login

Everything is plain HTML/CSS/JS.

## GitHub Pages Hosting
1. Create a new GitHub repository.
2. Push the contents of this `tool2` folder to the repo root.
3. GitHub -> Settings -> Pages -> Deploy from branch -> `main` -> `/ (root)`.
4. Open the URL GitHub gives you.

Notes:
- `.nojekyll` is included so GitHub Pages serves the site as-is.
- `robots.txt` and `sitemap.xml` contain placeholders. Replace:
  - `YOUR_USERNAME`
  - `YOUR_REPO`

## Editing Content (Code-Based)
### Tools
- Tool pages live in `tools/<tool-slug>/index.html`.
- Tool metadata is in `assets/js/site-data.js` (tools array).

### Articles
- Article pages live in `articles/<article-slug>/index.html`.
- Article list page is `articles/index.html`.
- Homepage "Latest articles" section is generated from `assets/js/site-data.js` (articles array).

### Pages
- Static pages: `about/`, `contact/`, `privacy-policy/`, `terms/`, `disclaimer/`, `dmca/`.

## Publish
Commit + push to GitHub. GitHub Pages will update automatically.
