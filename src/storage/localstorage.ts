import { CRED, DataType } from "@types";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export class LocalDatabase {
	private db: Low<DataType>;

	constructor() {
		const adapter = new JSONFile<DataType>("db.json");
		this.db = new Low(adapter, { keys: [] });
	}

	insert(data: CRED): boolean {
		this.db.data.keys.push(data);
		this.db.write();
		return true;
	}

	delete(searchKey: string): boolean {
		const length = this.db.data.keys.length;
		const excludeKey = (searchKey: string) => {
			const data = this.db.data.keys.filter((k) => k.category === searchKey || k.keyName === searchKey);
			return data;
		};

		this.db.data.keys = excludeKey(searchKey);
		this.db.write();
		return this.db.data.keys.length !== length;
	}
}
