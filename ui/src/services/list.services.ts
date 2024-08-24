import { WordsTree } from "../interfaces/wordsTree.interface";

export class ListService {
  public reduceNodesInList = (list: any[]): number[] => {
    return list.reduce((acc: any, item: any) => {
      if (acc.includes(item.node)) return acc;
      else {
        acc.push(item.node);
        return acc;
      }
    }, []);
  };

  public filterWordsbyParent = (list: any[], parent: string): WordsTree[] => {
    return list.filter((item) => item.parent === parent);
  };

  public filterWordsbyNode = (list: any[], node: number): WordsTree[] => {
    return list.filter((item) => item.node === node);
  };

  public filterWordsbyName = (list: any[], name: string): WordsTree[] => {
    return list.filter((item) => item.name === name);
  };

  public reduceWordsByName = (
    list: any[]
  ): { name: string; node: number }[] => {
    return list.reduce((acc: any, item: any) => {
      if (acc.includes(item.name)) return acc;
      else {
        acc.push({ name: item.name, node: item.node, parent: item.parent });
        return acc;
      }
    }, []);
  };
}
