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
    // 클릭 이벤트를 컨테이너 전체에 걸어 구멍 영역 어디서든 클릭 가능하게 함
    <div className={styles.moleContainer} onClick={handleMoleClick}>
      {/* 배경 구멍 이미지 */}
      <picture className={styles.holeSection}>
        {/* WebP를 먼저 시도하고, 지원하지 않는 브라우저는 PNG로 폴백
            WebP가 PNG 대비 약 25~34% 작아 이미지 로딩 성능이 향상됨 */}
        <source srcSet={HoleImageWebp} type="image/webp" />
        <img
          src={HoleImage}
          alt="hole"
          className={styles.hole}
          draggable={false} // 이미지를 드래그해서 끌고 다니는 것을 막아 UX 개선
        />
      </picture>
      {/* 두더지 이미지: hidden 속성으로 표시/숨김 제어
          조건부 렌더링(&&)이 아닌 hidden을 쓰는 이유:
          마운트/언마운트 없이 DOM을 유지하므로 토글 시 깜빡임이 없고 렌더링 비용이 적음 */}
      <picture className={styles.moleSection} hidden={!isMoleVisible}>
        <source srcSet={MoleImageWebp} type="image/webp" />
        <img
          src={MoleImage}
          alt="mole"
          className={styles.hole}
          draggable={false}
        />
      </picture>
      {/* 덮개 구멍 이미지: 두더지 위에 겹쳐서 "구멍에서 올라오는" 시각 효과를 연출 */}
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

// React.memo로 감싼 이유: 두더지가 많을 때 한 구멍의 상태가 바뀌어도
// isMoleVisible과 handleMoleClick이 변하지 않은 나머지 Mole 컴포넌트는 리렌더되지 않음
export default React.memo(Mole);
