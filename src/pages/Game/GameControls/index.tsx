import { Button } from "../../../components";
import { useGameControls } from "../../../hooks/useGame";
import * as styles from "./style.css";

const GameControls = () => {
  const {
    handleStart,
    handlePause,
    handleResume,
    handleExit,
    isRunning,
    isPaused,
  } = useGameControls();
  return (
    <footer className={styles.footer}>
      {/* 게임 상태(isRunning, isPaused)에 따라 버튼 구성을 바꾸는 상태 기반 UI
          - 미시작: 시작하기만 표시
          - 진행 중: 일시정지 + 그만하기
          - 일시정지 중: 재개 + 그만하기 */}
      {!isRunning ? (
        <Button
          buttonType="fill"
          size="large"
          status="default"
          onClick={handleStart}
        >
          시작하기
        </Button>
      ) : (
        <>
          {!isPaused ? (
            <Button
              buttonType="soft"
              size="large"
              status="default"
              onClick={handlePause}
            >
              일시정지
            </Button>
          ) : (
            <Button
              buttonType="soft"
              size="large"
              status="default"
              onClick={handleResume}
            >
              재개
            </Button>
          )}

          <Button
            buttonType="outline"
            size="large"
            status="default"
            onClick={handleExit}
          >
            그만하기
          </Button>
        </>
      )}
    </footer>
  );
};

export default GameControls;
