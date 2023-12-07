import { LocalDatabase } from "src/db/local.js"
import { Mongodb } from "src/db/mongo.js"
import { Command ,Credential} from "src/types.js"

export class SearchCommand implements Command<Promise<Credential[]>> {
	private _receiver: LocalDatabase | Mongodb
	private searchkey: string

	constructor(receiver: LocalDatabase | Mongodb, searchkey: string) {
		this._receiver = receiver
		this.searchkey = searchkey
	}

	async execute() {
		return await this._receiver.searchKey(this.searchkey)
	}
}
