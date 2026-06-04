import MoleImage from "../../../assets/image/mole.png";
import MoleImageWebp from "../../../assets/image/mole.webp";
import HoleImage from "../../../assets/image/hole.png";
import HoleImageWebp from "../../../assets/image/hole.webp";
import * as styles from "./style.css";
import React from "react";

interface MoleProps {
  isMoleVisible: boolean;
  handleMoleClick: () => void;
}

const Mole = ({ isMoleVisible, handleMoleClick }: MoleProps) => {
  return (
    <div className={styles.moleContainer} onClick={handleMoleClick}>
      {/* 땅굴 */}
      <picture className={styles.holeSection}>
        <source srcSet={HoleImageWebp} type="image/webp" />
        <img
          src={HoleImage}
          alt="hole"
          className={styles.hole}
          draggable={false}
        />
      </picture>
      {/* 두더지 */}
      <picture className={styles.moleSection} hidden={!isMoleVisible}>
        <source srcSet={MoleImageWebp} type="image/webp" />
        <img
          src={MoleImage}
          alt="mole"
          className={styles.hole}
          draggable={false}
        />
      </picture>
      {/* 땅굴 (덮개)*/}
      <picture className={styles.holeCover}>
        <source srcSet={HoleImageWebp} type="image/webp" />
        <img
          src={HoleImage}
          alt="hole"
          className={styles.hole}
          draggable={false}
        />
      </picture>
    </div>
  );
};

export default React.memo(Mole);
