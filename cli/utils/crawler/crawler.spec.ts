import { Srtucture } from "utils/types/structure.interface";
import { Crawler } from "./crawler";
import { CrawlerInterface } from "./crawler.interface";

describe("Crawler", () => {
  let crawler: CrawlerInterface;

  let json: Srtucture[];

  beforeEach(() => {
    json = require("../../dicts/structures.json");
    crawler = new Crawler(json);
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
    expect(properties).toHaveLength(7);
  });

  it("Get parents by node 4", () => {
    const properties = crawler.filterWordsByNode(4, json);
    expect(properties).toHaveLength(5);
  });

  it("No children by nodes", () => {
    const properties = crawler.filterWordsByNode(10, json);
    expect(properties).toHaveLength(0);
  });
});
