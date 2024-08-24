import { Result } from "../types/result.interface";
import { Srtucture } from "../types/structure.interface";

export interface CrawlerInterface {
  filterWordsByNode(node: number, json: Srtucture[]): Srtucture[];
  analyzed(phrase: string, node: number, json?: Srtucture[]): Result[];
  getLoadPhraseProcessing(): number
  getLoadParamsProcessing(): number
  isParentExists(name: string, json: Srtucture[]): boolean
}
