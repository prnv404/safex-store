import mongoose, { Document, Model } from "mongoose"
import { DataStorage, Credential } from "@types"
import { Config } from "@config"

export const connectMongodb = async (url: string) => {
	try {
		await mongoose.connect(url)
	} catch (e) {
		console.error(e)
	}
}

export const disConnectDb = async () => {
	try {
		await mongoose.disconnect()
	} catch (e) {
		console.error(e)
	}
}

const KeyStoreSchema = new mongoose.Schema(
	{
		keyname: {
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
			await connectMongodb(Config.mongoDbUrl!)
			await this.keystore.create(data)
			await disConnectDb()
			return true
		} catch (e) {
			return false
		}
	}

	async delete(searchKey: string): Promise<boolean> {
		try {
			await connectMongodb(Config.mongoDbUrl!)
			await this.keystore.deleteMany({
				$or: [
					{
						category: searchKey
					},
					{
						keyName: searchKey
					}
				]
			})
			await disConnectDb()
			return true
		} catch (e) {
			return false
		}
	}
}
