import { FC } from "react";
import styles from "./ErrorData.module.scss";

const ErrorData: FC = () => {
  return (
    <div className={styles.octagonWrap}>
      <div className={styles.octagon}></div>
      <p className={styles.title}>ERROR</p>
    </div>
  );
};
export default ErrorData;
