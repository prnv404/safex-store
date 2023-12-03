import { CONSTANTS, CRED, DataType, Database } from "@types";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export class LocalDatabase implements Database {
	private db: Low<DataType>;

	constructor() {
		const adapter = new JSONFile<DataType>(CONSTANTS.FILEPATH);
		this.db = new Low(adapter, { keys: [] });
	}

	async insert(data: CRED): Promise<boolean> {
		try {
			this.db.data.keys.push(data);
			await this.db.write();
			return true;
		} catch (e) {
			return false;
		}
	}

	async delete(searchKey: string): Promise<boolean> {
		try {
			const length = this.db.data.keys.length;
			const excludeKey = (searchKey: string) => {
				this.db.data.keys = this.db.data.keys.filter((k) => {
					return k.category !== searchKey && k.keyName !== searchKey;
				});
			};
			excludeKey(searchKey);
			await this.db.write();
			return this.db.data.keys.length !== length;
		} catch (e) {
			return false;
		}
	}
}
