#!/usr/bin/env node

import figlet from "figlet"
import chalk from "chalk"
import { printKeyToConsole, printResultasTable } from "./cli/ui.js"
import { Command } from "node_modules/commander/typings/index.js"
import { promptUser } from "./cli/prompts.js"
import { InitializeConfig } from "./config.js"
import { searchkey, getallKey, deletKey } from "./invoker.js"
import { Configuration } from "./types.js"

const program = new Command()

program.name("Safex-store").description("CLI to store credentials safely and securely").version("1.0.0")

program
	.command("init")
	.description("Initialize SafeX CLI configurations")
	.action(async () => {
		const initializeSafeX = async () => {
			let config = (await promptUser()) as unknown as Configuration
			if (config.confirm === false) {
				process.exit(1)
			}
			await InitializeConfig(config)
		}
		await initializeSafeX()
		console.log(chalk.blue(figlet.textSync("SAFEX STORE")))
	})

program
	.command("search <key>")
	.alias("s")
	.description("Search for a specific key")
	.action(async (key) => {
		const result = await searchkey(key)
		result.forEach((item: { keyName: string; value: string }) => {
			printKeyToConsole(item.keyName, item.value)
		})
	})

program
	.command("all")
	.description("get all key in database")
	.action(async () => {
		const result = await getallKey()
		printResultasTable(result)
	})

program
	.command("delete <id>")
	.description("Delete a key by its ID")
	.action(async (id) => {
		await deletKey(+id)
	})

// program
// 	.command("insert <keyname> <value>")
// 	.description("Insert a new key with a keyname and value")
// 	.action(async (keyname, value) => {
// 		return await insertKey({ keyName: keyname, value, category: "default" })
// 	})

program.parse(process.argv)

process.on("SIGINT", () => {
	process.exit(1)
})
