import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copilot-api-caller.triggerCopilotChat', async () => {
		// Get selected text from the active editor
		const editor = vscode.window.activeTextEditor;
		let contextText = '';
		if (editor) {
			const selection = editor.selection;
			contextText = editor.document.getText(selection);
		}

		// Prompt for user input
		const prompt = await vscode.window.showInputBox({
			prompt: 'Enter your query for GitHub Copilot',
			placeHolder: 'e.g., Explain this code',
			value: contextText ? `Regarding this code: \n\`\`\`\n${contextText}\n\`\`\`\n` : ''
		});

		if (prompt) {
			try {
				// Execute the chat command (Note: Capturing response might not be directly supported)
				await vscode.commands.executeCommand('workbench.action.chat.open', prompt);
				vscode.window.showInformationMessage('Sent prompt to Copilot Chat!');
				
				// Placeholder for capturing response - VS Code API may not directly provide this
				// You might need to listen to chat events or use a different approach
				// For now, we'll show a message indicating the prompt was sent
			} catch (error) {
				vscode.window.showErrorMessage(`Failed to trigger Copilot Chat: ${error}`);
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}