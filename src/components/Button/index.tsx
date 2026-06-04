import * as styles from "./style.css";

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
  ...props
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
