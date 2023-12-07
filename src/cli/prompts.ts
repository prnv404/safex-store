import inquirer from "inquirer"
import { Configuration } from "../types"
const { AutoComplete } = require("enquirer")

const configurationQuestions = [
	{
		type: "list",
		name: "storage",
		message: "Select storage type you want :",
		choices: ["localstorage", "mongodb"],
		default: "localstorage"
	},
	{
		type: "input",
		name: "mongourl",
		message: "Enter MongoDB URL:",
		when: (answers: { storage: string }) => answers.storage === "mongodb"
	},
	{
		type: "input",
		name: "encryptionKey",
		message: "Enter encryption key :"
	},
	{
		type: "input",
		name: "name",
		message: "Enter name:"
	},
	{
		type: "confirm",
		name: "confirm",
		message: "Confirm your entries:",
		default: true
	}
]

export async function promptUser(): Promise<Configuration> {
	const answers = await inquirer.prompt(configurationQuestions)
	return answers as Configuration
}

export const SearchAutoCompletePrompt = (keyNames: string[]) => {
	const prompt = new AutoComplete({
		name: "search",
		message: "search your key",
		limit: 50,
		initial: 0,
		choices: keyNames
	})
	return prompt
}
