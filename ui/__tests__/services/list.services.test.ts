import { ListService } from "../../src/services/list.services";

describe("List Services", () => {
  let listService: ListService;
  beforeEach(() => {
    listService = new ListService();
  });

  it("reduceNodesInList", () => {
    const list = [{ node: 1 }, { node: 2 }, { node: 3 }];
    expect(listService.reduceNodesInList(list)).toEqual([1, 2, 3]);
  });

  it("filterWordsbyParent", () => {
    const list = [
      { node: 1, name: "word1", parent: "parent1" },
      { node: 2, name: "word2", parent: "parent2" },
      { node: 3, name: "word3", parent: "parent3" },
    ];
    const parent = "parent2";
    expect(listService.filterWordsbyParent(list, parent)).toEqual([
      { node: 2, name: "word2", parent: "parent2" },
    ]);
  });

  it("filterWordsbyNode", () => {
    const list = [
      { node: 1, name: "word1" },
      { node: 2, name: "word2" },
    ];
    const node = 2;
    expect(listService.filterWordsbyNode(list, node)).toEqual([
      { node: 2, name: "word2" },
    ]);
  });

  it("filterWordsbyName", () => {
    const list = [
      { node: 1, name: "word1" },
      { node: 2, name: "word2" },
    ];
    const name = "word2";
    expect(listService.filterWordsbyName(list, name)).toEqual([
      { node: 2, name: "word2" },
    ]);
  });
});
