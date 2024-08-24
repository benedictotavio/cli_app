import React from "react";
import { WordsTree } from "../../interfaces/wordsTree.interface";
import styles from "./JsonDisplay.module.css";

interface JsonDisplayProps {
  data: WordsTree[];
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({
  data,
}: JsonDisplayProps) => {
  const handleCopy = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(
      () => {
        alert("JSON copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy JSON: " + err);
      }
    );
  };

  return (
    <div className={styles.json_display}>
      <div className={styles.button_section}>
        <button onClick={handleCopy}>Copy</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JsonDisplay;
