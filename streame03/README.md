# StreamE03 — Video on Demand (Static)

A small, self-contained video-on-demand website built with plain HTML, CSS, and
vanilla JavaScript. It uses [hls.js](https://github.com/video-dev/hls.js) to
stream adaptive HLS (`.m3u8`) video in any modern browser.

## Features

- Home page with a responsive video catalog grid
- Live search across titles, genres, and descriptions
- Category filter chips (Animation, Sci-Fi, Tech, Nature…)
- Dedicated player page with adaptive HLS streaming + native fallback
- "Up Next" recommendations from the catalog
- Dark, mobile-friendly UI — no build step required

## Run it

Because the player loads scripts as modules/pages via relative paths, open it
through a local static server (not `file://`) so HLS streams load correctly.

### With Python

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

### With Node (npx)

```bash
npx serve .
```

### With VS Code

Use the **Live Server** extension and click "Go Live".

## Project structure

```
streame03/
├── index.html        # Home / catalog
├── player.html       # Video player page
├── css/
│   └── styles.css    # Dark responsive theme
└── js/
    ├── data.js       # Catalog (titles + HLS sources)
    ├── app.js        # Home: grid, search, filters
    └── player.js     # Player: HLS loading + details
```

## Customizing the catalog

Edit `js/data.js`. Each entry:

```js
{
  id: "unique-id",
  title: "Title",
  category: "Genre",
  duration: "12:34",
  year: 2024,
  rating: "PG",
  description: "Short synopsis.",
  src: "https://your-stream.m3u8",   // HLS playlist
  gradient: "linear-gradient(...)"   // poster background
}
```

> The default streams are public HLS test sources and require an internet
> connection. Replace `src` with your own `.m3u8` URLs to use real content.
