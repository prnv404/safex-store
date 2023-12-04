import { LocalDatabase, Mongodb } from "@storage"
import { Command } from "@types"

export class DeleteCommand implements Command {
	private _receiver: LocalDatabase | Mongodb
	private _data: string

	constructor(receiver: LocalDatabase | Mongodb, data: any) {
		this._receiver = receiver
		this._data = data
	}

	async execute() {
		await this._receiver.delete(this._data)
	}
}
