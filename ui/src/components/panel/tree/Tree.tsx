import { FunctionComponent, useState } from "react";
import styles from "./Tree.module.css";
import { WordsTree } from "../../../interfaces/wordsTree.interface";
import { DataService } from "../../../services/data.services";
import Button from "../../buttons/Button";
import CloseButton from "../../buttons/CloseButton";
import Input from "../../form/Input";
import TreeNode from "./TreeNode";
import Image from "../../layout/Image";
import img_empty_box from "../../../../assets/empty_box_json.png";

interface TreeProps {
  json: WordsTree[];
  addWordToJson: (e: any) => void;
  setWord: (word: string) => void;
  word: string;
}

const Tree: FunctionComponent<TreeProps> = ({
  json,
  addWordToJson,
  setWord,
  word,
}: TreeProps) => {
  const [inputWord, setInputWord] = useState<boolean>(false);

  return (
    <div className={styles.tree}>
      {json.length > 0 ? (
        new DataService()
          .transformData(json)
          .map((node: WordsTree) => (
            <TreeNode key={node.name + node.node} node={node} />
          ))
      ) : (
        <div className={styles.tree_no_content}>
          <p>Ops! Arquivo json vazio</p>
          <Image path={img_empty_box} description="Arquivo json vazio" />
          <Button
            onClick={() => setInputWord(!inputWord)}
            text="Criar +"
            type="button"
            styleType="add"
          />

          {inputWord && (
            <form
              className={styles.form_add_no_content}
              onSubmit={addWordToJson}
            >
              <div className={styles.form_add_no_content_close}>
                <CloseButton onClick={() => setInputWord(!inputWord)} />
              </div>
              <Input
                onChange={(e) => setWord(e.target.value)}
                placeholder="Inserir palavra..."
                type="text"
                value={word}
                name="nova_palavra_no_content"
              />
              <div className={styles.form_add_no_content_submit}>
                <Button text="Adicionar" type="submit" />
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Tree;
