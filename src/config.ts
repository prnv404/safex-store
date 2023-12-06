import { Low } from "lowdb"
import { Configuration, FilePaths } from "./types"
import { TextFile } from "lowdb/node"
import YAML from "yaml"
import { fileURLToPath } from "url"
import { dirname } from "path"

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const rootPath = dirname(currentFilePath)

export class YamlFile {
	private adapter: TextFile

	constructor(filename: string) {
		this.adapter = new TextFile(rootPath + filename)
	}

	async read(): Promise<Configuration | null> {
		const data = await this.adapter.read()
		if (data === null) {
			return null
		}
		return YAML.parse(data)
	}

	async write(obj: object) {
		return this.adapter.write(YAML.stringify(obj))
	}
}

const adapter = new YamlFile(FilePaths.YAML_DATA)
const YamlConfig = new Low(adapter, {})

export const InitializeConfig = async (options: Configuration) => {
	try {
		await YamlConfig.adapter.write(options)
	} catch (e) {
		console.log(e)
	}
}

export let CONFIG: Configuration

export const init = async () => {
	try {
		CONFIG = (await YamlConfig.adapter.read()) as Configuration
	} catch (e) {
		throw new Error("erro")
		console.log(e)
	}
}
