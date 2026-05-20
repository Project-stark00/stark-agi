# StarkAGI Webpage

Static GitHub Pages-ready landing page for StarkAGI.

## File structure

```text
index.html
css/style.css
js/app.js
vendor/anime.min.js
vendor/CDN_SOURCE.txt
vendor/ANIME_LICENSE.txt
```

## How to use

1. Replace both `https://github.com/YOUR_USERNAME/YOUR_REPO` placeholders in `index.html` with your real GitHub repository URL.
2. Push the full folder contents to the root of your GitHub repo.
3. Enable GitHub Pages from `Settings -> Pages -> Deploy from a branch`.
4. Select your main branch and `/root`.

## Notes

- JavaScript and CSS are separated from HTML.
- Anime.js is bundled locally at `vendor/anime.min.js`, so the page does not depend on an external anime.js CDN request.
- The page is a static website and does not need a build step.
