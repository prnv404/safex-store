import { LocalDatabase, Mongodb } from "../db"
import { Command, Credential } from "../types"


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
