# DevContainer Clone Extension

VSCode extension to clone GitHub repositories directly into dev containers with official template selection.

## Features

- 🐳 Clone any GitHub repository into a dev container
- 📋 Select from 50+ official and community dev container templates
- 🏷️ Custom container naming
- ⚡ One-click setup with proper devcontainer.json generation
- 🔍 Template search and filtering

## Official Templates Included

The extension includes templates from the official [containers.dev](https://containers.dev/templates) registry:

### Official Templates
- **Languages**: Python, Node.js, Java, Go, C++, C# (.NET), PHP, Ruby, Rust, Swift, R, F#
- **Databases**: PostgreSQL, MySQL, MariaDB, MongoDB, MS SQL
- **Infrastructure**: Docker in Docker, Docker outside of Docker, Alpine, Ubuntu, Debian
- **Specialized**: Anaconda, Existing Dockerfile/Compose support

### Community Templates
- Flutter, Mojo, Adobe Experience Manager, LocalStack, Pixi, Ziglang, Axon Ivy

## Contents

### Scripts

- `scripts/clone-in-container.sh` - Main script for cloning into a container with template support

### Editor configuration

- `.vscode/tasks.json` - "Clone Repository in Container" task
- `.vscode/keybindings.json` - Cmd+Shift+C keyboard shortcut
- `.vscode/settings.json` - Settings to improve the experience

### Custom extension

- `extensions/clone-in-container/` - Extension for compatible editors with template selection UI

## Installation

1. Clone this repository
2. Add the `scripts` folder to your PATH:
   ```bash
   echo 'export PATH="$HOME/path/to/devcontainer-clone-extension/scripts:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```
3. Copy the `.vscode` folder to your workspace

## Usage

### Via Extension (Recommended)

1. Install the extension in your editor
2. Cmd+Shift+P → "Clone Repository in Container"
3. Enter the GitHub repository URL
4. Select a dev container template from the list
5. Optionally specify a custom container name
6. The extension will clone the repo and set up the dev container

### Via Direct Script

```bash
# Basic usage (uses default template)
clone-in-container.sh https://github.com/owner/repo.git

# With specific template
clone-in-container.sh https://github.com/owner/repo.git ghcr.io/devcontainers/templates/python:3.4.0

# With custom container name
clone-in-container.sh https://github.com/owner/repo.git ghcr.io/devcontainers/templates/python:3.4.0 my-container
```

## Template Sources

This extension uses the official dev container template registry:
- **Primary Source**: [containers.dev/templates](https://containers.dev/templates)
- **GitHub Source**: [devcontainers.github.io collection-index.yml](https://github.com/devcontainers/devcontainers.github.io/blob/gh-pages/_data/collection-index.yml)

## Compatibility

- ✅ VSCode
- ✅ Cursor
- ✅ Any editor supporting VSCode extensions
- ✅ Any editor supporting VSCode tasks

## Requirements

- Docker
- Dev Container CLI (`devcontainer` command)
- Git
