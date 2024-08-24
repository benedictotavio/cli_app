import { FunctionComponent, useState } from "react";
import styles from "./FormData.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import Title from "../layout/Title";
import { WordsTree } from "../../interfaces/wordsTree.interface";
import { ListService } from "../../services/list.services";
import Modal from "../modal/Modal";
import UpFloatButton from "../buttons/UpFloatButton";
import Button from "../buttons/Button";
import { DataService } from "../../services/data.services";

interface FormDataProps {
  json: WordsTree[];
  word: string;
  setWord: (word: string) => void;
  addWordToJson: (e: any) => void;
  parent: string;
  changeSelect: (e: any) => void;
}

const FormData: FunctionComponent<FormDataProps> = ({
  json,
  setWord,
  word,
  addWordToJson,
  parent,
  changeSelect
}: FormDataProps) => {
  const service = new ListService();
  const dataService = new DataService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className={styles.panel}>
        <form className={styles.form_add} onSubmit={addWordToJson}>
          <Title text="Add WorD+" />
          <div>
            <Input
              type="text"
              placeholder="Inserir palavra..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
              name="nova_palavra"
            />
          </div>

          <div className={styles.select_section}>
            <Select
              wordsByName={service.reduceWordsByName(json)}
              changeSelect={changeSelect}
              value={parent}
              name="select_parent"
            />
          </div>

          <div className={styles.button_section}>
            <Input
              type="submit"
              value="Adicionar"
              name="submit_button"
              styleType="submit"
            />
          </div>
        </form>
      </div>
      <div className={styles.mobile_panel}>
        <UpFloatButton onClick={openModal} text="+" right={10} top={10} />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <form className={styles.form_add_mobile} onSubmit={addWordToJson}>
            <Input type="text" placeholder="Inserir palavra..." onChange={(e) => setWord(e.target.value)} name="nova_palavra" />
            <Select wordsByName={json} changeSelect={changeSelect} name={"responsive_input"} />
            <Input type="submit" value="Adicionar" name="submit_button" styleType="submit" />
            <Button onClick={() => dataService.handleCopy(json)} text="Copiar JSON" />
          </form>
        </Modal>
      </div>

    </>
  );
};

export default FormData;
