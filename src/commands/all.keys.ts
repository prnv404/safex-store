import { LocalDatabase, Mongodb } from "@storage"
import { Command } from "@types"

export class AllKeyCommand implements Command {
	private _receiver: LocalDatabase | Mongodb

	constructor(receiver: LocalDatabase | Mongodb) {
		this._receiver = receiver
	}

	async execute() {
		return await this._receiver.getAllKey()
	}
}
