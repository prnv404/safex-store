import { Credential } from "@types"
import { AllKeyCommand, DeleteCommand, InsertCommand, SearchCommand } from "@cmd"
import { LocalDatabase, Mongodb } from "@db"
import { CONFIG, init } from "@config"

/** command invokers */

export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand
	await init()
	CONFIG.useMongoDB
		? (insertCommand = new InsertCommand(new Mongodb(), data))
		: (insertCommand = new InsertCommand(new LocalDatabase(), data))

	return await insertCommand.execute()
}

export const deletKey = async (id: number) => {
	await init()

	let deletCommand: DeleteCommand

	CONFIG.useMongoDB
		? (deletCommand = new DeleteCommand(new Mongodb(), id))
		: (deletCommand = new DeleteCommand(new LocalDatabase(), id))

	return await deletCommand.execute()
}

export const searchkey = async (keyname: string) => {
	await init()

	let searchCommand: SearchCommand

	CONFIG.useMongoDB
		? (searchCommand = new SearchCommand(new Mongodb(), keyname))
		: (searchCommand = new SearchCommand(new LocalDatabase(), keyname))

	const result = await searchCommand.execute()
	console.table(result)
}

export const getallKey = async () => {
	await init()

	let allkeyCommand: AllKeyCommand

	CONFIG.useMongoDB
		? (allkeyCommand = new AllKeyCommand(new Mongodb()))
		: (allkeyCommand = new AllKeyCommand(new LocalDatabase()))

	return await allkeyCommand.execute()
}
