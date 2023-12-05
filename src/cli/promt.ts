const { AutoComplete, Input, Select } = require("enquirer")

export const NameInputPrompt = () => {
	const prompt = new Input({
		message: "Enter you name 🪬",
		initial: "bob"
	})
	return prompt
}

export const SelectStoragePrompt = () => {
	const prompt = new Select({
		name: "storage",
		message: "Pick a storage option you want 🍁",
		choices: ["LocalStorage", "MongoDb"]
	})
	return prompt
}

export const MongodbUrlPompt = () => {
	const prompt = new Input({
		message: "Enter your Mongodb atlas url ",
		initial: "use atlas"
	})
	return prompt
}

export const SecretKeyInputPrompt = () => {
	const prompt = new Input({
		message: "Enter a powerful Secret key for encryption ",
		initial: "don't use 'mysecret' 😂"
	})
	return prompt
}

export const SearchAutoCompletePrompt = (keyNames: string[]) => {
	const prompt = new AutoComplete({
		name: "search",
		message: "search your key",
		limit: 50,
		initial: 2,
		choices: keyNames
	})
	return prompt
}
