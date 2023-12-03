export type CRED = {
	keyName: string
	value: string
	category: string
}

export type DataType = {
	keys: CRED[]
}

export interface ICommand {
	execute(): void
}

export interface Database {
	insert(data: CRED): Promise<boolean>
	delete(searchKey: string): Promise<boolean>
}

export enum CONSTANTS {
	JSONPATH = "../../db.json",
	YAMLPATH = "../../init.yaml"
}

export type InitConfig = {
	mongodb: boolean
	mongoDbUrl?: string
	encryption: boolean
	encryptionKey?: string
}
