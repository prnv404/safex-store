import fs from "fs"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { Credential, DataStorage, FilePaths, KeyData } from "@types"
import { decryptAllKey, encrypt } from "@utils"
import { CONFIG } from "src"

export class LocalDatabase implements DataStorage {
	private db: Low<KeyData>

	constructor() {
		const result = this.init()
		let data: Credential[]
		typeof result === "boolean" ? (data = []) : (data = result)
		const adapter = new JSONFile<KeyData>(FilePaths.JSON_DATA)
		this.db = new Low(adapter, { credentials: data })
	}

	private init(): Credential[] | boolean {
		try {
			fs.accessSync(FilePaths.JSON_DATA, fs.constants.F_OK)
			const rawData = fs.readFileSync(FilePaths.JSON_DATA, "utf-8")
			const data = JSON.parse(rawData) as KeyData
			return data.credentials
		} catch (e) {
			return false
		}
	}

	async insert(data: Credential): Promise<boolean> {
		try {
			data.value = await encrypt(data.value, CONFIG.encryptionKey!)
			data.id = this.db.data.credentials.length
			++data.id
			this.db.data.credentials.push(data)
			await this.db.write()
			return true
		} catch (e) {
			console.log(e)

			return false
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const length = this.db.data.credentials.length
			const excludeKey = (id: number) => {
				this.db.data.credentials = this.db.data.credentials.filter((k) => k.id !== id)
			}
			excludeKey(id)
			await this.db.write()
			return this.db.data.credentials.length !== length
		} catch (e) {
			return false
		}
	}

	async searchKey(searchkey: string): Promise<Credential[]> {
		try {
			const filteredCredentials = this.db.data.credentials.filter((credential) => {
				const keyNameLower = credential.keyName.toLowerCase()
				return keyNameLower === searchkey
			})
			return await decryptAllKey(filteredCredentials)
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async getAllKey(): Promise<string[]> {
		try {
			const result = this.db.data.credentials
			const transformtedresult = result.map((doc) => doc.keyName)
			return transformtedresult
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async getCategoryItem(category: string): Promise<Credential[]> {
		try {
			const filteredCredentials = this.db.data.credentials.filter(
				(cred) => cred.category.toLowerCase() == category.toLowerCase()
			)
			return await decryptAllKey(filteredCredentials)
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async resetDatabase(): Promise<boolean> {
		try {
			this.db.data.credentials = []
			await this.db.write()
			return true
		} catch (e) {
			console.log(e)
			return false
		}
	}
}
