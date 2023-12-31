import mongoose, { Document, Model } from "mongoose"
import { CONFIG } from "../config"
import { Credential, DataStorage } from "../types"
import { encrypt, decryptAllKey } from "../utils"

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
			transform(doc, ret: any) {
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
			await connectMongodb(CONFIG.mongourl!)
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
			await connectMongodb(CONFIG.mongourl!)
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

	async searchKey(searchKey: string): Promise<Credential[]> {
		try {
			await connectMongodb(CONFIG.mongourl!)
			const query = { keyName: { $eq: new RegExp(searchKey, "i") } }
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

	async getAllKey(): Promise<Credential[]> {
		try {
			await connectMongodb(CONFIG.mongourl!)
			const results = await this.keystore.find({}, { keyName: 1, category: 1, id: 1, value: 1 })
			return await decryptAllKey(results)
		} catch (e) {
			console.log(e)
			return []
		} finally {
			await disConnectDb()
		}
	}

	async getCategoryItem(category: string): Promise<Credential[]> {
		try {
			await connectMongodb(CONFIG.mongourl!)
			const result = await this.keystore.find({ category: new RegExp(category, "i") })
			return await decryptAllKey(result)
		} catch (e) {
			console.log(e)
			return []
		} finally {
			await disConnectDb()
		}
	}

	async resetDatabase(): Promise<boolean> {
		try {
			await connectMongodb(CONFIG.mongourl!)
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
