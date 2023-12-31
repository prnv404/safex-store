import * as crypto from "node:crypto"
import { Credential } from "../types"
import { CONFIG } from "../config"

export const encrypt = (text: string, secretKey: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			let key = crypto.createHash("sha256").update(String(secretKey)).digest("base64").substr(0, 32)

			const iv = crypto.randomBytes(16)
			const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv)
			let encrypted = cipher.update(text, "utf-8", "hex")
			encrypted += cipher.final("hex")
			return resolve(`${iv.toString("hex")}:${encrypted}`)
		} catch (e) {
			reject(e)
		}
	})
}

export const decrypt = (text: string, secretKey: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			let key = crypto.createHash("sha256").update(String(secretKey)).digest("base64").substr(0, 32)
			const [iv, encryptedText] = text.split(":")
			const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.from(iv, "hex"))
			let decrypted = decipher.update(encryptedText, "hex", "utf-8")
			decrypted += decipher.final("utf-8")
			return resolve(decrypted)
		} catch (e) {
			reject(e)
		}
	})
}

export const decryptAllKey = async (keys: Credential[]) => {
	return await Promise.all(
		keys.map(async (item) => {
			item.value = await decrypt(item.value, CONFIG.encryptionKey!)
			return item
		})
	)
}
