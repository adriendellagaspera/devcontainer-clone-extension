#!/bin/bash

# Script pour cloner un dépôt GitHub directement dans un dev container
# Usage: ./clone-in-container.sh https://github.com/owner/repo.git

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <repository-url> [container-name]"
    echo "Exemple: $0 https://github.com/owner/repo.git"
    exit 1
fi

REPO_URL="$1"
CONTAINER_NAME="${2:-$(basename "$REPO_URL" .git)}"
TEMP_DIR="/tmp/clone-$(date +%s)-$$"

echo "🚀 Clonage du dépôt dans un container..."
echo "📦 Dépôt: $REPO_URL"
echo "🏷️  Container: $CONTAINER_NAME"

# Créer le dossier temporaire
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Cloner le dépôt
echo "📥 Clonage en cours..."
git clone "$REPO_URL" .

# Créer le dev container
echo "🐳 Création du dev container..."
devcontainer up --workspace-folder . --id-label "name=$CONTAINER_NAME"

# Nettoyer le dossier temporaire
echo "🧹 Nettoyage..."
cd ~
rm -rf "$TEMP_DIR"

echo "✅ Dépôt cloné et ouvert dans le dev container '$CONTAINER_NAME'"
echo "💡 Pour vous connecter au container: devcontainer exec --id-label name=$CONTAINER_NAME bash"
