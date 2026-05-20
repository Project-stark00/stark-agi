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

## Notes

- JavaScript and CSS are separated from HTML.
- Anime.js is bundled locally at `vendor/anime.min.js`, so the page does not depend on an external anime.js CDN request.
- The page is a static website and does not need a build step.
