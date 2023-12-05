import mongoose, { Document, Model } from "mongoose"
import { DataStorage, Credential } from "@types"
import { CONFIG } from "@config"
import { decryptAllKey, encrypt } from "@utils"

export const connectMongodb = async (url: string) => {
	try {
		await mongoose.connect(url)
		console.log("mongodb connected")
	} catch (e) {
		console.error(e)
	}
}

export const disConnectDb = async () => {
	try {
		await mongoose.disconnect()
		console.log("mongodb disconnected")
	} catch (e) {
		console.error(e)
	}
}

const KeyStoreSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true
		},
		keyName: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id
				delete ret.__v
			}
		}
	}
)

const keyStore = mongoose.model<Document & Credential>("KeyStore", KeyStoreSchema)

export class Mongodb implements DataStorage {
	private keystore: Model<Document & Credential>

	constructor() {
		this.keystore = keyStore
	}

	async insert(data: Credential): Promise<boolean> {
		try {
			await connectMongodb(CONFIG.mongoDbUrl!)
			let id = await this.keystore.countDocuments()
			data.id = id++
			data.value = await encrypt(data.value, CONFIG.encryptionKey!)
			await this.keystore.create(data)
			console.log("Inserted data:", data)
			return true
		} catch (e) {
			console.error("Error inserting data:", e)
			return false
		} finally {
			await disConnectDb()
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			await connectMongodb(CONFIG.mongoDbUrl!)
			await this.keystore.deleteOne({ id })
			console.log("Deleted data with search key:", id)
			return true
		} catch (e) {
			console.error("Error deleting data:", e)
			return false
		} finally {
			await disConnectDb()
		}
	}

	async searchKey(searchKey: string, prefix: boolean): Promise<Credential[]> {
		try {
			await connectMongodb(CONFIG.mongoDbUrl!)
			let query: any = {}
			if (prefix) query = { keyName: { $regex: `^${searchKey}` } }
			else query = { keyName: { $eq: new RegExp(searchKey, "i") } }
			const results = await this.keystore.find(query)
			const transformedResults = results.map((doc) => doc.toJSON())
			return await decryptAllKey(transformedResults)
		} catch (e) {
			console.error("Error searching key:", e)
			return []
		} finally {
			await disConnectDb()
		}
	}
	async getCategoryItem(category: string): Promise<Credential[] | boolean> {
		try {
			await connectMongodb(CONFIG.mongoDbUrl!)
			const result = await this.keystore.find({ category: new RegExp(category, "i") })
			return await decryptAllKey(result)
		} catch (e) {
			console.log(e)
			return false
		} finally {
			await disConnectDb()
		}
	}

	async resetDatabase(): Promise<boolean> {
		try {
			await connectMongodb(CONFIG.mongoDbUrl!)
			await this.keystore.deleteMany({})
			return true
		} catch (e) {
			console.log(e)
			return false
		} finally {
			await disConnectDb()
		}
	}
}
