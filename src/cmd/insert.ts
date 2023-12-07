import { LocalDatabase } from "src/db/local.js"
import { Mongodb } from "src/db/mongo.js"
import { Command ,Credential} from "src/types.js"



export class InsertCommand implements Command<Promise<boolean>> {
	private _receiver: LocalDatabase | Mongodb
	private _data: Credential

	constructor(receiver: LocalDatabase | Mongodb, data: Credential) {
		this._receiver = receiver
		this._data = data
	}

	async execute() {
		return await this._receiver.insert(this._data)
	}
}
