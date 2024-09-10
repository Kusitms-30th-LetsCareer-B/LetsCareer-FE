/** < 2024.09.10 > 형태의 일정 네비바 */

import { useState } from "react";

// 아이콘 이미지 임포트
import prevButtonIcon from "../shared/assets/calendar-prev.png"
import nextButtonIcon from "../shared/assets/calendar-next.png"


// Todo 조작 훅 임포트
import { useTodoList } from "../shared/hooks/useTodoList.ts";
import { RecruitmentScheduleListProps } from "./ToDoListTool.ts";

// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../shared/hooks/useDate.ts";

// Date를 선택할 수 있는 미니 캘린더
import DatePicker from "../components/DatePicker.tsx"

// Date picker 조작 훅 임포트
import useDatePicker from "../shared/hooks/useDatePicker.ts"

// Props
interface DateNavigationProps {
    selectedDate: Date;  // 선택적 Prop: 부모 컴포로부터 전달받지 못 하면 기본값으로 설정
    onDateSelected: (date: Date) => void;  // 부모 컴포에게 selectedDate 값을 넘기기 위한 Prop
}


const DateNavigation: React.FC<RecruitmentScheduleListProps> = ({ selectedDate, setSelectedDate }) => {
    // Date picker 조작 훅에서 필요한 것만 가져오기
    const {
        isDatePickerOpen,
        handleOpenDatePicker,
        handleCloseDatePicker,
        handleDateSelected,
    } = useDatePicker();
    
    // 커스텀 Todo 조작 훅에서 상태와 핸들러 가져오기
    const { handlePrevDay, handleNextDay, useCompletedImage } = useTodoList({ selectedDate, setSelectedDate }); 

    
    // handleDateSelected 발동시에
    // 부모 컴포에게 selectedDate를 넘기기 위한 훅 정의
    const handleDateSelect = (date: Date) => {
        handleDateSelected(date);   // 기존 훅 업뎃
        setSelectedDate(date);      // 부모에게 선택된 데이터 전송
        handleCloseDatePicker();    // 날짜 선택 후 DatePicker 닫기
    };



    // 컴포넌트 렌더링
    return (
        <div>
            {/* 날짜 이동 버튼 */}
            <div className="flex items-center justify-center">
                {/* 이전달 이동 버튼 */}
                {/* 월 이동 버튼 */}
                <button onClick={handlePrevDay} className="px-4">
                    <img src={prevButtonIcon} alt='이전 달'/>
                </button>


                {/* 날짜 텍스트 타이틀 클릭 시 DatePicker 열기 */}
                <div onClick={handleOpenDatePicker} className="cursor-pointer">
                    {/* 날짜 텍스트: 년도.월.일 */}
                    {/* 선택된 날짜가 있으면 선택된 날짜 관련 데이터: selectedDate */}
                    {/* 선택된 날짜가 없으면 오늘 날짜 관련 데이터:  (new Date) */}
                    {selectedDate ? getFormattedDate2(selectedDate) : getFormattedDate2(new Date())}
                </div>
                
                {/* 텍스트 클릭 시 DatePicker 열기 */}
                {isDatePickerOpen && (
                    // 데이터피커를 절대적 위치(부모 컴포 바로 위)에 독립적으로 띄우기
                    <div className="absolute mt-2 p-4">
                        <DatePicker
                            // 닫기 버튼 클릭 시 핸들러
                            onCancel={handleCloseDatePicker}
                            // 날짜 선택 시 핸들러
                            onSelect={handleDateSelect}
                            message={"서류 마감일을 선택해주세요."}
                        />
                    </div>
                )}
                
                {/* 다음달 이동 버튼 */}
                <button onClick={handleNextDay} className="px-4">
                    <img src={nextButtonIcon} alt='다음 달'/>
                </button>
            </div>
        </div>
    );
};


export default DateNavigation;