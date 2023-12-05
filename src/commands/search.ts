import { LocalDatabase, Mongodb } from "@storage"
import { Command } from "@types"

export class SearchCommand implements Command {
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
