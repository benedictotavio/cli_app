import { DataService } from "../../src/services/data.services";

describe("Data Services", () => {
  let dataService: DataService;
  
  it("should transform a flat list into a nested tree structure when given valid input", () => {
    dataService = new DataService();
    const input = [
      { node: 1, name: "root" },
      { node: 2, name: "child1", parent: "root" },
      { node: 3, name: "child2", parent: "root" },
      { node: 4, name: "grandchild1", parent: "child1" },
    ];
    const expectedOutput = [
      {
        node: 1,
        name: "root",
        children: [
          {
            node: 2,
            name: "child1",
            parent: "root",
            children: [
              {
                node: 4,
                name: "grandchild1",
                parent: "child1",
                children: [],
              },
            ],
          },
          {
            node: 3,
            name: "child2",
            parent: "root",
            children: [],
          },
        ],
      },
    ];
    const result = dataService.transformData(input);
    expect(result).toEqual(expectedOutput);
  });
});
