import * as vscode from 'vscode';
import insert from './insert';
import del from './del';
import remove from './remove';

const commandList = [
	{command: 'auto-log.insert', handler: insert},
	{command: 'auto-log.del',handler: del},
	{command: 'auto-log.remove-comments',handler: remove}
];

export function activate(context: vscode.ExtensionContext) {
	console.log('activated inter');

	commandList.forEach(({command, handler}) => {
		context.subscriptions.push(vscode.commands.registerCommand(command, handler));
	});

}

export function deactivate() {}
