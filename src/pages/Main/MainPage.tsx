import { useState } from 'react';
import MainTodayList from "./components/MainTodayList";
import MainTodoList from "./components/MainTodoList";
import CareerStatusBoard from "./components/CareerStatusBoard";
import CareerStatus from "./components/CareerStatus";
import MainCalendar from "../../components/Calendar";

/* API 연동 부분 */
import {userInfo} from "../../shared/api/loginInstance.ts" /* 로그인 정보 받기 */


function MainPage({userId, userName} : userInfo) {
  // 날짜 변수 생성
  //const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate]= useState<Date | null>(new Date());

  return (
    <div className="px-10">
      {/** 타이틀 */}
      <div className="font-bold text-medium24 text-neutral-0 py-10">
        {userName}님, 오늘도 커리어를 향해 함께 같이 달려봐요!
      </div>
      <div className="font-semibold text-small20 text-neutral-10 mb-5">
        내 캘린더
      </div>

      <div className="flex justify-between gap-8">
        <div>
          
          {/** 달력 */}
          <MainCalendar onDateSelected={setSelectedDate}/>
          
          {/** 일정 상태 */}
          <CareerStatusBoard total={10} preparing={4} pass={3} fail={2} />
          <CareerStatus userId={userId} statusPageLink="../Status/StatusPage" />
        </div>

        <div>
          {/** 투두 리스트  */}
          <MainTodayList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
          <MainTodoList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
