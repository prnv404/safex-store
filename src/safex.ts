#!/usr/bin/env node

import { Command } from "commander"
import { deletKey, getallKey, insertKey, searchkey } from "../src/invoker"
import { Configuration } from "@types"
import { InitializeConfig, init } from "@config"
import {
	NameInputPrompt,
	SelectStoragePrompt,
	MongodbUrlPompt,
	SecretKeyInputPrompt,
	SearchAutoCompletePrompt
} from "../src/cli/promt"
import { printLogo } from "../src/cli/ui"

const program = new Command()

program.name("Safex-store").description("CLI to store credentials safely and securely").version("1.0.0")

program
	.command("init")
	.description("Initialize your CLI configurations")
	.action(async () => {
		const initializeSafeX = async () => {
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

			printLogo()
		}

		await initializeSafeX()
	})

program
	.command("search <key>")
	.description("Search for a specific key")
	.action(async (key) => {
		await searchkey(key)
	})

program
	.command("auto")
	.description("Auto-suggest search keys")
	.action(async () => {
		const autoSuggestion = async () => {
			await init()
			const allkeys = await getallKey()
			const keyInput = await SearchAutoCompletePrompt(allkeys).run()
			console.log(keyInput)
		}

		await autoSuggestion()
	})

program
	.command("delete <id>")
	.description("Delete a key by its ID")
	.action(async (id) => {
		await deletKey(+id)
	})

program
	.command("insert <keyname> <value>")
	.description("Insert a new key with a keyname and value")
	.action(async (key, value) => {
		await insertKey({ keyName: key, value, category: "default" })
	})

program.parse(process.argv)
