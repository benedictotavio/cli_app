import fs from "fs-extra";
import { JsonManagerInterface, JsonObject } from "./json.interface";

export class JsonManager implements JsonManagerInterface {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /**
   * Inserts a JSON object into the JSON file containing an array of objects.
   *
   * @param newObject - The JSON object to insert.
   */
  async insert(newObject: JsonObject): Promise<string> {
    try {
      const data = await fs.readJson(this.filePath);
      if (!Array.isArray(data)) {
        throw new Error("The existing JSON structure is not an array.");
      }
      data.push(newObject);
      await fs.writeJson(this.filePath, data, { spaces: 2 });
      return "JSON object inserted successfully.";
    } catch (error: any) {
      throw new Error(`Failed to insert JSON object: ${error.message}`);
    }
  }
}
