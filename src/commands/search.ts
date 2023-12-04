import { LocalDatabase, Mongodb } from "@storage"
import { Command } from "@types"

export class SearchCommand implements Command {
	private _receiver: LocalDatabase | Mongodb
	private searchkey: string
	private prefix: boolean

	constructor(receiver: LocalDatabase | Mongodb, searchkey: string, prefix: boolean) {
		this._receiver = receiver
		this.searchkey = searchkey
		this.prefix = prefix
	}

	async execute() {
		await this._receiver.searchKey(this.searchkey, this.prefix)
	}
}
