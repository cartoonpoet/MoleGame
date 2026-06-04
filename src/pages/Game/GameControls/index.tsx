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
