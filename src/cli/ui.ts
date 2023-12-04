import chalk from "chalk"
import figlet from "figlet"
import { Credential } from "@types"

export const PrintErrToConsole = (msg: string | object): void => {
	console.error(chalk.red(msg))
}

export const PrintIntro = (): void => {
	const msg = `SAFE-X-STORE`
	console.log(chalk.green(figlet.textSync(msg)))
}

export const PrintResultTable = (data: Credential[]) => {
	console.log(data)
}
