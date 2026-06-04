# 두더지 게임

## 기술스택

| 종류            | 선정 이유                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vanilla-Extract | 타입 안전성과 모듈화된 스타일링 제공, 애니메이션이 있어 렌더링시 성능 이점을 조금이라도 더 가져가기 위해 제로런타임 라이브러리를 선택, 지속적인 애니메이션으로 최적이라고 판단 |
| Zustand         | 전역 상태 관리의 편의성, 선택적 구독으로 불필요한 렌더링 최소화                                                                                                                |
| Immer           | 불변성을 자동으로 지켜져 코드가 훨씬 간결하고, 가독성이 좋아짐. 클린코드 지향                                                                                                  |

## 컨벤션 및 브랜치 전략

### Git Branch

```
- main (배포용)
- feat/#issue/기능명 (작업용)
```

### Commit Convention

기능 키워드: 커밋 내용

| Commit Type | Description                                             |
| ----------- | ------------------------------------------------------- |
| ✨ feat     | 새로운 기능 추가                                        |
| 🐞 fix      | 버그 수정                                               |
| 📦 chore    | 빌드 업무, 패키지 매니저, 라이브러리, dependencies 설정 |
| 📝 docs     | 문서 수정 - ex) README.md                               |
| 🎨 design   | 사용자 UI 디자인 변경 - ex) CSS                         |
| 💄 style    | 기능 수정 없는 코드 스타일 변경                         |
| ♻️ refactor | 코드 리팩토링                                           |
| 📝 test     | 테스트 코드, 리팩토링 테스트 코드 추가                  |
| 🪄 perf     | 성능 개선                                               |
| 🛠️ rename   | 파일 혹은 폴더명 변경                                   |
| ⚙️ init     | 초기 세팅                                               |

### Folder & File Name Convention

- 폴더명: camelCase
- 파일명: 기본적으로 camelCase, 단, 컴포넌트 파일명만 PascalCase

### Coding Convention

#### Components

- 리액트 컴포넌트: PascalCase
- 컴포넌트의 타입: ~Props `interface MainProps {}`
- type, d.ts, ts파일: camelCase
- props 명: camelCase
- 의미없는 div 또는 컴포넌트 최상단은 fragment 사용
- children이 불필요할 땐 selfClosing 사용 `<Component/>`

#### Type

- 파스칼 케이스 (interface든 type이든)
- props의 타입명은 OOOProps
- type 사용시, OOOTypes
- intersection union으로 합칠 때 type 사용: PascalCase 사용 (Ex. `type SizeTypes = 's' | 'm'`)

### Variable

- var 금지
- `const` -> `let` 순서로 위부터 선언
- 상수는 영문 대문자 스네이크케이스: `API_KEY`
- 변수명: 의미를 나타낼 수 있도록
  - 예시: 배열에 Arr 보다는 변수s = fruits, userlists 등등
- 만약 변수에 할당되는 값이 Boolean의 경우 is 혹은 has 접두사 붙임.
- map 사용시 변동되는 리스트라면 key 값 고유하게 (index X)

### Function

- 화살표 함수 사용
- 함수명: 어떤일을 하는지 명확히 묘사. 동사+명사의 형식
  - `get`: 어떤 값을 얻는 함수
  - `create`: 갖고 있는 변수를 활용하여, 새로운 값과 변수 생성
  - `check`: 함수 안의 로직 확인
  - 그외, 기능을 분명하게 네이밍
  - 이벤트 핸들링 함수에는 `handle` 붙이기
- 중복함수는 utils 폴더에 모아서 재사용

### Style

- 최대한 시맨틱 태그 잘 활용하기.

## 폴더 구조

```
src/
├── assets/        # 이미지 등 정적 리소스
├── components/    # 재사용 가능한 UI 컴포넌트(Button, TextField 등)
├── constants/     # 상수, URL 등 공통 값 관리
├── hooks/         # 커스텀 훅
├── pages/         # 라우트별 페이지(Setup, Game, GameResult, Ranking 등)
├── routes/        # 라우팅 설정
├── store/         # Zustand 전역 상태 관리
├── style/         # 전역 스타일, CSS-in-JS
├── utills/        # 유틸 함수
├── workers/       # Web Worker로 동작하는 로직
```

## 구현 내역

### 1. 게임 준비 화면

1. 두더지 굴을 표시할 열과 행 개수 입력 UI

- 열과 행은 2~6 사이의 숫자만 입력 가능

2. 출현할 두더지의 마릿수 입력 UI

- 최소 1마리부터 전체 굴 개수의 절반 미만까지
  - 예) 3x3 경우, 4마리 가능, 4x4 경우, 7마리 가능

3. 시작 버튼 추가시 게임 화면 전환

### 2. 게임화면

1. 입력된 행과 열 수 만큼 두더지 굴 배치

- 출현 가능한 두더지 수는 입력값 기반으로 하며, 1초마다 랜덤하게 출현여부 판단
- 나타난 두더지 클릭시 즉시 땅속으로 숨기며 점수 증가
- 두더지 등장 애니메이션 추가
- 남은 시간에 비례해서 두더지 등장시간 감소

2. 화면 상단에 남은 시간과 점수 표시

- 게임 60초 동안 진행하며, 0초가 되면 즉시 결과 화면으로 이동
- 두더지 잡을 때 마다 1점 증가

3. 화면 하단에 시작하기, 게임 중단, 게임 재개, 그만하기 버튼 제공

- 시작하면 타이머가 동작하며 두더지 등장 로직 작동
- 게임 중단시 타이머, 두더지 등장 중지
- 게임 재개시 타이머, 두더지 등장 로직 재개
- 그만하기시 해당 UI Unmount하며 초기 화면으로 이동

### 3. 게임 결과

1. 두더지를 잡아 획득한 점수 화면에 표시
2. 다시하기, 처음, 랭킹 버튼 제공

- 다시하기 클릭시 유저가 입력한 설정을 유지한채로 게임 화면으로 이동
- 처음 클릭시 초기 화면으로 이동
- 랭킹 클릭시 랭킹 버튼 화면으로 이동

### 4. 랭킹

1. 랭킹 화면 추가
2. 게임 점수 기준으로 내림차순 정렬 및 플레이 시각 기록
3. 랭킹 표시시 난이도에 기반하여 랭킹 반영

- 랭킹 높은 기준: 1순위(행/열, 두더지 수), 2순위(행/열이 큰수), 3순위(두더지가 많은 수)

4. 순위 초기화, 돌아가기 버튼 제공

- 초기화시 현재 랭킹에 기록되어 있는 데이터 초기화
- 돌아가기시 게임 결과 화면으로 이전

### UX

- 남은 시간이 10초이하가 되면 남은 시간이 빨간색으로 하이라이트로 애니메이션 처리

### 성능 개선

#### 렌더링

- zustand를 사용하여 선택적 구독으로 필요한 값만 참조
- 페이지 내 섹션을 분리하여 각 섹션마다 커스텀 훅을 개발
  - 남은 시간, 게임 보드, 점수 부분 렌더링 되게 개선함.
    - 남은 시간: 카운트 다운시
    - 게임 보드: 두더지 등장시, 사용자가 클릭시
    - 점수: 사용자가 두더지 잡을시

#### 타이머

- 문제점: 오차를 최소화한 타이머 구현
  - 기존의 setInterval 방식은 자바스크립트 이벤트 루프 특성상 콜백이 정확히 원하는 시점에 실행되지 않고, 콜스택이 바쁠경우 지연이 누적되어 오차가 발생할 수 있음.
  - 오차를 최소화하기 위해 실제 경과시간을 기준으로 타이머를 보정하는 방식 필요
- 적용 방식: requestAnimationFrame와 Date.now()를 조합하여 1초가 실제로 경과했는지 체크하고, 1초가 지날때마다 게임 타이머를 감소시키는 구조로 구현.
  - requestAnimationFrame는 브라우저의 렌더링 주기와 동기화되어 불필요한 오차 누적을 방지함.

```ts
useEffect(() => {
  if (!isRunning || isPaused) return;
  lastTickTime.current = Date.now();

  const tickRaf = () => {
    const now = Date.now();
    if (now - lastTickTime.current >= 1000) {
      tick();
      lastTickTime.current += 1000;
    }
    if (sec > 0) {
      rafId.current = requestAnimationFrame(tickRaf);
    }
  };
  rafId.current = requestAnimationFrame(tickRaf);

  return () => {
    if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
  };
}, [tick, sec, isRunning, isPaused]);
```

- 효과
  - 시간 오차 문제 최소화
  - 사용자 경험 및 게임 공정성 향상

#### 두더지 제어

- **문제점**

  - 메인 스레드에서 타이머, 두더지 출현/제어, 사용자 이벤트, 렌더링 등 모든 연산이 집중될 경우, 프리징이나 렉이 발생할 수 있음.
  - setInterval/setTimeout 기반의 단일 타이머/로직은 두더지 출현 타이밍이 일괄적이고 예측 가능해져 게임의 재미가 떨어짐.
  - 남은 시간(sec)에 따른 난이도 동적 조절이 어렵고, 두더지 출현/사라짐 타이밍이 자연스럽지 않음.
  - 두더지 출현/사라짐 로직 모듈화 필요.

- **해결방안**

  - 각 구멍마다 별도의 Web Worker(`moleWorker.ts`)를 생성하여 두더지 출현/사라짐을 독립적으로 관리함.
    - 메인(React)은 각 워커로부터 메시지를 받아 `isMoleVisible` 배열 상태를 업데이트.
    - 워커는 'show' 메시지로 두더지 등장, 'hide' 메시지로 두더지 사라짐을 알림.
    - 최대 등장 마릿수(`maxMoleCount`)를 초과하지 않도록 메인에서 제어. (최소 1마리 ~ 최대 maxMoleCount마리까지 등장 가능)
  - 워커는 남은 시간(`sec`)을 전달받아, 시간이 줄수록 두더지 등장 시간이 짧아지도록 동적으로 조절함(`getVisibleTime()` 함수).
  - 게임 시작/일시정지/종료/화면 이탈 시 워커를 생성·종료하여 리소스를 효율적으로 관리.
  - 게임 타이머(`sec`)가 변경될 때마다 모든 워커에 sec 값을 브로드캐스트하여 난이도 변화에 실시간 대응.

  - **핵심 코드 예시**
    - 메인에서 워커 메시지 처리:
      ```ts
      const handleWorkerMessage = (idx: number, e: MessageEvent) => {
        setIsMoleVisible((prev) => {
          const activeCount = prev.filter(Boolean).length;
          if (e.data.type === "show") {
            if (activeCount >= maxMoleCount || prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          } else if (e.data.type === "hide") {
            if (!prev[idx]) return prev;
            const next = [...prev];
            next[idx] = false;
            return next;
          }
          return prev;
        });
      };
      ```
    - 워커에서 등장/사라짐 및 난이도 조절:
      ```ts
      const getVisibleTime = () => {
        const totalTime = 60;
        const minVisibleTime = 500; // 최소 등장 시간
        const maxVisibleTime = 1500; // 최대 등장 시간
        const ratio = Math.max(0, Math.min(1, sec / totalTime));
        return Math.round(
          minVisibleTime + (maxVisibleTime - minVisibleTime) * ratio
        );
      };
      const loop = () => {
        if (!running) return;
        postMessage({ type: "show" });
        setTimeout(() => {
          postMessage({ type: "hide" });
          setTimeout(loop, randomDelay(500, 2000));
        }, getVisibleTime());
      };
      ```

- **효과**
  - 각 구멍별로 두더지 출현 타이밍이 독립적으로 동작하여 게임이 더욱 자연스럽고 예측 불가하게 진행됨.
  - 남은 시간에 따라 난이도가 실시간으로 조절되어 몰입감이 높아짐.
  - Web Worker를 활용해 메인 스레드의 부하를 줄이고, 렌더링 프리징 없이 부드러운 게임 경험을 제공함.
