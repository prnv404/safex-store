import fs from "node:fs/promises";

enum CONSTANTS {
  FILEPATH = "./database.json",
}

type envData = {
  [key: string]: string;
};

const appendData = async function (data: envData) {
  const rawData = await fs.readFile(CONSTANTS.FILEPATH, "utf-8");
  const fileData = JSON.parse(rawData) as envData;
  Object.assign(fileData, data);
  const updatedData = JSON.stringify(fileData);
  await fs.writeFile(CONSTANTS.FILEPATH, updatedData, "utf-8");
};

