import { Configuration } from "@types"
import { TextFile } from "lowdb/node"
import YMAL from "yaml"

export class YamlAdapter {
	private adapter: TextFile

	constructor(filename: string) {
		this.adapter = new TextFile(filename)
	}

	async read(): Promise<Configuration | null> {
		const data = await this.adapter.read()
		if (data === null) {
			return null
		}
		return YMAL.parse(data)
	}

	async write(obj: object) {
		return this.adapter.write(YMAL.stringify(obj))
	}
}
