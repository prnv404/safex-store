import { Low } from "lowdb"
import { CONSTANTS, InitConfig } from "@types"
import { YamlAdapter } from "@utils"

const adapter = new YamlAdapter(CONSTANTS.YAMLPATH)

const YamlConfig = new Low(adapter, {})

export const InitializeSafeX = async (options: InitConfig) => {
	try {
		const config: InitConfig = {
			mongodb: options.mongodb ? true : false,
			mongoDbUrl: options.mongodb ? options.mongoDbUrl : undefined,
			encryption: options.encryption ? true : false,
			encryptionKey: options.encryption ? options.encryptionKey : undefined
		}
		await YamlConfig.adapter.write(config)
	} catch (e) {
		console.log(e)
	}
}
