import styles from "./app.module.css";
import { RoutesDOM } from "./routes";

export function App() {
  return (
    <div className={styles.body}>
      <RoutesDOM />
    </div>
  );
}
