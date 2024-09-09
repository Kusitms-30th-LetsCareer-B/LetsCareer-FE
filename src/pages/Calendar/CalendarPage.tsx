import { useState } from "react";
import Calender from "../../components/Calendar";
import DatePicker from "../../components/DatePicker";

import {
  DefaultDocumentChip,
  HoveredDocumentChip,
  ClickedDocumentChip,
  DefaultInterviewChip,
  HoveredInterviewChip,
  ClickedInterviewChip,
  DefaultOtherChip,
  HoveredOtherChip,
  ClickedOtherChip,
  DefaultPersonalChip,
  HoveredPersonalChip,
  ClickedPersonalChip,
} from "../../components/chips/CalendarChip";
import useDatePicker from "../../shared/hooks/useDatePicker";

/* 일정 리스트 */
import CalendarList from "./components/CalendarList";

/* Date 관련 hook 임포트 */
import {
  getYearMonthDay,
  getYear,
  getMonth,
  getFormattedDate3,
} from "../../shared/hooks/useDate.ts";

/* 로그인 정보 받기 */
import { userInfo } from "../../shared/api/loginInstance.ts";

import TestCalendar from "../../components/TestCalendar.tsx"; // 이건 캘린더에 띄우기

function CalendarPage({ userId, userName }: userInfo) {
  /** 캘린더 컴포완 연동:  캘린더로부터 반환받는 데이터 관리 */
  // 선택된 날짜를 저장할 상태 변수
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 선택된 날짜에 대한 기업 채용 일정 칩스를 저장할 상태 변수
  const [recruitmentScheduleChips, setRecruitmentScheduleChips] = useState<
    JSX.Element[]
  >([]);

  // 선택된 날짜에 대한 개인 일정 칩스를 저장할 상태 변수
  const [personalScheduleChips, setPersonalScheduleChips] = useState<
    JSX.Element[]
  >([]);

  // 캘린더에서 셀 선택시마다 반환받은 데이터를 처리하는 콜백 함수
  const handleDateSelected = (
    date: Date,
    recruitmentScheduleChips: JSX.Element[],
    personalScheduleList: JSX.Element[],
  ) => {
    // 캘린더에서 선택된 날짜 반환받고 상태에 저장
    setSelectedDate(date);

    // 캘린더에서 선택된 날짜에 대한 기업 일정 칩스를 보냄
    // 그걸 받아서 상태에 저장
    setRecruitmentScheduleChips(recruitmentScheduleChips);

    // 캘린더에서 선택된 날짜에 대한 개인 일정 칩스를 보냄
    // 그걸 받아서 상태에 저장
    setPersonalScheduleChips(personalScheduleList);
  };

  /** 렌더링 */
  return (
    <div className="px-10">
      {/** 타이틀 */}
      <div className="py-10">
        <div className="text-medium24 font-bold text-neutral-0">
          {userName}님의 캘린더
        </div>
        <div className="py-2 text-xsmall16 font-medium text-neutral-50">
          월간 캘린더에 취업 관련 일정을 모아보고 나의 스케줄과 함께 효율적으로
          관리해요
        </div>
      </div>

      <div className="flex justify-between gap-8">
        {/* 1번째 열: 캘린더 */}
        <div>
          {/* 캘린더 컴포 */}
          <Calender userId={userId} onDateSelected={handleDateSelected} />
          {String(selectedDate)}
        </div>

        {/* 2번째 열:  일정 리스트 */}
        <div>
          <CalendarList
            userId={userId}
            userName={userName}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            recruitmentScheduleChips={recruitmentScheduleChips}
            personalScheduleChips={personalScheduleChips}
          />
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
