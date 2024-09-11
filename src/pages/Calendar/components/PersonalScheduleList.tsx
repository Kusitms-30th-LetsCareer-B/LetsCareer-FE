/* 캘린더에서 선택한 데이터만 받아서 그를 바탕으로 수정가능한 칩을 새로 제작해서 출력하는 version 2 */

import { useState, useEffect } from 'react';

// Date 관련 hook 임포트
import { getFormattedDate3 } from "../../../shared/hooks/useDate.ts";


// API 연동
import { getPersonalDateSchedule, postPersonalSchedule } from '../api/personalScheduleApiService.ts'; // API 함수들 가져오기


// 개인 일정 추가 버튼 임포트
import { ScheduleAddButton } from "./ScheduleAddButton.tsx"

// 수정 가능한 개인 일정 칩 임포트
import { PersonalScheduleChipEditable } from '../../../components/chips/TodoListChip.tsx'; // 수정 가능한 PersonalChip 가져오기


/** Props */
interface CalendarPersonalListProps {
    userId: number,
    selectedDate: Date
}

/** 컴포넌트 */
const CalendarPersonalList = ({userId, selectedDate} : CalendarPersonalListProps) => {
    /** Design */
    // 개인 일정 추가
    const handleAddSchedule = async () => {
        try {
        await postPersonalSchedule(
            { userId },
            { date: getFormattedDate3(selectedDate), content: newContent }
        );
            setNewContent(''); // 입력 필드 초기화
            fetchPersonalSchedules(); // 새 일정 추가 후 목록 갱신
        } catch (error) {
            console.error('개인 일정 추가 중 오류 발생:', error);
        }
    };
    

    /** Feat */
    // API 연동된 개인일정 리스트를 담는 변수
    const [personalScheduleDataList, setPersonalScheduleDataList] = useState([]);
    const [newContent, setNewContent] = useState(""); // 초기값
    

    // API를 통해 개인 일정 가져오기
    const fetchPersonalSchedules = async () => {
      try {
        const response = await getPersonalDateSchedule({ userId, date: getFormattedDate3(selectedDate) });
        console.log("📫 개인 일정 배송이요~");
        console.log(response);

        setPersonalScheduleDataList(response.data);

      } catch (error) {
        console.error('개인 일정을 불러오는 중 오류 발생:', error);
      }
    };

    // 컴포넌트가 마운트될 때 또는 selectedDate가 변경될 때마다 개인 일정 API 연동하기
    useEffect(() => {
        fetchPersonalSchedules();
    }, [selectedDate]);


    //////////////////////////////////////////////////////////////////    
    /* 컴포넌트 렌더링 */
    return (
        <div>
            {/** 헤더 */}
            <div className="text-neutral-30 text-xsmall14 py-1">개인 일정</div>


            {/** 개인 일정 칩스 */}
            <div className="schedule-chips-container">
            {personalScheduleDataList.length > 0 ? (
                personalScheduleDataList.map((data) => (
                    <div className="flex"> {/** flex로 해서 한 줄씩 출력하기 */}
                        <PersonalScheduleChipEditable
                            key={data.personalScheduleId}
                            personalScheduleId={data.personalScheduleId}
                            contents={data.content}
                            onScheduleUpdated={fetchPersonalSchedules}
                            onScheduleDeleted={fetchPersonalSchedules}
                        />
                    </div>
                ))
            ) : (
                <div className="rounded-sm bg-neutral-100 text-xsmall16 text-neutral-40 p-4">
                {getFormattedDate3(selectedDate)}에는 등록된 개인 일정이 없어요!
                </div>
            )}
            </div>


            {/* 구분선 출력 */}
            <hr className="mt-4 p-1" />
            
            {/* 개인 일정 추가 버튼 */}
            <div className="justify-between items-center text-center mb-5">
                {/* 추가할 내용 입력 필드
                <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="새로운 일정 추가"
                    className="border px-2 py-1 mr-2"
                />
                */}
                {/* 추가하기 버튼 */}
                <button onClick={handleAddSchedule}>
                    <ScheduleAddButton contents='개인 일정 추가하기' />
                </button>
            </div>
        </div>
    );
};

export default CalendarPersonalList;
