import { FunctionComponent } from "react";
import styles from "./Select.module.css";

type SelectProps = {
  wordsByName: any[];
  value?: string;
  changeSelect: (e: any) => void;
  name: string;
};

const Select: FunctionComponent<SelectProps> = ({
  wordsByName,
  value,
  changeSelect,
  name,
}: SelectProps) => {
  return (
    <div className={styles.select_section}>
      <label htmlFor={name}>
        <p>Selecione a palavra pai</p>
      </label>
      <select
        name={name}
        id="parent"
        value={value}
        onChange={changeSelect}
        onSelect={changeSelect}
        onFocus={changeSelect}
        disabled={wordsByName.length === 0}
      >
        {wordsByName.map((item: any) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
