# STARK.md

Project documentation and guidelines for StarkAGI.

## Project Overview
StarkAGI is a static website hosted on GitHub Pages, serving as the public landing page, progress tracker, and knowledge base for the project.

## Development Guide

### Local Preview
To preview the site locally and avoid CORS issues with JSON/Markdown:
```bash
python -m http.server 8000
```
Open `http://localhost:8000/` in your browser.

### Architecture
- **Frontend**: Vanilla HTML, CSS, and JavaScript.
- **Data**: Content is decoupled from the UI using JSON (`data/`) and Markdown (`articles/`).
- **Visuals**: Custom Rostex fonts and Anime.js for animations.

### Content Management

#### Adding Articles/Blogs
1. **Write the Article**: Create a `.md` file in `articles/`.
   - Use ` ```mermaid ` for diagrams.
   - Use ` ```chartjs ` for charts.
2. **Index the Article**: Add an entry to `data/articles.json`:
   - `slug`: Unique identifier for the URL.
   - `title`: Article title.
   - `date`: Date in `YYYY-MM-DD`.
   - `category`: Category (e.g., "Problem Log").
   - `status`: Status (e.g., "Solved").
   - `summary`: Brief description.
   - `file`: Path to the `.md` file.
   - `tags`: Keywords.

#### Updating Progress
Updates to the project status, active milestones, and chronological logs are managed in `data/progress.json`.
