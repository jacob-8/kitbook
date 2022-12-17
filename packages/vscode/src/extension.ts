import * as vscode from 'vscode';
const UPDATE_WORKSPACE_SETTINGS = false;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('kitbook.toggleMdFileAssociation', () => {
		const workspaceConfiguration = vscode.workspace.getConfiguration();
		const fileAssociations = workspaceConfiguration.get("files.associations") as Record<string, string>;
		const toggled = toggleMdAsSvelteAssociation(fileAssociations);
		workspaceConfiguration.update('files.associations', toggled, UPDATE_WORKSPACE_SETTINGS);
		// vscode.window.showInformationMessage('Toggled Markdown File Association (svelte <-> markdown)');
	});

	context.subscriptions.push(disposable);
}

function toggleMdAsSvelteAssociation(current: Record<string, string>) {
	let updated = Object.assign({}, current);
	
	const mdAssociatedWithSvelte = updated["*.md"] === "svelte";
	if (mdAssociatedWithSvelte) {
		delete updated["*.md"];
	} else {
		updated["*.md"] = "svelte";
	}
	
	return updated;
}