import chalk from "chalk";
import figlet from "figlet";
import { CRED } from "@types";

/**
 *  logs an error message to the console.
 */

export const PrintErrToConsole = (msg: string | object): void => {
	console.error(chalk.red(msg));
};

export const PrintIntro = (): void => {
	const msg = `SAFE-X-STORE`;
	console.log(chalk.green(figlet.textSync(msg)));
};

export const PrintResultTable = (data: CRED[]) => {};

