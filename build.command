#!/bin/zsh
cd "$(dirname "$0")"
export PATH="$HOME/.local/node/bin:$PATH"
node src/render.mjs && echo "\n  ✓ Built. Upload the dist/ folder.\n"
