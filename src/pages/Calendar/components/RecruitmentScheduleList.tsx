// 커스텀 캘린더 훅 임포트
import useCalendar from "../../../shared/hooks/useCalendar.ts";

// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";

/* 일정 추가 버튼 디자인 컴포넌트 */
// 채용 스케줄 추가 버튼 임포트
import { ScheduleAddButton } from "./ScheduleAddButton.tsx"


/** Props */
// 로그인 정보 받기
import {userInfo} from "../../../shared/api/loginInstance.ts"
// ToDo 관련 Tools 임포트
import { RecruitmentScheduleListProps } from "../../../components/ToDoListTool.ts"
// Props 인터페이스:  부모 컴포로부터 최종 입력받을 Probs 합체
interface CalendarCareerListProps extends userInfo, RecruitmentScheduleListProps {
    // 채용 일정 칩스  (부모 컴포에서 API 연동 후 자식에게 넘겨줌)
    recruitmentScheduleChips: JSX.Element[];
}

/** 컴포넌트 */
const RecruitmentSchedule = ({userId, userName, selectedDate, setSelectedDate, recruitmentScheduleChips} : CalendarCareerListProps) => {
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
                채용 일정
            </div>

            {/* 두 번째 파트: 채용 일정 칩스 */}
            {/* 채용 일정 데이터 */}
            {/* 선택된 날짜가 존재하면 해당 날짜의 일정 칩스를 렌더링 */}
            {selectedDate && (
                <div>
                    <div className="schedule-chips-container">
                        {recruitmentScheduleChips.length > 0 ? (
                            recruitmentScheduleChips.map((chip, index) => <div key={index}>{chip}</div>)
                        ) : (
                            <div className="rounded-sm bg-neutral-100 text-xsmall16 text-neutral-40 p-4">
                                {getFormattedDate1(selectedDate)}에는 등록된 기업 채용 일정이 없어요!
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* 구분선 출력 */}
            <hr className="mt-4 p-1" />
            
            {/* 세 번째 파트: 채용 일정 추가하기 버튼 */}
            <div className="justify-between items-center text-center mb-5">
                {/* 추가하기 버튼 */}
                
                <div className="justify-between items-center text-center">
                    {/* 추가하기 버튼 */}
                    {/* 기업 채용 일정 추가 이벤트 부여 */}
                    <button onClick={handleNewSchedule}>
                        <ScheduleAddButton contents='채용 일정 추가하기' />
                    </button>
                </div>
            </div>
        </>


    );
};

export default RecruitmentSchedule;
