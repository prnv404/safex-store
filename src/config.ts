import { Low } from "lowdb"
import { Configuration, FilePaths } from "@types"
import { YamlAdapter } from "@utils"

const adapter = new YamlAdapter(FilePaths.YAML_DATA)

const YamlConfig = new Low(adapter, {})

export const InitializeSafeX = async (options: Configuration) => {
	try {
		const config: Configuration = {
			useMongoDB: options.useMongoDB ? true : false,
			mongoDbUrl: options.mongoDbUrl ? options.mongoDbUrl : undefined,
			useEncryption: options.useEncryption ? true : false,
			encryptionKey: options.encryptionKey ? options.encryptionKey : undefined
		}
		await YamlConfig.adapter.write(config)
	} catch (e) {
		console.log(e)
	}
}

export const GetConfigurationData = async (): Promise<Configuration> => {
	return (await YamlConfig.adapter.read()) as Configuration
}

export const Config: Configuration = await GetConfigurationData()
