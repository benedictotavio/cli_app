import { FunctionComponent } from "react";
import styles from "./Title.module.css";

type TitleProps = {
  text: string;
};

const Title: FunctionComponent<TitleProps> = ({ text }: TitleProps) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default Title;
