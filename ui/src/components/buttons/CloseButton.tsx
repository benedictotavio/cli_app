import { FunctionComponent } from "react";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({
  onClick,
}: CloseButtonProps) => {
  return (
    <button className={styles.close_button} onClick={onClick}>
      X
    </button>
  );
};

export default CloseButton;
