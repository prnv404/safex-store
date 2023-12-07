import { LocalDatabase } from "src/db/local.js"
import { Mongodb } from "src/db/mongo.js"
import { Command ,Credential} from "src/types.js"


export class AllKeyCommand implements Command<Promise<Credential[]>> {
	private _receiver: LocalDatabase | Mongodb

	constructor(receiver: LocalDatabase | Mongodb) {
		this._receiver = receiver
	}

	async execute() {
		const result = await this._receiver.getAllKey()
		return result
	}
}
