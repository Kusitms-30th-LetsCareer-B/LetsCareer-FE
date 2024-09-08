import { useState } from "react";
import MainTodayList from "./components/MainTodayList";
import MainTodoList from "./components/MainTodoList";
import CareerStatusNumBoard from "./components/CareerStatusNumBoard";
import CareerRecruitmentsStatus from "./components/CareerRecruitmentsStatus.tsx";
import MainCalendar from "../../components/Calendar";

/* API 연동 부분 */
import { userInfo } from "../../shared/api/loginInstance.ts"; /* 로그인 정보 받기 */

function MainPage({ userId, userName }: userInfo) {
  // 날짜 변수 생성
  //const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 임시: 첫 번째 페이지의 데이터 호출
  const page = "1";

  return (
    <div className="px-10">
      {/** 타이틀 */}
      <div className="py-10 text-medium24 font-bold text-neutral-0">
        {userName}님, 오늘도 커리어를 향해 함께 같이 달려봐요!
      </div>

      <div className="flex justify-between gap-8">
        <div>
          {/** 일정 상태 */}
          <CareerStatusNumBoard userId={userId} />
          <CareerRecruitmentsStatus userId={userId} page={page} />

          <div className="mb-5 text-small20 font-semibold text-neutral-10">
            내 캘린더
          </div>

          {/** 달력 */}
          <MainCalendar onDateSelected={setSelectedDate} />
        </div>

        <div>
          {/** 투두 리스트  */}
          <MainTodayList
            userId={userId}
            userName={userName}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <MainTodoList
            userId={userId}
            userName={userName}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
