/* ToDo 관련 Tools 임포트 */
import {
  PersonalScheduleListProps,
  TodoListProps,
} from "../../../components/ToDoListTool.ts";
/* 로그인 정보 받기 */
import { userInfo } from "../../../shared/api/loginInstance.ts";
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CalendarListProps extends PersonalScheduleListProps, userInfo {
  // 채용 일정 칩스
  recruitmentScheduleChips: JSX.Element[];

  // 개인 일정 칩스
  personalScheduleChips: JSX.Element[];
}

/* Date 관련 hook 임포트 */
import {
  getYearMonthDay,
  getYear,
  getMonth,
  getFormattedDate2,
  getFormattedDate3,
} from "../../../shared/hooks/useDate.ts";

/* 일정 리스트 */
import CalendarCareerList from "./CalendarCareerList";
import CalendarPersonalList from "./CalendarPersonalList";
import CompanyTodoListComponent from "./CalendarTodoListEditable.tsx";

/** 컴포넌트 */
const CalendarList = ({
  userId,
  userName,
  selectedDate,
  setSelectedDate,
  recruitmentScheduleChips,
  personalScheduleChips,
}: CalendarListProps) => {
  //////////////////////////////////////////////////////////////////
  /* 컴포넌트 렌더링 */
  return (
    <div className="min-w-[247px] rounded-lg border border-neutral-80 px-5 py-4 font-sans">
      {/** 첫 번째 헤더 파트 */}
      <div className="flex items-center justify-start py-2">
        <div className="text-small20 font-bold text-primary-100">TODAY</div>
        {/* 선택된 날짜 불러오기 */}
        <div className="px-2 text-xsmall16 text-neutral-45">
          {/* selectedDate가 null이면 함수말고 안전한 문자열로 처리 */}
          {selectedDate ? getFormattedDate2(selectedDate) : ""}
        </div>
      </div>
      {/* 타이틀 */}
      <div className="mb-2 text-small18 font-semibold text-neutral-30">
        오늘의 커리어 일정
      </div>

      {/** 두 번째 채용 일정 */}
      <CalendarCareerList
        userId={userId}
        userName={userName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        recruitmentScheduleChips={recruitmentScheduleChips}
      />

      {/** 세 번째 개인 일정 */}
      <CalendarPersonalList
        userId={userId}
        userName={userName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        personalScheduleChips={personalScheduleChips}
      />

      {/** 네 번째 투두 리스트 */}
      {/** 투두 리스트 데이터 */}
      <CompanyTodoListComponent
        userId={userId}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDateString={getFormattedDate3(selectedDate)}
      />
    </div>
  );
};

export default CalendarList;
