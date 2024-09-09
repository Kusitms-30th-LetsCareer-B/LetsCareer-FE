/* ToDo 관련 Tools 임포트 */
import { PersonalScheduleListProps, TodoListProps } from "../../../components/ToDoListTool.ts"
/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts" 
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends PersonalScheduleListProps, userInfo {}


/* Date 관련 hook 임포트 */
import { getYearMonthDay, getYear, getMonth, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";


/* 일정 리스트 */
import CalendarCareerList from "./CalendarCareerList"
import CalendarPersonalList from "./CalendarPersonalList"
import CompanyTodoListComponent from "./CalendarTodoListEditable.tsx"


/** 컴포넌트 */
const CalendarList = ({selectedDate, setSelectedDate, userId, userName} : CombinedProps) => {
    //////////////////////////////////////////////////////////////////    
    /* 컴포넌트 렌더링 */
    return (
        <div className="font-sans rounded-lg border border-neutral-80 min-w-[247px] px-5 ">
            {/** 채용 일정 */}
            <CalendarCareerList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            {/** 개인 일정 */}
            <CalendarPersonalList userId={userId} userName={userName} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            
            {/** 투두 리스트 */}
            <CompanyTodoListComponent  userId={userId} selectedDate={selectedDate} setSelectedDate={setSelectedDate}  selectedDateString ={getFormattedDate3(selectedDate)}  />
            
        </div>


    );
};

export default CalendarList;
