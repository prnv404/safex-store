class SearchCommand {
	private _receiver: any
	private _data: any

	constructor(receiver: any, data: any) {
		this._receiver = receiver
		this._data = data
	}

	execute() {
		this._receiver.insert(this._data)
	}
}

export { SearchCommand }
