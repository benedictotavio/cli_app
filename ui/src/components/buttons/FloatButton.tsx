import { FunctionComponent } from "react";
import styles from "./FloatButton.module.css";
import json_icon from "../../../assets/code.png";

interface JsonButtonProps {
  onClick: () => void;
  text: string;
}

const JsonButton: FunctionComponent<JsonButtonProps> = ({
  onClick,
  text,
}: JsonButtonProps) => {
  return (
    <button className={styles.json_button} onClick={onClick}>
      {text} JS<img src={json_icon} alt="json" />N
    </button>
  );
};

export default JsonButton;
