// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { dirname, join } from 'path';
import { existsSync, lstatSync } from "fs";
import { getPageTemplate, getComponentTemplate } from './template';

const templateMap = {
	page: getPageTemplate,
	component: getComponentTemplate
};

// 如果传入的是文件则返回父目录
function getPath(path: string): string {
	try {
		if (lstatSync(path).isDirectory()) {
			return path;
		}
		return getPath(dirname(path));

	} catch (e) {
		vscode.window.showErrorMessage(`所选目录无效`);
		return "";
	}
}

// 获取用户输入
async function getFileName(typeName: string): Promise<string> {
	let word = await vscode.window.showInputBox({
		password: false,
		ignoreFocusOut: true,
		placeHolder: `输入${typeName}名称`,
		prompt: `自动生成${typeName}对应文件`,
		// validateInput: function (text) {
		// 	return text;
		// },
	});

	if (!word) { return ""; }

	return word;

}

async function generatorFiles(typeName: string, pathObj: any) {
	try {

		// 返回有效的文件目录
		let path = getPath(pathObj.fsPath);
		if (!path) { return; }

		if (!templateMap[typeName]) {
			return;
		}
		let name = await getFileName(typeName);
		if (!name) { return; }

		let fileMap = templateMap[typeName]();
		let writeDates = [];

		for (let exp in fileMap) {
			let filePath = join(path, `${name}.${exp}`);
			// 检查当前文件是否存在
			if (existsSync(filePath)) {
				vscode.window.showErrorMessage(`创建失败，${filePath}文件已存在`);
				return;
			}

			writeDates.push({
				uri: vscode.Uri.file(filePath),
				data: Buffer.from(fileMap[exp], "utf8")
			});
		}

		writeDates.forEach(item => {
			vscode.workspace.fs.writeFile(item.uri, item.data);
		});

		vscode.window.showInformationMessage(`创建${typeName}（${name}）成功`);

	} catch (e) {
		vscode.window.showErrorMessage(e);
	}
}

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand(
		"generator-miniprogram-files.createPage",
		async function (pathObj) {
			generatorFiles("page", pathObj);
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		"generator-miniprogram-files.createComponent",
		async function (pathObj) {
			generatorFiles("component", pathObj);
		}
	));
}

// this method is called when your extension is deactivated
export function deactivate() { }
