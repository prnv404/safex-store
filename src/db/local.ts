import fs from "node:fs"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { CONFIG } from "src/config.js"
import { DataStorage, KeyData, FilePaths,Credential} from "src/types.js"
import { encrypt, decryptAllKey } from "src/utils/index.js"

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const rootPath = dirname(currentFilePath)

export class LocalDatabase implements DataStorage {
	private db: Low<KeyData>

	constructor() {
		const result = this.init()
		let data: Credential[]
		typeof result === "boolean" ? (data = []) : (data = result)
		const adapter = new JSONFile<KeyData>(rootPath + FilePaths.JSON_DATA)
		this.db = new Low(adapter, { credentials: data })
	}

	private init(): Credential[] | boolean {
		try {
			fs.accessSync(rootPath + FilePaths.JSON_DATA, fs.constants.F_OK)
			const rawData = fs.readFileSync(rootPath + FilePaths.JSON_DATA, "utf-8")
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
			this.db.data.credentials.push({
				id: data.id,
				keyName: data.keyName,
				value: data.value,
				category: data.category
			})
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
				return keyNameLower === searchkey.toLowerCase()
			})
			return await decryptAllKey(filteredCredentials)
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async getAllKey(): Promise<Credential[]> {
		try {
			const results = this.db.data.credentials
			return await decryptAllKey(results)
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
