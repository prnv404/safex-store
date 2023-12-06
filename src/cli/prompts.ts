import * as prompt from "@clack/prompts"
import chalk from "chalk"

export const InitializeconfiPrompt = async () => {
	console.log()
	prompt.intro(chalk.green("Initilizing Safex 🔐"))
	const group = await prompt.group({
		name: () => prompt.text({ message: "What's is your name 🪬" }),
		storage: ({ results }) =>
			prompt.select({
				message: `choose a storage option you like ${results.name} 🐸`,
				options: [
					{ value: "localstorage", label: "localstorage ( stores data in json file locally )" },
					{ value: "mongodb", label: "mongodb ( recommented to use mongodb atlas )" }
				]
			}),
		encryptionKey: () => prompt.text({ message: "Enter a strong secret key for encrypting your keys 🗝️" }),
		mongourl: () =>
			prompt.text({ message: "Enter your mongodb url (press enter if not selected)", defaultValue: "skipped" }),
		confirm: () => prompt.confirm({ message: "Is it all Correct ?" })
	})

	return group
}
