const vscode = require('vscode');
const { exec } = require('child_process');

// Official Dev Container Templates from containers.dev
const DEV_CONTAINER_TEMPLATES = [
    // Official Templates
    { name: 'Alpine', image: 'ghcr.io/devcontainers/templates/alpine:3.4.0', category: 'Official' },
    { name: 'Anaconda (Python 3)', image: 'ghcr.io/devcontainers/templates/anaconda:2.0.2', category: 'Official' },
    { name: 'Anaconda (Python 3) & PostgreSQL', image: 'ghcr.io/devcontainers/templates/anaconda-postgres:2.0.2', category: 'Official' },
    { name: 'C++', image: 'ghcr.io/devcontainers/templates/cpp:3.0.3', category: 'Official' },
    { name: 'C++ & MariaDB', image: 'ghcr.io/devcontainers/templates/cpp-mariadb:3.0.3', category: 'Official' },
    { name: 'Debian', image: 'ghcr.io/devcontainers/templates/debian:3.0.2', category: 'Official' },
    { name: 'Existing Docker Compose (Extend)', image: 'ghcr.io/devcontainers/templates/docker-existing-docker-compose:1.2.3', category: 'Official' },
    { name: 'Existing Dockerfile', image: 'ghcr.io/devcontainers/templates/docker-existing-dockerfile:1.3.2', category: 'Official' },
    { name: 'Docker in Docker', image: 'ghcr.io/devcontainers/templates/docker-in-docker:1.3.2', category: 'Official' },
    { name: 'Docker outside of Docker', image: 'ghcr.io/devcontainers/templates/docker-outside-of-docker:1.3.2', category: 'Official' },
    { name: 'Docker outside of Docker Compose', image: 'ghcr.io/devcontainers/templates/docker-outside-of-docker-compose:2.3.2', category: 'Official' },
    { name: 'C# (.NET)', image: 'ghcr.io/devcontainers/templates/dotnet:3.5.0', category: 'Official' },
    { name: 'F# (.NET)', image: 'ghcr.io/devcontainers/templates/dotnet-fsharp:3.1.2', category: 'Official' },
    { name: 'C# (.NET) and MS SQL', image: 'ghcr.io/devcontainers/templates/dotnet-mssql:3.6.0', category: 'Official' },
    { name: 'C# (.NET) and PostgreSQL', image: 'ghcr.io/devcontainers/templates/dotnet-postgres:3.5.0', category: 'Official' },
    { name: 'Go', image: 'ghcr.io/devcontainers/templates/go:4.2.0', category: 'Official' },
    { name: 'Go & PostgreSQL', image: 'ghcr.io/devcontainers/templates/go-postgres:4.2.0', category: 'Official' },
    { name: 'Java', image: 'ghcr.io/devcontainers/templates/java:4.0.2', category: 'Official' },
    { name: 'Java & PostgreSQL', image: 'ghcr.io/devcontainers/templates/java-postgres:4.0.2', category: 'Official' },
    { name: 'Node.js & JavaScript', image: 'ghcr.io/devcontainers/templates/javascript-node:4.0.2', category: 'Official' },
    { name: 'Node.js & Mongo DB', image: 'ghcr.io/devcontainers/templates/javascript-node-mongo:4.0.2', category: 'Official' },
    { name: 'Node.js & PostgreSQL', image: 'ghcr.io/devcontainers/templates/javascript-node-postgres:4.0.2', category: 'Official' },
    { name: 'PHP', image: 'ghcr.io/devcontainers/templates/php:2.0.2', category: 'Official' },
    { name: 'PHP & MariaDB', image: 'ghcr.io/devcontainers/templates/php-mariadb:2.0.2', category: 'Official' },
    { name: 'PHP & MySQL', image: 'ghcr.io/devcontainers/templates/php-mysql:2.0.2', category: 'Official' },
    { name: 'PHP & PostgreSQL', image: 'ghcr.io/devcontainers/templates/php-postgres:2.0.2', category: 'Official' },
    { name: 'Python', image: 'ghcr.io/devcontainers/templates/python:3.4.0', category: 'Official' },
    { name: 'Python & PostgreSQL', image: 'ghcr.io/devcontainers/templates/python-postgres:3.4.0', category: 'Official' },
    { name: 'R', image: 'ghcr.io/devcontainers/templates/r:2.0.2', category: 'Official' },
    { name: 'R & PostgreSQL', image: 'ghcr.io/devcontainers/templates/r-postgres:2.0.2', category: 'Official' },
    { name: 'Ruby', image: 'ghcr.io/devcontainers/templates/ruby:2.0.2', category: 'Official' },
    { name: 'Ruby & PostgreSQL', image: 'ghcr.io/devcontainers/templates/ruby-postgres:2.0.2', category: 'Official' },
    { name: 'Rust', image: 'ghcr.io/devcontainers/templates/rust:3.0.2', category: 'Official' },
    { name: 'Rust & PostgreSQL', image: 'ghcr.io/devcontainers/templates/rust-postgres:3.0.2', category: 'Official' },
    { name: 'Swift', image: 'ghcr.io/devcontainers/templates/swift:2.0.2', category: 'Official' },
    { name: 'Ubuntu', image: 'ghcr.io/devcontainers/templates/ubuntu:3.0.2', category: 'Official' },
    
    // Community Templates
    { name: 'Flutter', image: 'ghcr.io/thephaseless/devcontainer-templates/flutter:1.0.0', category: 'Community' },
    { name: 'Mojo', image: 'ghcr.io/sleter/mojo-devcontainer/mojo:0.0.5', category: 'Community' },
    { name: 'Adobe Experience Manager', image: 'ghcr.io/juan-ayala/devcontainer-templates/aem:1.2.0', category: 'Community' },
    { name: 'LocalStack Docker-in-Docker', image: 'ghcr.io/localstack/devcontainer-template/localstack-dind:0.1.1', category: 'Community' },
    { name: 'LocalStack Docker-outside-of-Docker', image: 'ghcr.io/localstack/devcontainer-template/localstack-dood:0.1.2', category: 'Community' },
    { name: 'Universal for arm64', image: 'ghcr.io/lx-0/devcontainer-templates/universal-arm64:0.1.0', category: 'Community' },
    { name: 'Pixi', image: 'ghcr.io/blooop/devcontainer-templates/pixi:1.0.4', category: 'Community' },
    { name: 'Ziglang', image: 'ghcr.io/fardragon/devcontainers-zig-template/ziglang:0.2.2', category: 'Community' },
    { name: 'Axon Ivy', image: 'ghcr.io/axonivy/devcontainer-templates/axonivy:1.0.1', category: 'Community' }
];

function activate(context) {
    let disposable = vscode.commands.registerCommand('cloneInContainer.clone', async () => {
        // Step 1: Get repository URL
        const repoUrl = await vscode.window.showInputBox({
            prompt: 'URL du dépôt GitHub à cloner',
            placeHolder: 'https://github.com/owner/repo.git',
            validateInput: (value) => {
                if (!value || !value.includes('github.com')) {
                    return 'Veuillez entrer une URL GitHub valide';
                }
                return null;
            }
        });

        if (!repoUrl) return;

        // Step 2: Select template
        const templateItems = DEV_CONTAINER_TEMPLATES.map(template => ({
            label: template.name,
            description: template.category,
            detail: template.image,
            template: template
        }));

        const selectedTemplate = await vscode.window.showQuickPick(templateItems, {
            placeHolder: 'Sélectionnez un template Dev Container',
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (!selectedTemplate) return;

        // Step 3: Get container name (optional)
        const containerName = await vscode.window.showInputBox({
            prompt: 'Nom du container (optionnel)',
            placeHolder: 'Nom automatique basé sur le dépôt',
            validateInput: (value) => {
                if (value && !/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Le nom ne peut contenir que des lettres, chiffres, tirets et underscores';
                }
                return null;
            }
        });

        // Execute the clone command
        const terminal = vscode.window.createTerminal('Clone in Container');
        terminal.show();
        
        const command = containerName 
            ? `cursor-clone-container.sh "${repoUrl}" "${selectedTemplate.template.image}" "${containerName}"`
            : `cursor-clone-container.sh "${repoUrl}" "${selectedTemplate.template.image}"`;
            
        terminal.sendText(command);
        
        vscode.window.showInformationMessage(
            `Clonage en cours avec le template: ${selectedTemplate.template.name}`
        );
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
