#!/bin/bash

# Script pour cloner un dépôt GitHub directement dans un dev container avec template
# Usage: ./clone-in-container.sh <repository-url> [template-image] [container-name]

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <repository-url> [template-image] [container-name]"
    echo "Exemple: $0 https://github.com/owner/repo.git"
    echo "Exemple: $0 https://github.com/owner/repo.git ghcr.io/devcontainers/templates/python:3.4.0"
    echo "Exemple: $0 https://github.com/owner/repo.git ghcr.io/devcontainers/templates/python:3.4.0 my-container"
    exit 1
fi

REPO_URL="$1"
TEMPLATE_IMAGE="$2"
CONTAINER_NAME="${3:-$(basename "$REPO_URL" .git)}"
TEMP_DIR="/tmp/clone-$(date +%s)-$$"

echo "🚀 Clonage du dépôt dans un container..."
echo "📦 Dépôt: $REPO_URL"
echo "🏷️  Container: $CONTAINER_NAME"

if [ -n "$TEMPLATE_IMAGE" ]; then
    echo "🐳 Template: $TEMPLATE_IMAGE"
fi

# Créer le dossier temporaire
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Cloner le dépôt
echo "📥 Clonage en cours..."
git clone "$REPO_URL" .

# Créer le fichier devcontainer.json si un template est spécifié
if [ -n "$TEMPLATE_IMAGE" ]; then
    echo "📝 Création du fichier devcontainer.json..."
    cat > .devcontainer/devcontainer.json << EOF
{
    "name": "$CONTAINER_NAME",
    "image": "$TEMPLATE_IMAGE",
    "features": {},
    "customizations": {
        "vscode": {
            "extensions": []
        }
    },
    "forwardPorts": [],
    "portsAttributes": {},
    "postCreateCommand": "",
    "remoteUser": "vscode"
}
EOF
    echo "✅ Fichier devcontainer.json créé avec le template: $TEMPLATE_IMAGE"
fi

# Créer le dev container
echo "🐳 Création du dev container..."
if [ -n "$TEMPLATE_IMAGE" ]; then
    devcontainer up --workspace-folder . --id-label "name=$CONTAINER_NAME"
else
    # Si aucun template n'est spécifié, utiliser le comportement par défaut
    devcontainer up --workspace-folder . --id-label "name=$CONTAINER_NAME"
fi

# Nettoyer le dossier temporaire
echo "🧹 Nettoyage..."
cd ~
rm -rf "$TEMP_DIR"

echo "✅ Dépôt cloné et ouvert dans le dev container '$CONTAINER_NAME'"
if [ -n "$TEMPLATE_IMAGE" ]; then
    echo "🐳 Template utilisé: $TEMPLATE_IMAGE"
fi
echo "💡 Pour vous connecter au container: devcontainer exec --id-label name=$CONTAINER_NAME bash"
