import type { InputHTMLAttributes } from "react";
import * as styles from "./style.css";

// InputHTMLAttributes를 extends해서 type, step, onChange 등
// 표준 input 속성을 모두 그대로 사용할 수 있게 함 → 별도 prop 정의 최소화
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // optional: label 없이 input만 단독으로도 쓸 수 있음
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className={styles.container}>
      {/* label이 있을 때만 렌더 → label prop을 생략해도 레이아웃이 무너지지 않음 */}
      {label && <div className={styles.label}>{label}</div>}
      <input {...props} className={styles.input({ state: "default" })} />
    </div>
  );
};

export default TextField;
