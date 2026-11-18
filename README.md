# Kasya Purbey – Portfolio

Personal portfolio website built with plain HTML, CSS and JavaScript. No build step or dependencies.

## Structure

```
portfolio/
├── index.html        # page content
├── css/style.css     # styles, animations, light and dark themes
├── js/script.js      # scroll effects, marquee, theme toggle
├── assets/photo.jpg  # portrait
└── README.md
```

## Run locally

1. Open `index.html` in a browser (internet needed once for Google Fonts), or
2. Run `python -m http.server 5500` in this folder and visit http://localhost:5500

## Deploy for free

- **Netlify:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → Deploy from branch → `main`

## Customize

- Text and links: edit `index.html`
- Colors: edit the variables in the `:root` block at the top of `css/style.css`
- Photo: replace `assets/photo.jpg` (keep the same file name)
