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
