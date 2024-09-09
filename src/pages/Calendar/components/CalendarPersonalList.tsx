import { useState, useEffect } from 'react';

/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts"
/* ToDo 관련 Tools 임포트 */
import { PersonalScheduleListProps } from "../../../components/ToDoListTool.ts"
import { getFormattedDate3 } from "../../../shared/hooks/useDate.ts";

// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, PersonalScheduleListProps {}


/* 개인 일정 관련 */
// 스케줄 추가 버튼 임포트
import { ScheduleButton } from "./ScheduleButton.tsx"



/** 컴포넌트 */
const CalendarPersonalList = ({userId, userName, selectedDate, setSelectedDate} : CombinedProps) => {
    //////////////////////////////////////////////////////////////////
    /** 개인 일정 API 연동 */
    const [newSchedule, setNewSchedule] = useState<{ date: string; content: string }>({
        date: '',
        content: ''
    });
    const [nextPersonalScheduleId, setNextPersonalScheduleIdId] = useState(1); // 새로운 일정에 사용할 ID

    // 년, 월, 일을 selectedDate에서 추출
    const year = selectedDate ? selectedDate.getFullYear().toString() : ''; // selectedDate가 null일 경우 빈 문자열
    const month = selectedDate ? (`0${selectedDate.getMonth() + 1}`).slice(-2) : ''; // selectedDate가 null일 경우 빈 문자열
    const formattedDate = selectedDate
    ? getFormattedDate3(selectedDate) // YYYY-MM-DD 형식으로 로컬 시간 변환
    : '';


    
    //////////////////////////////////////////////////////////////////    
    /* 컴포넌트 렌더링 */
    return (
        <>
            {/* 네 번째 헤더 파트: 텍스트 타이틀 */}
            <div className="font-semibold text-small18 text-neutral-30">
                커리어 일정
            </div>
            <div className="text-xxsmall-12 text-neutral-30 py-3">
                채용일정
            </div>


            {/* 다섯 번째 헤더 파트: 기업 일정 칩스 불러오기 */}
            {/* 선택된 날짜의 일정만 불러오기 */}

            {/* 전체 일정 불러오기
            {schedules === undefined ? (
                <p>일정을 불러오는 중...</p> // 데이터를 불러오는 동안 보여줄 메시지
            ) : schedules.length > 0 ? (
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.personalScheduleId}>
                        {schedule.date} - {schedule.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>일정이 없습니다.</p> // 일정이 없을 경우 메시지
            )}
            */}

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
            
            {/* 여섯 번째 헤더 파트: 개인 일정 추가하기 */}
            <div className="justify-between items-center text-center">
                {/* 추가하기 버튼 */}
                <button >
                    <ScheduleButton contents='개인 일정 추가하기' />
                </button>
            </div>
        </>


    );
};

export default CalendarPersonalList;
