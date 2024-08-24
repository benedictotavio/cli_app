import { Srtucture } from "../types/structure.interface";
import { CrawlerInterface } from "./crawler.interface";
import { Result } from "../types/result.interface";

export class Crawler implements CrawlerInterface {
  private database: Srtucture[];
  private filteredWords: Srtucture[];
  private analyzedMap: Result[];
  private laodPhraseProcessing: number;
  private loadParamsProcessing: number;

  constructor(database: Srtucture[]) {
    this.database = database;
    this.analyzedMap = [];
    this.filteredWords = [];
    this.laodPhraseProcessing = 0;
    this.loadParamsProcessing = 0;
  }
  public isParentExists(name: string, json: Srtucture[]): boolean {
    return json.some((word) => word.name === name);
  }

  public analyzed(phrase: string, node: number): Result[] {
    let start = performance.now();
    this.filteredWords = this.filterWordsByNode(node);
    this.analyzedMap = this.countParentsByPhrase(phrase, this.filteredWords);
    this.loadParamsProcessing = performance.now() - start;
    return this.analyzedMap;
  }

  public filterWordsByNode(node: number): Srtucture[] {
    return this.database.filter((word) => word.node == node);
  }

  private normalizeString(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  private countParentsByPhrase(phrase: string, words: any[]): Result[] {
    let start = performance.now();

    const normalizedPhrase = this.normalizeString(phrase);

    const parentCount: Record<string, number> = {};

    for (const word of words) {
      const normalizedWord = this.normalizeString(word.name);

      // Create a regular expression to match the word
      const wordRegex = new RegExp(`\\b${normalizedWord}\\b`, "gi");

      // Check if the word exists in the normalized phrase
      if (wordRegex.test(normalizedPhrase)) {
        // Increment the count for the parent category
        if (parentCount[word.parent]) {
          parentCount[word.parent]++;
        } else {
          parentCount[word.parent] = 1;
        }
      }
      let timeTaken = performance.now() - start;
      this.laodPhraseProcessing = timeTaken;
    }

    // Convert the parent count map to an array of objects
    return Object.keys(parentCount).map((parent) => ({
      name: parent,
      qty: parentCount[parent],
    }));
  }

  public getLoadPhraseProcessing() {
    return this.laodPhraseProcessing;
  }

  getLoadParamsProcessing(): number {
    return this.loadParamsProcessing;
  }
}
