# Drift Journal 🎣

A fly fishing trip journal — live USGS conditions, AI fish identification, catch logging.

## Install as Android App (2 minutes)

1. Go to your GitHub Pages URL in Chrome on Android
2. Tap ⋮ menu → **"Add to Home Screen"**
3. Tap **Add** — Drift Journal installs as a full-screen app

## Deploy to GitHub Pages

1. Create a new GitHub repository (public)
2. Upload all files from this folder
3. Go to **Settings → Pages → Source: GitHub Actions**
4. Push to `main` — your app deploys automatically
5. Your URL will be: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Features

- 📍 Location search with Claude AI suggestions + real lat/lng
- 🌊 Live USGS stream conditions (flow, temp, gauge height)
- 🐟 AI fish identification from photos
- 🪰 Full fly pattern + size logging per catch
- 📓 Trip journal with weather conditions
- 💾 All data saved locally (localStorage)
- 📴 Works offline after first load

## Files

| File | Description |
|------|-------------|
| `index.html` | Main app |
| `manifest.json` | PWA manifest (icons, name, colors) |
| `sw.js` | Service worker (offline caching) |
| `icon-192.png` | App icon (192×192) |
| `icon-512.png` | App icon (512×512) |
