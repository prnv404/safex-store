import { LoadConfigurationData, InitializeConfig } from "@config"
import { Configuration } from "@types"
import {
	MongodbUrlPompt,
	NameInputPrompt,
	SecretKeyInputPrompt,
	SelectStoragePrompt,
	SearchAutoCompletePrompt
} from "@cli"
import { getallKey, searchkey } from "./invoker"

// Initializing
export const initializeSafeX = async () => {
	let config: Configuration = {
		useMongoDB: false,
		useEncryption: false,
		name: ""
	}
	config.name = await NameInputPrompt().run()
	const storageChoice = await SelectStoragePrompt().run()
	if (storageChoice !== "LocalStorage") {
		config.useMongoDB = true
		config.mongoDbUrl = await MongodbUrlPompt().run()
	}
	config.useEncryption = true
	config.encryptionKey = await SecretKeyInputPrompt().run()
	await InitializeConfig(config)
}

export const search = async (name: string) => {
	searchkey(name)
}

export const autoSuggestion = async () => {
	const allkeys = await getallKey()
	const keyInput = await SearchAutoCompletePrompt(allkeys).run()
	keyInput
}


export let CONFIG: Configuration

LoadConfigurationData().then( (value) => {
	CONFIG = value
	autoSuggestion()
})
