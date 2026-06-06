// Intl.DateTimeFormat 대신 직접 포맷하는 이유:
// 로케일 설정 없이 "YYYY-MM-DD HH:mm:ss" 고정 포맷으로 출력하기 위함
// padStart(2, "0")으로 월/일/시/분/초가 항상 2자리로 표시되도록 맞춤
export const formatDate = (date: Date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1
  const dd = String(d.getDate()).padStart(2, "0");
  const HH = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
};
