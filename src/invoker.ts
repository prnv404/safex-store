/** command invokers */

import { DeleteCommand } from "./cmd/delete.js"
import { AllKeyCommand } from "./cmd/getallkey.js"
import { InsertCommand } from "./cmd/insert.js"
import { SearchCommand } from "./cmd/search.js"
import { init, CONFIG } from "./config.js"
import { LocalDatabase } from "./db/local.js"
import { Mongodb } from "./db/mongo.js"
import { Credential } from "./types.js"


export const insertKey = async (data:Credential ) => {
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
