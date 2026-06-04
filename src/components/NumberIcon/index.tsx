import * as styles from "./style.css";

const NumberIcon = ({ num }: { num: number }) => {
  return <span className={styles.numberIcon}>{num}</span>;
};

export default NumberIcon;
