import styles from "./Button.module.css";

interface JsonButtonProps {
  onClick: () => void;
  text: string;
}

const JsonButton = ({ onClick, text }: JsonButtonProps) => {
  return (
    <button className={styles.json_button} onClick={onClick}>
      {text}
    </button>
  );
};

export default JsonButton;
