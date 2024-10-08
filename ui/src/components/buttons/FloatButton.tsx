import { FunctionComponent } from "react";
import styles from "./FloatButton.module.css";
import json_icon from "../../../assets/code.png";

interface JsonButtonProps {
  onClick: () => void;
  text: string;
  right?: number;
  top?: number;
  left?: number;
  bottom?: number;
}

const JsonButton: FunctionComponent<JsonButtonProps> = ({
  onClick,
  text,
  right,
  top,
  left,
  bottom,
}: JsonButtonProps) => {
  return (
    <button
      style={{ right: right + "px", top: top + "px", left: left + "px", bottom: bottom + "px" }}
      className={styles.json_button}
      onClick={onClick}>
      {text} JS<img src={json_icon} alt="json" />N
    </button>
  );
};

export default JsonButton;
