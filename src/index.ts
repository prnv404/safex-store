import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

enum CONSTANTS {
	FILEPATH = "./db.json"
}

/**
 * Represents a credential object with properties for key name, value, and category.
 */
export type CRED = {
	keyName: string;
	value: string;
	category: string;
};

/**
 * The DataType type is an object that contains an array of CRED objects called keys.
 */
export type DataType = {
	keys: CRED[];
};

const db = new Low(new JSONFile<DataType>(CONSTANTS.FILEPATH), { keys: [] });

/**
 * Helper Methods
 */

/**
 * The function appends data to a database and writes the changes.
 */
const appendData = async function (data: CRED) {
	db.data.keys.push(data);
	await db.write();
};

/**
 * The function searches for a given search key in a database and returns an array of matching CRED
 * objects, a single CRED object, or undefined if no match is found..
 */
const searchKey = function (searchKey: string): CRED[] | CRED | undefined {
	const data = db.data;
	const result = data.keys.filter((_key: CRED) => _key.keyName.startsWith(searchKey));
	return result;
};

/**
 * The function searches for keys in a database based on a given category.
 */
const searchKeyWithCategory = function (category: string): CRED[] | undefined {
	const data = db.data;
	const result = data.keys.filter((_key) => _key.category.startsWith(category));
	return result;
};
