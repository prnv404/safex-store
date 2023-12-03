export type CRED = {
	keyName: string;
	value: string;
	category: string;
};

export type DataType = {
	keys: CRED[];
};

export interface ICommand {
	execute(): void;
	undo(): void;
}

export interface Database {
	insert(data: CRED): Promise<boolean>;
	delete(searchKey: string): Promise<boolean>;
}

export enum CONSTANTS {
	FILEPATH = "../../db.json"
}
