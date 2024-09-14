import { useState } from 'react';
import MainTodayList from "./components/MainTodayList";
import CareerStatusStageNumBoard from "./components/CareerStatusStageNumBoard";
import CareerRecruitmentsStatus from "./components/CareerRecruitmentsStatus.tsx";
import MainCalendar from "../../components/Calendar";
import PopUpAlarmButton from "./components/PopUpAlarm.tsx"

// 투두리스트
import TodoListFixedComponent from "../Calendar/components/TodoListFixed.tsx"
import TodoListFixedComponent_20240909_날짜별 from "../Calendar/components/TodoListFixed_20240909_날짜별.tsx"

/* Props */
// 로그인 정보 받기
import {userInfo} from "../../shared/api/loginInstance.ts"


function MainPage({userId, userName} : userInfo) {
  // 날짜 변수 생성
  //const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate]= useState<Date | null>(new Date());


  // 임시: 첫 번째 페이지의 데이터 호출
  const page = "1"

  return (
    <div className="p-[48px]">
    {/** 타이틀 <TodoComponent/>*/}
    <div className="flex justify-between">
      <div className="font-bold text-medium24 text-neutral-0 mb-10">
        {userName}님, 오늘도 커리어를 향해 함께 같이 달려봐요!
      </div>
      {/** 알림창 */}
      <PopUpAlarmButton userId={userId} userName={userName}/>
    </div>
      
      <div className="flex justify-between gap-8">
        <div>
          {/** 메인보드: 합/불 일정 현황
          <CareerStatusNumBoard userId={userId} /> */}
          {/** 메인보드: 서/면/기 일정 현황 */}
          <CareerStatusStageNumBoard userId={userId} />
          
          {/** 메인보드: 지원 현황 */}
          <CareerRecruitmentsStatus userId={userId} page={page} />
          
          <div className="font-semibold text-small20 text-neutral-10 mb-5">
            내 캘린더
          </div>

          {/** 달력 */}
          <MainCalendar userId={userId} componentName={"MainPage"} onDateSelected={setSelectedDate}/>
        </div>

        <div className="w-[240px]">
          {/** 투데이 리스트  */}
          <div className="font-sans rounded-lg border border-neutral-80 mb-[40px]">
            <MainTodayList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
          </div>
          {/**<MainTodoList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
          
          {/** 투두 리스트 */}
          <div className="font-sans rounded-lg border border-neutral-80 px-5">
            <TodoListFixedComponent  userId={userId} />
            {/** 
            <TodoListFixedComponent_20240909_날짜별  userId={userId} selectedDate={selectedDate} setSelectedDate={setSelectedDate}  selectedDateString ={getFormattedDate3(selectedDate)}  />
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
