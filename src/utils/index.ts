import mongoose from "mongoose"

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

export * from "./custom.adapter"

