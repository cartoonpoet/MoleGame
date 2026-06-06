import * as styles from "./style.css";

// buttonType/status/size를 분리한 이유: 디자인 시스템 관점에서
// 시각적 스타일(fill/outline/soft), 상태(default/disabled), 크기를 독립적으로 조합 가능하게 함
// 각각 독립 조합이 가능하므로 버튼 variant마다 별도 컴포넌트를 만들지 않아도 됨
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: "fill" | "outline" | "soft";
  status: "default" | "disabled" | "subtle";
  size: "small" | "medium" | "large";
}

const Button = ({
  children,
  buttonType,
  status,
  size,
  ...props // onClick, disabled 등 나머지 HTML 속성을 그대로 전달 → 확장성 확보
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={styles.button({
        type: buttonType,
        status,
        size,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
