import { LocalDatabase, Mongodb } from "../db"
import { Command, Credential } from "../types"

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
