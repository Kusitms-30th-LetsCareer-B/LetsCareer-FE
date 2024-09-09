import { useState } from 'react';
import Calender from "../../components/Calendar"
import DatePicker from "../../components/DatePicker"

import { DefaultDocumentChip, HoveredDocumentChip, ClickedDocumentChip,
         DefaultInterviewChip, HoveredInterviewChip, ClickedInterviewChip,
         DefaultOtherChip, HoveredOtherChip, ClickedOtherChip,
         DefaultPersonalChip, HoveredPersonalChip, ClickedPersonalChip } from "../../components/chips/CalendarChip"
import useDatePicker from "../../shared/hooks/useDatePicker"

/* 일정 리스트 */
import CalendarList from "./components/CalendarList"

/* Date 관련 hook 임포트 */
import { getYearMonthDay, getYear, getMonth, getFormattedDate3 } from "../../shared/hooks/useDate.ts";

/* 로그인 정보 받기 */
import {userInfo} from "../../shared/api/loginInstance.ts"

import TestCalendar from "../../components/TestCalendar.tsx" // 이건 캘린더에 띄우기
import TestCalendarTodoList from "./TestCalendarTodoList.tsx" // 이건 우측 Todo에 띄우기

function CalendarPage({userId, userName} : userInfo) {
  // 날짜 변수 생성
  const [selectedDate, setSelectedDate]= useState<Date | null>(new Date());

  // 날짜가 선택되면 호출되는 함수
  const handleDateSelected = (date: Date) => {
    setSelectedDate(date); // 상태를 업데이트합니다.
  };
  
  // 캘린더 컴포 테스트용
  const companyName="네이버";
  const personalSchedule="개인일정";

  return (
      <div className="px-10">
      {/** 타이틀 */}
      <div className="py-10">
        <div className="font-bold text-medium24 text-neutral-0">
          {userName}님의 캘린더
        </div>
        <div className="font-medium text-xsmall16 text-neutral-50 py-2">
          월간 캘린더에 취업 관련 일정을 모아보고 나의 스케줄과 함께 효율적으로 관리해요
        </div>
      </div>
      
      <div className="flex justify-between gap-8">
        {/* 1번째 열: 캘린더 */}
        <div>
          {/* 캘린더 컴포 */}
          <Calender userId={userId} onDateSelected={handleDateSelected}/>
          {String(selectedDate)}
        </div>

        {/* 2번째 열:  일정 리스트 */}
        <div>
          <CalendarList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

        {/* 3번째 열: 테스트 & 디버깅용 컴포*/}
        {/*
        <div>
          <TestCalendar userId={userId} year={String(getYear(selectedDate))} month={String(getMonth(selectedDate))} selectedDate={getFormattedDate3(selectedDate)} />
          <TestCalendarTodoList userId={userId} selectedDate={getFormattedDate3(selectedDate)} />
          */}
          
          {/** 디버깅 선택된 날짜 확인용 코드
          <p>{selectedDate ? selectedDate.toLocaleDateString() : ""}</p>
          {String(getYear(selectedDate))}
          {String(getMonth(selectedDate))}
        </div>
        */}
      </div>
    </div>
  );
}

export default CalendarPage;
