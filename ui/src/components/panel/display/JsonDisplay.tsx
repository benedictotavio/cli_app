import React from "react";
import { WordsTree } from "../../../interfaces/wordsTree.interface";
import styles from "./JsonDisplay.module.css";
import { DataService } from "../../../services/data.services";

interface JsonDisplayProps {
  data: WordsTree[];
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({
  data,
}: JsonDisplayProps) => {

  const service = new DataService();
  return (
    <div className={styles.json_display}>
      <div className={styles.button_section}>
        <button onClick={() => service.handleCopy(data)}>Copy</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JsonDisplay;
