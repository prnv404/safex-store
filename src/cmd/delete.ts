import { LocalDatabase, Mongodb } from "../db"
import { Command } from "../types"

export class DeleteCommand implements Command<Promise<boolean>> {
	private _receiver: LocalDatabase | Mongodb
	private _data: number

	constructor(receiver: LocalDatabase | Mongodb, data: number) {
		this._receiver = receiver
		this._data = data
	}

	async execute() {
		return await this._receiver.delete(this._data)
	}
}
