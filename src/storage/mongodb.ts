import mongoose, { Document, Model } from "mongoose";
import { CRED, Database } from "@types";

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
				delete ret._id;
			}
		}
	}
);

const keyStore = mongoose.model<Document & CRED>("KeyStore", KeyStoreSchema);


export class Mongodb implements Database {
	
	private keystore: Model<Document & CRED>;

	constructor() {
		this.keystore = keyStore;
	}

	async insert(data: CRED): Promise<boolean> {
		try {
			await this.keystore.create(data);
			return true;
		} catch (e) {
			return false;
		}
	}

	async delete(searchKey: string): Promise<boolean> {
		try {
			await this.keystore.deleteMany({
				$or: [
					{
						category: searchKey
					},
					{
						keyName: searchKey
					}
				]
			});
			return true;
		} catch (e) {
			return false;
		}
	}
}
