import { useState } from "react";
import styles from "./Panel.module.css";
import { ListService } from "../../services/list.services";
import { WordsTree } from "../../interfaces/wordsTree.interface";
import TreeNode from "./tree/TreeNode";
import db from "../../../dicts/structures.json";
import { DataService } from "../../services/data.services";
import Modal from "../modal/Modal";
import JsonDisplay from "./JsonDisplay";
import Button from "../buttons/Button";

const Panel = () => {
  const [word, setWord] = useState("");
  const [parent, setParent] = useState("");
  const [node, setNode] = useState(0);
  const [json, setJson] = useState<WordsTree[]>(db);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const service = new ListService();

  const addWordToJson = (e: any) => {
    console.log(word, parent, node);
    e.preventDefault();
    setJson([...json, { name: word, parent: parent, node: node }]);
    setWord("");
    setParent("");
    setNode(0);
  };

  const changeSelect = (e: any) => {
    setParent(e.target.value);
    setNode(service.filterWordsbyName(json, e.target.value)[0].node + 1);
  };

  return (
    <>
      <div className={styles.panel}>
        <form className={styles.form_add} onSubmit={addWordToJson}>
          <h1>Add Word</h1>
          <div>
            <input
              type="text"
              placeholder="Inserir palavra..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>

          <div>
            <select
              name="parent"
              id="parent"
              value={parent}
              onChange={changeSelect}
            >
              {service.reduceWordsByName(json).map((item: any) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.button_section}>
            <div>
              <input type="submit" value="Adicionar" />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.tree}>
        {new DataService().transformData(json).map((node: WordsTree) => (
          <TreeNode key={node.name + node.node} node={node} />
        ))}
      </div>
      <div className={styles.button_section}>
        <Button onClick={openModal} text="Download JSON"/>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JsonDisplay data={json} />
      </Modal>
    </>
  );
};

export default Panel;
