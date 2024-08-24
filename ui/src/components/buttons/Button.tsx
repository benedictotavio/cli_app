import { FunctionComponent } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick?: () => void;
  text: string;
  type?: "submit" | "reset" | "button";
  styleType?: "add" | "delete" | "edit" | "json";
};

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  text,
  type,
  styleType = "add",
}: ButtonProps) => {
  return (
    <button
      className={styles[`button_${styleType}`]}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
