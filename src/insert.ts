import * as vscode from 'vscode';

function insertText(str: string) {
    const editor = vscode.window.activeTextEditor;

    if(!editor) {return vscode.window.showErrorMessage('Can\'t insert log becase no document is opened');};

    const selection = editor.selection;

    const lineOfSelectionVar = selection.active.line;

    editor.edit(editBuilder => {
        // todo: 插入位置和选中行 头部对齐
        editBuilder.insert(new vscode.Position(lineOfSelectionVar + 1, 0), str);
    });
}

export default () => {
    const editor = vscode.window.activeTextEditor;

    if(!editor) {return;}

    const selection = editor.selection;

    const text = editor.document.getText(selection);

    const logToInsert = `console.log('${text}', ${text});\n`;

    text ? insertText(logToInsert) : insertText('console.log();\n');
};