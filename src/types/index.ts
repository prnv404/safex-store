export type Credential = {
	keyName: string
	value: string
	category: string
}

export type KeyData = {
	credentials: Credential[]
}

export interface Command {
	execute(): void
}

export interface DataStorage {
	insert(credential: Credential): Promise<boolean>
	delete(searchKeyName: string): Promise<boolean>
}

export enum FilePaths {
	JSON_DATA = "../../db.json",
	YAML_DATA = "../../init.yaml"
}

export type Configuration = {
	useMongoDB: boolean
	mongoDbUrl?: string
	useEncryption: boolean
	encryptionKey?: string
}
