import Option from "./Option";
import StartButton from "./StartButton";
import * as styles from "./style.css";

const Setup = () => {
  return (
    <div className={styles.layout}>
      <Option label="행" name="row" />
      <Option label="열" name="col" />
      <Option label="두더지" name="mole" />
      <section className={styles.buttonContainer}>
        <StartButton />
      </section>
    </div>
  );
};

export default Setup;
