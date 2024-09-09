import { useState } from 'react';
import MainTodayList from "./components/MainTodayList";
import MainTodoList from "./components/MainTodoList";
import CareerStatusNumBoard from "./components/CareerStatusNumBoard";
import CareerRecruitmentsStatus from "./components/CareerRecruitmentsStatus.tsx";
import MainCalendar from "../../components/Calendar";

/* API 연동 부분 */
import {userInfo} from "../../shared/api/loginInstance.ts" /* 로그인 정보 받기 */

/** 투두리스트 */
import CompanyTodoListComponent from "../Calendar/components/CalendarTodoListFixed"

/* Date 관련 hook 임포트 */
import { getYearMonthDay, getYear, getMonth, getFormattedDate3 } from "../../shared/hooks/useDate.ts";


function MainPage({userId, userName} : userInfo) {
  // 날짜 변수 생성
  //const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate]= useState<Date | null>(new Date());


  // 임시: 첫 번째 페이지의 데이터 호출
  const page = "1"

  return (
    <div className="px-10">
      {/** 타이틀 */}
      <div className="font-bold text-medium24 text-neutral-0 py-10">
        {userName}님, 오늘도 커리어를 향해 함께 같이 달려봐요!
      </div>
      
      <div className="flex justify-between gap-8">
        <div>
          {/** 일정 상태 */}
          <CareerStatusNumBoard userId={userId} />
          <CareerRecruitmentsStatus userId={userId} page={page} />
          
          <div className="font-semibold text-small20 text-neutral-10 mb-5">
            내 캘린더
          </div>

          {/** 달력 */}
          <MainCalendar userId={userId} onDateSelected={setSelectedDate}/>
        </div>

        <div>
          {/** 투데이 리스트  */}
          <MainTodayList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
          {/**<MainTodoList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
          
          {/** 투두 리스트 */}
          <CompanyTodoListComponent  userId={userId} selectedDate={selectedDate} setSelectedDate={setSelectedDate}  selectedDateString ={getFormattedDate3(selectedDate)}  />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
