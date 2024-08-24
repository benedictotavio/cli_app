import { Srtucture } from "utils/types/structure.interface";
import { Crawler } from "./crawler";
import { CrawlerInterface } from "./crawler.interface";

describe("Crawler", () => {
  let crawler: CrawlerInterface;
  let hierarchy: object;
  let json: Srtucture[];

  beforeEach(() => {
    json = require("../../dicts/structures.json");
    crawler = new Crawler(json);
    hierarchy = {
      Animais: {
        Mamíferos: {
          Carnívoros: {
            Felinos: ["Leões", "Tigres", "Jaguars", "Leopardos"],
          },
          Herbívoros: {
            Equídeos: ["Cavalos", "Zebras", "Asnos"],
            Bovídeos: ["Bois", "Búfalos", "Antílopes", "Cabras"],
            Primatas: ["Gorilas", "Chimpanzés", "Orangotangos"],
          },
        },
        Aves: {
          Rapinas: ["Águias", "Falcões", "Corujas", "Milhafres"],
          Pássaros: ["Canários", "Papagaios", "Pardais", "Rouxinóis"],
        },
      },
    };
  });

  it("should be defined", () => {
    expect(crawler).toBeDefined();
  });

  it("Match words in phrase", () => {
    const phrase =
      "Eu vi gorilas e papagaios, alguns orangotangos e depois bois e cabras, mas depois alguns tigres";
    const properties = crawler.analyzed(phrase, 3, json);
    expect(properties).toHaveLength(3);
  });

  it("Match words in phrase with node 4", () => {
    const phrase =
      "Eu vi gorilas e papagaios, alguns orangotangos e depois bois e cabras, mas depois um tigre";
    const properties = crawler.analyzed(phrase, 4, json);
    expect(properties[0].name).toBe("Felinos");
    expect(properties[0].qty).toBe(1);
  });

  it("Get parents by node 3", () => {
    const properties = crawler.filterWordsByNode(3, json);
    expect(properties).toHaveLength(9);
  });

  it("Get parents by node 4", () => {
    const properties = crawler.filterWordsByNode(4, json);
    expect(properties).toHaveLength(5);
  });

  it("No children by nodes", () => {
    const properties = crawler.filterWordsByNode(10, json);
    expect(properties).toHaveLength(0);
  });

  it("is analyzed return an array", () => {
    const phrase = generate5000WordsPhrase(hierarchy);
    const properties = crawler.analyzed(phrase, 3, json);
    expect(Array.isArray(properties)).toBe(true);
    expect(properties).not.toBeUndefined();
  });

  it("should return a if parent exists", () => {
    const properties = crawler.isParentExists("Gorilas", json);
    expect(properties).toBe(true);
  })

  it("should return false a if parent not exists", () => {
    const properties = crawler.isParentExists("Carro", json);
    expect(properties).toBe(false);
  })
});

function generate5000WordsPhrase(hierarchy: object) {
  function buildPhrase(node: any, maxWords: number): string[] {
    const keys = Object.keys(node);
    let phrase = [];

    while (phrase.length < maxWords && keys.length > 0) {
      const key = keys[Math.floor(Math.random() * keys.length)];
      const value = node[key];

      if (Array.isArray(value)) {
        phrase.push(...value);
      } else {
        // Recursively process sub-nodes
        phrase.push(key);
        phrase.push(...buildPhrase(value, maxWords - phrase.length));
      }
    }

    return phrase;
  }

  const maxWords = 5000;
  const phraseArray: string[] = buildPhrase(hierarchy, maxWords);

  if (phraseArray.length > maxWords) {
    phraseArray.length = maxWords;
  }

  return phraseArray.join(" ");
}
