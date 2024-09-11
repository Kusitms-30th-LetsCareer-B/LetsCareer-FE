/** 캘린더에서 수정 불가능한 칩 받아서 출력하는 version 1 */
// 커스텀 캘린더 훅 임포트
import useCalendar from "../../../shared/hooks/useCalendar";

// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";

/* 일정 추가 버튼 디자인 컴포넌트 */
// 개인 스케줄 추가 버튼 임포트
import { ScheduleAddButton } from "./ScheduleAddButton.tsx"


/** Props */
// 로그인 정보 받기
import {userInfo} from "../../../shared/api/loginInstance.ts"
// ToDo 관련 Tools 임포트
import { PersonalScheduleListProps } from "../../../components/ToDoListTool.ts"
// Props 인터페이스:  부모 컴포로부터 최종 입력받을 Probs 합체
interface CalendarPersonalListProps extends userInfo, PersonalScheduleListProps {
    // 채용 일정 칩스  (부모 컴포에서 API 연동 후 자식에게 넘겨줌)
    personalScheduleChips: JSX.Element[];
}


/** 컴포넌트 */
const CalendarPersonalList = ({userId, userName, selectedDate, setSelectedDate, personalScheduleChips} : CalendarPersonalListProps) => {
    // 커스텀 캘린더 훅에서 필요한 상태와 핸들러 가져오기
    const {
        handleNewSchedule,
    } = useCalendar();

    //////////////////////////////////////////////////////////////////    
    /* 컴포넌트 렌더링 */
    return (
        <>
            {/* 첫 번째 파트: 타이틀 */}
            <div className="text-neutral-30 text-xsmall14 py-1">
                개인 일정
            </div>

            {/* 두 번째 파트: 개인 일정 칩스 
            {/** 개인 일정 데이터 */}
            {/* 선택된 날짜가 존재하면 해당 날짜의 일정 칩스를 렌더링 */}
            {selectedDate && (
                <div>
                    <div className="schedule-chips-container">
                        {personalScheduleChips.length > 0 ? (
                            personalScheduleChips.map((chip, index) => <div key={index}>{chip}</div>)
                        ) : (
                            <div className="rounded-sm bg-neutral-100 text-xsmall16 text-neutral-40 p-4">
                                {getFormattedDate1(selectedDate)}에는 등록된 개인 일정이 없어요!
                            </div>
                        )}
                    </div>
                </div>
            )}


            
            {/* 백엔드에서 수정, 삭제 만들면 고고 
            {schedules === undefined ? (
                <p>일정을 불러오는 중...</p> // 데이터를 불러오는 동안 보여줄 메시지
            ) : schedules.length > 0 ? (
                <ul>{ schedules.map((schedule) => (
                    <li key={schedule.personalScheduleId} className="mb-2">
                        <div>
                        {schedule.date} - {schedule.content}
                        </div>
                        <div className="flex items-center">
                        <input
                            type="text"
                            value={schedule.content}
                            onChange={(e) => handleContentChange(schedule.personalScheduleId, e.target.value)}
                            className="border px-2 py-1 mr-2"
                        />
                        <button onClick={() => handleDeleteSchedule(schedule.personalScheduleId)}>삭제</button>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <p>일정이 없습니다.</p> // 일정이 없을 경우 메시지
            )}
             */}
             
                          
            {/* 구분선 출력 */}
            <hr className="mt-4 p-1" />
            
            {/* 네 번째 헤더 파트: 개인 일정 추가하기 */}
            <div className="justify-between items-center text-center mb-5">
                {/* 추가하기 버튼 */}
                <button >
                    <ScheduleAddButton contents='개인 일정 추가하기' />
                </button>
            </div>
        </>


    );
};

export default CalendarPersonalList;
