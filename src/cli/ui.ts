import figlet from "figlet"
import chalk from "chalk"
import ora from "ora"

export const printLogo = () => {
	const spinner = ora("Initializing SAFEX STORE").start()

	setTimeout(() => {
		spinner.stop()
		console.log(chalk.blue(figlet.textSync("SAFEX STORE")))
	}, 2000)
}
