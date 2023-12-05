import { LocalDatabase, Mongodb } from "src/db"
import { Command } from "@types"

export class AllKeyCommand implements Command<Promise<string[]>> {
	private _receiver: LocalDatabase | Mongodb

	constructor(receiver: LocalDatabase | Mongodb) {
		this._receiver = receiver
	}

	async execute() {
		return await this._receiver.getAllKey()
	}
}
