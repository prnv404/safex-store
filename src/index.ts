import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

enum CONSTANTS {
	FILEPATH = "./db.json"
}

export type CRED = {
	keyName: string;
	value: string;
	category: string;
};


export type DataType = {
	keys: CRED[];
};

const db = new Low(new JSONFile<DataType>(CONSTANTS.FILEPATH), { keys: [] });

/**
 * Helper Methods
 */


const appendData = async function (data: CRED) {
	db.data.keys.push(data);
	await db.write();
};


const searchKey = function (searchKey: string): CRED[] | CRED | undefined {
	const data = db.data;
	data.keys.entries
	const result = data.keys.filter((_key: CRED) => _key.keyName.startsWith(searchKey));
	return result;
};


const searchKeyWithCategory = function (category: string): CRED[] | undefined {
	const data = db.data;
	const result = data.keys.filter((_key) => _key.category.startsWith(category));
	return result;
};
