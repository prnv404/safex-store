export type Credential = {
	id?: number
	keyName: string
	value: string
	category: string
}

export type KeyData = {
	credentials: Credential[]
}

export interface Command<T> {
	execute(): T
}

export interface DataStorage {
	insert(credential: Credential): Promise<boolean>
	delete(id: number): Promise<boolean>
	searchKey(searchKey: string): Promise<Credential[]>
	getCategoryItem(category: string): Promise<Credential[] >
	resetDatabase(): Promise<boolean>
	getAllKey(): Promise<string[]>
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
	name?: string
}
