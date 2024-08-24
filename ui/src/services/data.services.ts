import { WordsTree } from "../interfaces/wordsTree.interface";

export class DataService {
  private root: WordsTree[] = [];

  public transformData(data: WordsTree[]) {
    const nodesMap = new Map();

    // Create a map of nodes
    data.forEach((item) => {
      nodesMap.set(item.name, { ...item, children: [] });
    });

    // Link parent nodes with their children
    data.forEach((item) => {
      if (item.parent) {
        const parent = nodesMap.get(item.parent);
        const child = nodesMap.get(item.name);
        if (parent) {
          parent.children.push(child);
        }
      } else {
        this.root.push(nodesMap.get(item.name));
      }
    });

    return this.root;
  }

  public handleCopy(data: WordsTree[]) {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(
      () => {
        window.alert("JSON Copiado com sucesso!");
      },
      (err) => {
        window.alert("Erro ao copiar JSON: " + err.message);
      }
    );
  }
}
