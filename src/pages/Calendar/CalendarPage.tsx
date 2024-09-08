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

/* 로그인 정보 받기 */
import { userInfo } from "../../shared/api/loginInstance.ts";

function CalendarPage({ userId, userName }: userInfo) {
  // 날짜 변수 생성
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 캘린더 컴포 테스트용
  const companyName = "네이버";
  const personalSchedule = "개인일정";

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
          <Calender onDateSelected={setSelectedDate} />
        </div>

        {/* 2번째 열:  일정 리스트 */}
        <div>
          <CalendarList
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

export default CalendarPage;
