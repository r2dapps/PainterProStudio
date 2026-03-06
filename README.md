# PainterPro Studio

Professional WebGL material-visualization studio for interior surfaces, powered by a Unity WebGL runtime with a custom HTML/JavaScript control interface.

[Live Demo](https://r2dapps.github.io/PainterProStudio/)

## Overview

PainterPro Studio lets users interactively select 3D objects and apply:

- Curated paint colors with generated shade variants
- Surface textures (marble/stone style libraries)
- Material parameters (tiling, roughness, metallic)
- 4K screenshot captures for presentation-ready outputs
- Cost estimates with INR formatting, PDF export, and clipboard copy

The project uses a parent web app (`index.html` + `main.js`) that communicates with a Unity WebGL scene loaded inside `unity.html` via `postMessage` and a JavaScript Unity plugin bridge (`PainterPro.jslib`).

## Live Demo

- URL: https://r2dapps.github.io/PainterProStudio/

## Key Features

- Object selection workflow with dynamic material slot controls
- Paint library with searchable cards and multi-shade generation
- Texture library with searchable presets and custom image upload
- Real-time material tuning:
  - Tiling
  - Roughness
  - Metallic
- Persistent light/dark theme preference using `localStorage`
- 4K render export through Unity screenshot bridge
- Built-in estimator with category-wise logic for:
  - Paint
  - Tiles
  - Marble
  - Wallpaper/Texture
  - Art/Decor
- Estimate output options:
  - On-screen summary
  - Print/PDF-friendly window
  - Clipboard text export

## Tech Stack

- Unity WebGL build artifacts (`Build/`)
- HTML5 + CSS3 + Vanilla JavaScript
- Browser `postMessage` bridge for parent iframe communication
- Unity `.jslib` integration for command routing and file download

## Project Structure

```text
PainterProStudio/
|- index.html              # Main app shell and control UI
|- style.css               # App styling and responsive layout
|- main.js                 # UI logic, library handling, bridge, estimator
|- unity.html              # Unity WebGL loader iframe entry
|- PainterPro.jslib        # Unity <-> browser bridge functions
|- Build/                  # Unity WebGL output files
|- StreamingAssets/        # Runtime assets (default model, etc.)
|- img/textures/           # Texture library assets
`- TemplateData/           # Unity WebGL template assets
```

## Getting Started (Local)

Unity WebGL content should be served over HTTP (not opened directly with `file://`).

1. Clone the repository.
2. Start a local static server from the project root.
3. Open the served URL in your browser.

Example options:

```bash
# Python 3
python -m http.server 8080
```

```bash
# Node.js (if serve is installed)
npx serve .
```

Then open:

- `http://localhost:8080` (Python)
- or the URL printed by `npx serve`

## How It Works

1. `index.html` renders the UI and embeds `unity.html` in an iframe.
2. `unity.html` loads Unity WebGL files from `Build/`.
3. A readiness handshake is performed (`UnityReady` message).
4. UI actions in `main.js` are queued/sent to Unity (`FromParent` messages).
5. Unity emits selection/progress events back to UI (`FromUnity` messages).
6. `PainterPro.jslib` routes commands to Unity C# methods and supports screenshot downloads.

## Controls

- Select object: Left-click on model parts
- Exit selection mode: `Esc`
- Rotate camera: Right-click + drag
- Pan camera: Middle-click + drag (or Shift + right-click + drag)
- Zoom: Mouse wheel
- Download render: Camera button in header

## Deployment

This repository is already configured to run as a static site and can be hosted on GitHub Pages.

For this project, the live deployment is:

- https://r2dapps.github.io/PainterProStudio/

## Notes

- Keep Unity build filenames in `unity.html` aligned with files inside `Build/`.
- Large WebGL assets may increase first-load time; loading overlays and progress states are implemented to improve UX.

## License

Add your preferred license in this section (for example: MIT, Apache-2.0, or proprietary).
