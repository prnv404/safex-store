import { Config } from "@config"
import { InsertCommand } from "./commands/insert"
import { Mongodb } from "./storage/mongodb"
import { LocalDatabase } from "./storage/localstorage"
import { Credential } from "@types"
import { DeleteCommand } from "./commands/delete"

export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand

	Config.useMongoDB
		? (insertCommand = new InsertCommand(new Mongodb(), data))
		: (insertCommand = new InsertCommand(new LocalDatabase(), data))

	await insertCommand.execute()
}

export const deletKey = async (keyname: string) => {
	let deletCommand: DeleteCommand

	Config.useMongoDB
		? (deletCommand = new DeleteCommand(new Mongodb(), keyname))
		: (deletCommand = new DeleteCommand(new LocalDatabase(), keyname))

	await deletCommand.execute()
}

export const searchkey = async (keyname:string) =>{
	
}

// await insertKey({ keyName: "key1", category: "default", value: "myvalue" })
// await insertKey({ keyName: "key2", category: "default", value: "valeuess" })
// await insertKey({ keyName: "key4", category: "default", value: "myvalue" })

// await deletkey('key1)
