import { ChangeEvent } from "react";
import styles from "./Input.module.css";

type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  styleType?: "text" | "password" | "number" | "submit";
  name: string;
  label?: string;
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  styleType = "text",
  label,
}: InputProps): JSX.Element => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles[`input_${styleType}`]}
        name={name}
      />
      {type != "submit" ||
        (placeholder && (
          <label htmlFor={name} className={styles.form_label}>
            {label}
          </label>
        ))}
    </>
  );
};

export default Input;
