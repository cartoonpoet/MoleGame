// Web Worker: 메인 스레드와 완전히 분리된 환경에서 실행
// 두더지 등장/소멸 타이밍 계산을 여기서 처리함으로써 게임 UI(렌더링, 이벤트)가 차단되지 않음

let running = false;
let sec = 60; // 게임 타이머와 동기화된 남은 시간

const randomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 남은 시간에 따라 두더지가 보이는 시간을 동적으로 조절
// 시간이 많을수록 오래(최대 1.5초) 보이고, 시간이 없을수록 짧게(최소 0.5초) 보임
// → 게임 후반부로 갈수록 자연스럽게 난이도가 올라가는 효과
const getVisibleTime = () => {
  const totalTime = 60;
  const minVisibleTime = 500; // ms
  const maxVisibleTime = 1500; // ms
  // ratio: 0(시간 없음) ~ 1(시간 많음) 사이의 값
  const ratio = Math.max(0, Math.min(1, sec / totalTime));
  return Math.round(minVisibleTime + (maxVisibleTime - minVisibleTime) * ratio);
};

const loop = () => {
  if (!running) return;

  // 메인 스레드에 "show" 메시지를 보내 두더지를 화면에 표시
  postMessage({ type: "show" });
  setTimeout(() => {
    // 보여준 후 일정 시간이 지나면 "hide" 메시지로 숨김
    postMessage({ type: "hide" });
    // 다음 등장까지 0.5~2초 랜덤 대기 → 규칙적이지 않아야 게임이 재미있음
    setTimeout(loop, randomDelay(500, 2000));
  }, getVisibleTime());
};

onmessage = function (e) {
  if (e.data === "start") {
    running = true;
    loop();
  } else if (e.data === "stop") {
    running = false;
  } else if (typeof e.data === "object" && e.data.sec !== undefined) {
    // 메인 스레드에서 매 초마다 현재 sec를 전달받아 워커 내부 변수를 갱신
    // → getVisibleTime()이 항상 최신 남은 시간 기준으로 동작하게 됨
    sec = e.data.sec;
  }
};
