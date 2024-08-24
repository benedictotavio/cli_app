import { FunctionComponent } from "react";
import styles from "./FloatButton.module.css";

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
      {text}
    </button>
  );
};

export default JsonButton;
