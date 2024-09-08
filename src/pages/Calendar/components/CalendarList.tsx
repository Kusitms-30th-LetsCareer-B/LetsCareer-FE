/* ToDo 관련 Tools 임포트 */
import {
  PersonalScheduleListProps,
  TodoListProps,
  formatDate1,
} from "../../../components/ToDoListTool.ts";
/* 로그인 정보 받기 */
import { userInfo } from "../../../shared/api/loginInstance.ts";
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends PersonalScheduleListProps, userInfo {}

/* 일정 리스트 */
import CalendarCareerList from "./CalendarCareerList";
import CalendarPersonalList from "./CalendarPersonalList";
import Test from "./Test";
import CalendarTodoList from "./CalendarTodoList";

/** 컴포넌트 */
const CalendarList = ({
  selectedDate,
  setSelectedDate,
  userId,
  userName,
}: CombinedProps) => {
  //////////////////////////////////////////////////////////////////
  /* 컴포넌트 렌더링 */
  return (
    <div className="w-[247px] rounded-lg border border-neutral-80 px-5 font-sans">
      {/** 채용 일정 */}
      <CalendarCareerList
        userId={userId}
        userName={userName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/** 개인 일정 */}
      <CalendarPersonalList
        userId={userId}
        userName={userName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/** 투두 리스트
             * <CalendarTodoList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

             */}
      <Test
        userId={userId}
        userName={userName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default CalendarList;
