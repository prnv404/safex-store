#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = await yargs(hideBin(process.argv))
	.option("search", {
		alias: "s",
		describe: "",
		type: "string"
	})
	.option("category", {
		alias: "c",
		describe: "",
		demandOption: true,
		default: "default",
		type: "string"
	})
	.parse();

	argv