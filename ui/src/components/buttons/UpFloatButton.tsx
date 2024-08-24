import { FunctionComponent } from "react";
import styles from "./UpFloatButton.module.css";

interface UpFloatButtonProps {
  onClick: () => void;
  text: string;
  right?: number;
  top?: number;
  left?: number;
  bottom?: number;
}

const UpFloatButton: FunctionComponent<UpFloatButtonProps> = ({
  onClick,
  text,
  right,
  top,
  left,
  bottom
}: UpFloatButtonProps) => {
  return (
    <button
      style={{ right: right + "px", top: top + "px", left: left + "px", bottom: bottom + "px" }}
      className={styles.up_float_button}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default UpFloatButton;
