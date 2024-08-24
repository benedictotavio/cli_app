import { FunctionComponent } from "react";
import styles from "./Image.module.css";

interface ImageProps {
  path: string;
  description: string;
}

const Image: FunctionComponent<ImageProps> = ({ path, description }: ImageProps) => {
  return <img src={path} alt={description} className={styles.logo} />;
};

export default Image;
