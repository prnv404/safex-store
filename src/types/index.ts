export type Credential = {
	id?: number
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
	delete(id: number): Promise<boolean>
	searchKey(searchKey: string, prefix: boolean): Promise<Credential[] | boolean>
	getCategoryItem(category: string): Promise<Credential[] | boolean>
	resetDatabase(): Promise<boolean>
}

export enum FilePaths {
	JSON_DATA = "../db.json",
	YAML_DATA = "../init.yaml"
}

export type Configuration = {
	useMongoDB: boolean
	mongoDbUrl?: string
	useEncryption: boolean
	encryptionKey?: string
}
