import React, { useState } from 'react';
import SubTodoList from "./components/SubTodoList";
import TodoList from "./components/TodoList";

import { CompanyNameChip, CompanyNameSelectionChip, DocumentScheduleChip,
  InterviewScheduleChip, OtherScheduleChip, PersonalScheduleChip, }  from "../../components/chips/TodoListChip";

/* API 연동 부분: 개인 스케줄 */
interface PersonalSchedule {
  id: number;
  contents: string;
}

function MainPage() {

  // TodoList에 현재 날짜 임시로 넣기
  // 원래는 캘린더와 연동해서 넣어야 함.
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // 기본
  const companyName = "네이버";
  const companyContents = "인적성검사"
  const contents = "개인 일정"
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
      <h1>메인 페이지</h1>
      <SubTodoList />
      {/* TodoList 컴포 테스트 */}
      <TodoList selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <br/>
      {/* Chips 테스트 */}
      <CompanyNameChip companyName={companyName}/>
      <CompanyNameSelectionChip/><br/>
      <DocumentScheduleChip companyName={companyName} status="시작"/>
      <InterviewScheduleChip companyName={companyName}/>
      <OtherScheduleChip companyName={companyName} contents={companyContents}/><br/>
      {schedules.map((schedule) => (
        <PersonalScheduleChip contents={schedule.contents} onDelete={() => handlePersonalDeleteSchedule(schedule.id)}/>
      ))}
    </>
  );
}

export default MainPage;
