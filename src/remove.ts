import * as vscode from 'vscode';


export default () => {
    const editor = vscode.window.activeTextEditor;

    if(!editor) {return;}

    editor.edit(editBuilder => {
        let text= editor.document.getText();

        text = text.replace(/((\/\*([\w\W]+?)\*\/)|(\/\/(.(?!"\)))+)|(^\s*(?=\r?$)\n))/gm, '')
                    .replace(/(^\s*(?=\r?$)\n)/gm, '')
                    .replace(/\\n\\n\?/gm, '');

        const end = new vscode.Position(editor.document.lineCount + 1, 0);

        editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);

        vscode.commands.executeCommand('editor.action.formatDocument');

    });
};