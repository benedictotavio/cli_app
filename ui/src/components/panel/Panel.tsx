import { useState } from "react";
import { ListService } from "../../services/list.services";
import { WordsTree } from "../../interfaces/wordsTree.interface";
import db from "../../../dicts/structures.json";
import FloatButton from "../buttons/FloatButton";
import Tree from "./tree/Tree";
import Modal from "../modal/Modal";
import JsonDisplay from "./display/JsonDisplay";
import FormData from "../form/FormData";

const Panel = () => {
  const [word, setWord] = useState("");
  const [parent, setParent] = useState("");
  const [node, setNode] = useState(0);
  const [json, setJson] = useState<WordsTree[]>(db as WordsTree[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const service = new ListService();

  const addWordToJson = (e: any) => {
    if (word === "" && parent === "") {
      window.alert("Preencha todos os campos");
      return;
    }
    e.preventDefault();

    if (json.length === 0) {
      setJson([{ name: word, parent: "", node: 0 }]);
      setParent(word);
      setNode(0);
      setWord("");
      return;
    }

    setJson([...json, { name: word, parent: parent, node: node + 1 }])
    setParent(word);
    setWord("");
    setNode(node + 1);
  };

  const changeSelect = (e: any) => {
    setParent(e.target.value);
    setNode(service.filterWordsbyName(json, e.target.value)[0].node);
  };

  return (
    <>
      <FormData
        json={json}
        setWord={setWord}
        word={word}
        addWordToJson={addWordToJson}
        parent={parent}
        changeSelect={changeSelect}
      />
      <Tree
        json={json}
        addWordToJson={addWordToJson}
        setWord={setWord}
        word={word}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JsonDisplay data={json} />
      </Modal>
      <FloatButton onClick={openModal} text="Download" />
    </>
  );
};

export default Panel;
