import { CONFIG } from "@config"
import { Credential } from "@types"
import { DeleteCommand, InsertCommand, SearchCommand } from "@commands"
import { LocalDatabase, Mongodb } from "@storage"

export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand

	CONFIG.useMongoDB
		? (insertCommand = new InsertCommand(new Mongodb(), data))
		: (insertCommand = new InsertCommand(new LocalDatabase(), data))

	await insertCommand.execute()
}

export const deletKey = async (keyname: string) => {
	let deletCommand: DeleteCommand

	CONFIG.useMongoDB
		? (deletCommand = new DeleteCommand(new Mongodb(), keyname))
		: (deletCommand = new DeleteCommand(new LocalDatabase(), keyname))

	await deletCommand.execute()
}

export const searchkey = async (keyname: string, prefix: boolean = false) => {
	let searchCommand: SearchCommand

	CONFIG.useMongoDB
		? (searchCommand = new SearchCommand(new Mongodb(), keyname, prefix))
		: (searchCommand = new SearchCommand(new LocalDatabase(), keyname, prefix))

	await searchCommand.execute()
}



// export  const


await insertKey({ keyName: "key1", category: "default", value: "myvalue" })
await insertKey({ keyName: "key2", category: "default", value: "valeuess" })
await insertKey({ keyName: "key3", category: "default", value: "myvalue" })

// await searchkey("key1", true)
