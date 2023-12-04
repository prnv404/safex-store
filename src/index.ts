/**
 * TODO:

 *  1.Insert Key 
 *  2.Search 
 *      1.based on keyname | category
 *      2.rejex and prefix matching
 *      3.Table Cli View of Matching Keys
 *  3.Local storage or Remote sotrage eg:Mongodb Atlas
 *  4.Encrypt the key before Storing and Decrypt the key
 *  5.Update and Delete key | category
 *  6.Clean out all Data 
 */

import { Config } from "@config"
import { InsertCommand } from "./commands/insert"
import { Mongodb } from "./storage/mongodb"
import { LocalDatabase } from "./storage/localstorage"
import { Credential } from "@types"
import { DeleteCommand } from "./commands/delete"

let localDatabase: LocalDatabase | undefined
export const insertKey = async (data: Credential) => {
	let insertCommand: InsertCommand

	if (!localDatabase) {
		localDatabase = new LocalDatabase()
	}

	Config.useMongoDB
		? (insertCommand = new InsertCommand(new Mongodb(), data))
		: (insertCommand = new InsertCommand(localDatabase, data))

	await insertCommand.execute()
}

export const deletKey = async (keyname: string) => {
	let deletCommand: DeleteCommand
	if (!localDatabase) {
		localDatabase = new LocalDatabase()
	}
	Config.useMongoDB
		? (deletCommand = new DeleteCommand(new Mongodb(), keyname))
		: (deletCommand = new DeleteCommand(localDatabase, keyname))

	await deletCommand.execute()
}

// await insertKey({ keyName: "key1", category: "default", value: "myvalue" })
// await insertKey({ keyName: "key2", category: "default", value: "valeuess" })
// await insertKey({ keyName: "key4", category: "default", value: "myvalue" })


// await deletkey('key1)
