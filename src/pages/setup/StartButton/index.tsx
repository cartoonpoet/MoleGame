import { Button } from "../../../components";
import { useSetup } from "../../../hooks/useSetup";

const StartButton = () => {
  const { handleStart } = useSetup();
  return (
    <Button
      buttonType="fill"
      status="default"
      size="medium"
      onClick={handleStart}
    >
      시작
    </Button>
  );
};

export default StartButton;
