import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('Congratulations, your extension "kitbook" is now active!');

	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('kitbook.toggleMdFileAssociation', () => {
		vscode.window.showInformationMessage('Hello World from Kitbook!');
	});

	context.subscriptions.push(disposable);
}