import { Low } from "lowdb"
import { Configuration, FilePaths } from "@types"
import { YamlAdapter } from "@utils"

const adapter = new YamlAdapter(FilePaths.YAML_DATA)

const YamlConfig = new Low(adapter, {})

export const InitializeConfig = async (options: Configuration) => {
	try {
		const config: Configuration = {
			useMongoDB: options.useMongoDB ? true : false,
			mongoDbUrl: options.mongoDbUrl ? options.mongoDbUrl : undefined,
			useEncryption: options.useEncryption ? true : false,
			encryptionKey: options.encryptionKey ? options.encryptionKey : undefined,
			name: options.name
		}
		await YamlConfig.adapter.write(config)
	} catch (e) {
		console.log(e)
	}
}

export const LoadConfigurationData = async (): Promise<Configuration> => {
	return (await YamlConfig.adapter.read()) as Configuration
}

export let CONFIG: Configuration

export const init = async () => {
	CONFIG = await LoadConfigurationData()
}
