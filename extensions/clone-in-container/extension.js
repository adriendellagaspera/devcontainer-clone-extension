const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('cloneInContainer.clone', async () => {
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

        if (repoUrl) {
            const terminal = vscode.window.createTerminal('Clone in Container');
            terminal.show();
            terminal.sendText(`cursor-clone-container.sh "${repoUrl}"`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
