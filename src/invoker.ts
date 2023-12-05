import { Credential } from "@types"
import { AllKeyCommand, DeleteCommand, InsertCommand, SearchCommand } from "@cmd"
import { LocalDatabase, Mongodb } from "@db"
import { CONFIG } from "src"

/** command invokers */

export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand

	CONFIG.useMongoDB
		? (insertCommand = new InsertCommand(new Mongodb(), data))
		: (insertCommand = new InsertCommand(new LocalDatabase(), data))

	return await insertCommand.execute()
}

export const deletKey = async (id: number) => {
	let deletCommand: DeleteCommand

	CONFIG.useMongoDB
		? (deletCommand = new DeleteCommand(new Mongodb(), id))
		: (deletCommand = new DeleteCommand(new LocalDatabase(), id))

	return await deletCommand.execute()
}

export const searchkey = async (keyname: string) => {
	let searchCommand: SearchCommand

	CONFIG.useMongoDB
		? (searchCommand = new SearchCommand(new Mongodb(), keyname))
		: (searchCommand = new SearchCommand(new LocalDatabase(), keyname))

	return await searchCommand.execute()
}

export const getallKey = async () => {
	let allkeyCommand: AllKeyCommand

	CONFIG.useMongoDB
		? (allkeyCommand = new AllKeyCommand(new Mongodb()))
		: (allkeyCommand = new AllKeyCommand(new LocalDatabase()))

	return await allkeyCommand.execute()
}
