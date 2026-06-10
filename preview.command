#!/bin/zsh
cd "$(dirname "$0")"
export PATH="$HOME/.local/node/bin:$PATH"
node src/dev.mjs
