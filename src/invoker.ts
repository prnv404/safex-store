import { Credential } from "@types"
import { AllKeyCommand, DeleteCommand, InsertCommand, SearchCommand } from "@cmd"
import { LocalDatabase, Mongodb } from "@db"
import { CONFIG, init } from "@config"

/** command invokers */

export const insertKey = async (data: Credential) => {
	await init()
	let insertCommand: InsertCommand = getCommandInstance(InsertCommand, data)
	return await insertCommand.execute()
}

export const deletKey = async (id: number) => {
	await init()
	let deletCommand: DeleteCommand = getCommandInstance(DeleteCommand, id)
	return await deletCommand.execute()
}

export const searchkey = async (keyname: string) => {
	await init()
	let searchCommand: SearchCommand = getCommandInstance(SearchCommand, keyname)
	const result = await searchCommand.execute()
	console.table(result)
}

export const getallKey = async () => {
	await init()

	let allkeyCommand: AllKeyCommand = getCommandInstance(AllKeyCommand)

	return await allkeyCommand.execute()
}

// helper
const getCommandInstance = (command: any, ...args: any) => {
	if (CONFIG.useMongoDB) {
		return new command(new Mongodb(), ...args)
	} else {
		return new command(new LocalDatabase(), ...args)
	}
}
