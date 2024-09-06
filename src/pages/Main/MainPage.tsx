import React, { useState } from "react";
import SubTodoList from "./components/SubTodoList";
import TodoList from "./components/TodoList";
import CareerStatusBoard from "./components/CareerStatusBoard";
import CareerStatus from "./components/CareerStatus";
import MainCalendar from "../../components/Calendar";

import {
  CompanyNameChip,
  CompanyNameSelectionChip,
  DocumentScheduleChip,
  InterviewScheduleChip,
  OtherScheduleChip,
  PersonalScheduleChip,
} from "../../components/chips/TodoListChip";

/* API 연동 부분: 개인 스케줄 */
interface PersonalSchedule {
  id: number;
  contents: string;
}

/* 로그인 정보 받기 */
interface userInfo {
  userName: string;
}

function MainPage({ userName }: userInfo) {
  // TodoList에 현재 날짜 임시로 넣기
  // 원래는 캘린더와 연동해서 넣어야 함.
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // 기본
  const companyName = "네이버";
  const companyContents = "인적성검사";
  const [schedules, setSchedules] = useState<PersonalSchedule[]>([
    { id: 1, contents: "개인 일정 1" },
    { id: 2, contents: "개인 일정 2" },
    { id: 3, contents: "개인 일정 3" },
  ]);
  // 개인 스케줄을 삭제하는 핸들러
  const handlePersonalDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <>
      {/** 타이틀 */}
      <div className="py-10 text-medium24 font-bold text-neutral-0">
        {userName}님, 오늘도 커리어를 향해 함께 같이 달려봐요!
      </div>
      <div className="mb-5 text-small20 font-semibold text-neutral-10">
        내 캘린더
      </div>

      <div className="flex justify-between gap-8">
        <div>
          {/** 달력 */}
          <MainCalendar />

          {/** 일정 상태 */}
          <CareerStatusBoard total={10} preparing={4} pass={3} fail={2} />
          <CareerStatus statusPageLink="../Status/StatusPage" />
        </div>

        <div>
          {/** 투두 리스트 */}
          <SubTodoList />
          <TodoList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
