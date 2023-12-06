import Table from "cli-table"
import colors from "colors"

export const printResultasTable = (data: any[]) => {
	const table = new Table({
		head: ["ID", "Key Name", "Value", "Category"],
		colWidths: calculateColumnWidths(),
		style: { head: ["green"] }
	})

	data.forEach(({ id, keyName, value, category }) => {
		table.push([id, keyName, value, colors.cyan(category)])
	})

	console.log(table.toString())
}

function calculateColumnWidths() {
	const terminalWidth = process.stdout.columns || 80
	const defaultColWidth = Math.floor(terminalWidth / 5)
	return [5, 15, defaultColWidth * 2, defaultColWidth]
}

export const printKeyToConsole = (keyName: string, value: string) => {
	const txt = `Keyname --> ${colors.blue(keyName)}  Value : ${colors.green(value)}`
	console.log(txt)
}
