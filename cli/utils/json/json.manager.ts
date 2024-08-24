import fs from "fs-extra";
import { JsonManagerInterface, JsonObject } from "./json.interface";
import { CrawlerInterface } from "utils/crawler/crawler.interface";

export class JsonManager implements JsonManagerInterface {
  private filePath: string;
  private crawler: CrawlerInterface;

  constructor(filePath: string, crawler: CrawlerInterface) {
    this.filePath = filePath;
    this.crawler = crawler;
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
        throw new Error("arquivo JSON vazio.");
      }

      if (!this.crawler.isParentExists(newObject.parent, data)) {
        throw new Error(
          `A palavra pai "${newObject.parent}" não existe no objeto JSON.`
        );
      }

      data.push(newObject);
      await fs.writeJson(this.filePath, data, { spaces: 2 });
      return "Objeto inserido com sucesso.";
    } catch (error: any) {
      throw new Error(`Falha ao inserir objeto JSON: ${error.message}`);
    }
  }

  /**
   * Shows all objects in the JSON file.
   */
  async show(): Promise<string> {
    try {
      const data = await fs.readJson(this.filePath);
      return JSON.stringify(data, null, 2);
    } catch (error: any) {
      throw new Error(`Failed to show JSON objects: ${error.message}`);
    }
  }
}
