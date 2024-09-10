/** Date 객체 파싱해서 반환하는 훅 */
/** Date 컴포 형변환 함수들 (날짜 형식 포맷팅 함수들) */

/** 형식: 2024, 09, 23 */
// Date를 받아서 year, month, day 분리하여 반환
export const getYearMonthDay = (date: Date) => {
  const year = date.getFullYear(); // 연도 추출
  const month = date.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일 추출

  // Object type으로 반환함.
  // getYearMonthDay(date).year, getYearMonthDay(date).month, getYearMonthDay(date).day로 받아서 사용하기
  return {
    year,
    month: month < 10 ? `0${month}` : month, // 두 자리 수로 포맷
    day: day < 10 ? `0${day}` : day, // 두 자리 수로 포맷
  };
};

/** 형식: 2024 */
// Date를 받아서 { year: number }만 반환
export const getYear = (date: Date) => {
  const year = date.getFullYear();

  return year;
};

// Date를 받아서 { year: string }만 반환
export const getStringYear = (date: Date) => {
  if (!date || !(date instanceof Date)) {
    console.error(
      "[useDate hook에서 알림] 날짜 데이터가 null 또는 undefined값이라 '처리 불가' 입니당",
    );
    return "";
  }

  const year = String(date.getFullYear());

  return year;
};

/** 형식: 09 */
// Date를 받아서 { month: string : number }만 반환
export const getMonth = (date: Date) => {
  const month = date.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1)

  // 이렇게 반환하면 getMonth(date)로 사용해서 편함.
  return month < 10 ? `0${month}` : month;

  // 이렇게 반환하면 getMonth(date).month로 사용해야해서 불편함.
  /*
    return {
      month: month < 10 ? `0${month}` : month, // 두 자리 수로 포맷
    };
    */
};

// Date를 받아서 { month: string }만 반환
export const getStringMonth = (date: Date) => {
  if (!date || !(date instanceof Date)) {
    console.error(
      "[useDate hook에서 알림] 날짜 데이터가 null 또는 undefined값이라 '처리 불가' 입니당",
    );
    return "";
  }

  const month = date.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1)

  // 이렇게 반환하면 getMonth(date)로 사용해서 편함.
  return month < 10 ? `0${month}` : String(month);
};

/** 형식: 23 */
// Date를 받아서 day만 반환
export const getDay = (date: Date) => {
  const day = date.getDate(); // 일 추출

  // 이렇게 반환하면 getDay(date)로 사용해서 편함.
  return day < 10 ? `0${day}` : day; // 두 자리 수로 포맷

  // 이렇게 반환하면 getDay(date).day로 사용해야해서 불편함.
  /*
    return {
      day: day < 10 ? `0${day}` : day, // 두 자리 수로 포맷
    };
    */
};

/** 형식: 2024년 09월 */
export const getFormattedDate1 = (date: Date) => {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const month = months[date.getMonth()]; // 월을 배열에서 한국어로 변환
  const day = date.getDate(); // 일자 추출

  return `${month} ${day}일`;
};

/** 형식: YYYY.MM.DD */
export const getFormattedDate2 = (date: Date) => {
  // method1.
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // method2.
  //const formattedDisplayDate = `${date.getFullYear() % 100}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  return `${year}.${month}.${day}`;
};

/** 형식: YYYY-MM-DD */
export const getFormattedDate3 = (date: Date) => {
  const formattedDate = date.toLocaleDateString("en-CA"); // method1
  // const formattedDate = date.toISOString().split("T")[0] // method2. 오류났던 거 같음 (-1만큼 일수 덜 불러와짐)

  return formattedDate;
};

/** 형식: YYYY. MM. DD */
export const getFormattedDate4 = (date: Date) => {
  return date.toLocaleDateString();
};

/** 형식: M월 D일 (요일) */
/** 형식: 9월 3일 (월) */
export const getFormattedDate5 = (date: Date) => {
  // 요일 format
  const daysOfWeekKor = ["일", "월", "화", "수", "목", "금", "토"];

  const month = date.getMonth() + 1;
  const day1 = date.getDate();
  const day2 = daysOfWeekKor[date.getDay()];

  return `${month}월 ${day1}일 (${day2})`;
};


// 날짜 문자열을 받아서 두 날짜의 차이를 계산하는 함수
export const geteDateDifference = (date1: string, date2: string): number => {
  const dateFormat = 'YYYY.MM.DD';

  // 문자열을 Date 객체로 변환
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // 날짜 차이 계산 (밀리초 차이로 계산 후 일 단위로 변환)
  const differenceInTime = d2.getTime() - d1.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 밀리초 -> 일 변환

  return differenceInDays;
};