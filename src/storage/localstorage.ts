import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { Credential,DataStorage,FilePaths,KeyData } from "@types"

export class LocalDatabase implements DataStorage {
	private db: Low<KeyData>

	constructor() {
		const adapter = new JSONFile<KeyData>(FilePaths.JSON_DATA)
		this.db = new Low(adapter, { credentials: [] })
	}

	async insert(data: Credential): Promise<boolean> {
		try {
			this.db.data.credentials.push(data)
			await this.db.write()
			return true
		} catch (e) {
			return false
		}
	}

	async delete(searchKey: string): Promise<boolean> {
		try {
			const length = this.db.data.credentials.length
			const excludeKey = (searchKey: string) => {
				this.db.data.credentials = this.db.data.credentials.filter((k) => {
					return k.category !== searchKey && k.keyName !== searchKey
				})
			}
			excludeKey(searchKey)
			await this.db.write()
			return this.db.data.credentials.length !== length
		} catch (e) {
			return false
		}
	}
}
