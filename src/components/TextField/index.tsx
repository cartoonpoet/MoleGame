import type { InputHTMLAttributes } from "react";
import * as styles from "./style.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className={styles.container}>
      {label && <div className={styles.label}>{label}</div>}
      <input {...props} className={styles.input({ state: "default" })} />
    </div>
  );
};

export default TextField;
