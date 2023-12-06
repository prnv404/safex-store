/** command invokers */

import { DeleteCommand } from "./cmd/delete"
import { AllKeyCommand } from "./cmd/getallkey"
import { InsertCommand } from "./cmd/insert"
import { SearchCommand } from "./cmd/search"
import { CONFIG, init } from "./config"
import { Mongodb, LocalDatabase } from "./db"
import { Credential } from "./types"

export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand = await getCommandInstance(InsertCommand, data)
	return await insertCommand.execute()
}

export const deletKey = async (id: number) => {
	let deletCommand: DeleteCommand = await getCommandInstance(DeleteCommand, id)
	return await deletCommand.execute()
}

export const searchkey = async (keyname: string) => {
	let searchCommand: SearchCommand = await getCommandInstance(SearchCommand, keyname)
	const result = await searchCommand.execute()
	return result
}

export const getallKey = async () => {
	let allkeyCommand: AllKeyCommand = await getCommandInstance(AllKeyCommand)
	const result = await allkeyCommand.execute()
	return result
}

// helper
const getCommandInstance = async (command: any, ...args: any) => {
	await init()
	if (CONFIG.storage == "mongodb") {
		return new command(new Mongodb(), ...args)
	} else {
		return new command(new LocalDatabase(), ...args)
	}
}
