import * as vscode from 'vscode';

function getAllLogs() {
    const editor = vscode.window.activeTextEditor;

    if(!editor) {return [];};

    const document = editor.document;

    const documentText = document.getText();

    const allLogs = [];

    const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?/g;

    let match;
    while(match = logRegex.exec(documentText)) {
        let matchRange = new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));

        if(!matchRange.isEmpty) {allLogs.push(matchRange);};
    }

    return allLogs;
}


export default () => {
    const editor = vscode.window.activeTextEditor;

    if(!editor) {return;};

    const workspaceEdit = new vscode.WorkspaceEdit();

    const document = editor.document;

    const allLogs = getAllLogs();

    allLogs.forEach(log => {
        workspaceEdit.delete(document.uri, log);
    });

    vscode.workspace.applyEdit(workspaceEdit).then(() => {
        vscode.window.showInformationMessage(`${allLogs.length} console deleted`);
    });

};