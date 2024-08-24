export interface JsonObject {
  [key: string]: any;
}

export interface JsonManagerInterface {
  insert(newObject: JsonObject): Promise<string>;
  show(): Promise<string>;
}
