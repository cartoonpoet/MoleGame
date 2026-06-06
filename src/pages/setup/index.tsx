import Option from "./Option";
import StartButton from "./StartButton";
import * as styles from "./style.css";

// <form> 태그 없이 div로 구성한 이유:
// 입력값이 변경될 때마다 Zustand store에 즉시 반영되므로 "제출"이라는 개념이 없음
// 시작 버튼 클릭 = 유효성 검사 후 페이지 이동이지, form submit이 아님
// → <form onSubmit>이나 <form action>을 쓸 경우 오히려 불필요한 submit 이벤트 처리가 생김
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
