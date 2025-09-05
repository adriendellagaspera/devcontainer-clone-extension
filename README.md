# DevContainer Clone Extension

VSCode extension to replicate the "Clone Repository in Container" functionality from VSCode in any compatible editor.

## Contents

### Scripts

- `scripts/clone-in-container.sh` - Main script for cloning into a container

### Editor configuration

- `.vscode/tasks.json` - "Clone Repository in Container" task
- `.vscode/keybindings.json` - Cmd+Shift+C keyboard shortcut
- `.vscode/settings.json` - Settings to improve the experience

### Custom extension

- `extensions/clone-in-container/` - Extension for compatible editors

## Installation

1. Clone this repository
2. Add the `scripts` folder to your PATH:
   ```bash
   echo 'export PATH="$HOME/path/to/devcontainer-clone-extension/scripts:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```
3. Copy the `.vscode` folder to your workspace

## Usage

### Via task (recommended)

1. Open the folder in your editor
2. Cmd+Shift+P → "Clone Repository in Container"
3. Or use the Cmd+Shift+C shortcut

### Via direct script

```bash
clone-in-container.sh https://github.com/owner/repo.git
```

## Compatibility

- ✅ VSCode
- ✅ Cursor
- ✅ Any editor supporting VSCode tasks
