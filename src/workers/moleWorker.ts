let running = false;
let sec = 60; // 기본값

const randomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getVisibleTime = () => {
  // sec이 적을수록 더 짧게
  const totalTime = 60;
  const minVisibleTime = 500; // ms
  const maxVisibleTime = 1500; // ms
  const ratio = Math.max(0, Math.min(1, sec / totalTime));
  return Math.round(minVisibleTime + (maxVisibleTime - minVisibleTime) * ratio);
};

const loop = () => {
  if (!running) return;

  // 두더지 출현
  postMessage({ type: "show" });
  setTimeout(() => {
    // 두더지 사라짐
    postMessage({ type: "hide" });
    setTimeout(loop, randomDelay(500, 2000)); // 다음 출현까지 대기
  }, getVisibleTime()); // 출현 시간
};

onmessage = function (e) {
  if (e.data === "start") {
    running = true;
    loop();
  } else if (e.data === "stop") {
    running = false;
  } else if (typeof e.data === "object" && e.data.sec !== undefined) {
    sec = e.data.sec;
  }
};
