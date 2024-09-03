import React, { useState } from 'react';
import prevButtonIcon from "../shared/assets/calendar-prev.png"
import nextButtonIcon from "../shared/assets/calendar-next.png"
import filterButtonIcon from "../shared/assets/filter.png"
import addButtonIcon from "../shared/assets/add.png"

import { DefaultDocumentChip, HoveredDocumentChip, ClickedDocumentChip,
  DefaultInterviewChip, HoveredInterviewChip, ClickedInterviewChip,
  DefaultOtherChip, HoveredOtherChip, ClickedOtherChip,
  DefaultPersonalChip, HoveredPersonalChip, ClickedPersonalChip } from "./chips/CalendarChip"


// 캘린더 컴포넌트
const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null); // 호버된 날짜

  // 월 이름과 요일 이름 배열
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 해당 월의 첫 번째 날과 마지막 날 가져오기
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  // 이전 달의 마지막 날 가져오기
  const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  
  // 달력에 표시할 날짜 배열 생성
  const dates = [];
  
  // 첫 주를 공백으로 채우기
  /*
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    dates.push(null);
  }
  */
  // 첫 주를 이전 달의 마지막 날짜로 채우기
  for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
    dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, lastDayOfPrevMonth.getDate() - i));
  }
  
  // 현재 월의 날짜 채우기
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const month = new Date(currentYear, currentMonth, i);
    dates.push(month);
  }

  // 다음 달의 날짜를 채워서 달력을 완성
  const totalCells = 42; // 7x6 그리드(6주는 항상 표시)
  const remainingCells = totalCells - dates.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    dates.push(nextMonthDate);
  }

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(prevMonth);
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(nextMonth);
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleDateMouseOver = (date: Date | null) => {
    setHoveredDate(date);
  };

  const handleDateMouseOut = () => {
    setHoveredDate(null);
  };

  /** 전체 일정 보기 이벤트 */
  const handleAllSchedule = () => {

  }

  /** 새 채용 일정 추가하기 이벤트 */
  const handleNewSchedule = () => {

  }



  return (
    /* 캘린더 전체 윤곽 컨테이너 스타일 */
    <div className="p-4 font-sans bg-neutral-100 shadow-none">
      <div className="flex items-center mb-4">

        {/* 달력 헤더: 월 이동 */}
        <button onClick={handlePrevMonth} className="px-4 text-gray-600 hover:bg-gray-200">
          <img src={prevButtonIcon} alt='이전 달'/>
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.getFullYear()}년 {currentDate.getMonth()+1}월 {/**영문: {monthNames[currentDate.getMonth()]}*/}
        </h2>
        <button onClick={handleNextMonth} className="px-4">
          <img src={nextButtonIcon} alt='다음 달'/>
        </button>

        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-secondary-100 rounded-xxs text-secondary-0 text-xxsmall11 font-regular mr-[1px]"/>
        <div className="flex items-center justify-center text-xxsmall12 text-neutral-30 font-xxsmall12 px-0.5 mr-2">
          서류 3건
        </div>
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-primary-100 rounded-xxs text-primary-0 text-xxsmall11 font-regular mr-[1px]"/>
        <div className="flex items-center justify-center text-xxsmall12 text-neutral-30 font-xxsmall12 px-0.5 mr-2">
          면접 2건
        </div>
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-teritory-normal rounded-xxs text-teritory-0 text-xxsmall11 font-regular mr-[1px]"/>
        <div className="flex items-center justify-center text-xxsmall12 text-neutral-30 font-xxsmall12 px-0.5 mr-2">
          직무/인적성 1건
        </div>

        {/* 전체 일정 보기 버튼 */}
        <button onClick={handleAllSchedule} className="flex items-center justify-start text-xxsmall12 rounded-xs font-xxsmall12 text-neutral-45 bg-static-100 border border-neutral-80 w-36 h-9 px-2">
          전체 일정 보기
          <img className="px-2" src={filterButtonIcon} alt='전체 일정 보기'/>
        </button>
        
        <p className='px-1.5'/>
        
        {/* 새 채용 일정 추가하기 버튼 */}
        <button onClick={handleNewSchedule} className="flex items-center justify-start text-xxsmall12 rounded-xs font-xxsmall12 text-static-100 bg-primary-100 w-52 h-9">
        <img className="px-3" src={addButtonIcon} alt='새 채용일정 추가하기'/>
          새 채용일정 추가하기
        </button>
      </div>



      <div className="grid grid-cols-7 gap-0"> {/* gap-0 to remove gaps between cells */}
        {/**요일 컬럼*/}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium text-xs uppercase text-neutral-45 bg-transparent p-2">
            {day}
          </div>
        ))}


        {/**날짜 셀*/}
        {dates.map((date, index) => {
          const isToday = date && date.toDateString() === new Date().toDateString();
          const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
          const isHovered = date && hoveredDate && date.toDateString() === hoveredDate.toDateString();
          const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();
          //const isSunday = date && date.getDay() === 0;
          const isSunday = date && date.getDay() === 0 && date.getMonth() === currentDate.getMonth(); // 이번 달이 아닌 일요일은 빨간색으로 색칠X
          const isNextMonth = date && date.getMonth() > currentDate.getMonth();
          const isFifteenth = date && date.getDate() === 15; // 15일인지 확인
          

          {/** 날짜 셀 각각 꾸미기 */}
          {/*오늘 셀:  ${isToday ? 'bg-blue-200' : ''} 
            *다음 달 셀: ${isNextMonth ? 'text-gray-400' : ''}
            *선택된 셀: ${isSelected ? 'bg-blue-500 text-white' : ''}
            *호버된 셀: ${isHovered ? 'bg-blue-100' : ''}
            *현재달과 다음달 셀 다르게:  
                ${isCurrentMonth ? 'bg-white text-gray-600 hover:bg-gray-200' : 'bg-white text-gray-300'}
            */}
            const calendarCellClassName = `
            justify-start items-end text-left border-r border-b border-neutral-80 cursor-pointer h-36 p-2
            ${isSunday ? 'text-red-500' : ''}
            ${isNextMonth ? 'text-neutral-80' : ''}
            ${isCurrentMonth ? 'bg-white' : 'bg-white text-neutral-80'}
          `;
      
          
          {/** 15일이면 칩 추가 */}
          {/** 기본 상태면 일자만 표시 */}
          {/** 호버 상태면 동그라미도 표시 */}
          {/** 일자(날짜) 출력 */}
          const dateContent = date ? ((
              <span
                className={`flex items-center justify-center w-5 h-5 
                  ${isHovered ? 'rounded-full bg-primary-100 border-5 border-primary-100 text-white' : ''}`}
              >
                {date.getDate()}
              </span>
            )
          ) : null;

          const companySchedules = isFifteenth ? (
            isSelected ? (
              <ClickedDocumentChip companyName="네이버" />
            ):isHovered ? (
              <HoveredDocumentChip companyName="네이버" />
            ): (
              <DefaultDocumentChip companyName="네이버" />
            )
          ) : null;

          {/** 이벤트 */}
          return (
            <div
              key={index}
              className={calendarCellClassName}
              onClick={() => handleDateClick(date)}
              onMouseOver={() => handleDateMouseOver(date)}
              onMouseOut={handleDateMouseOut}
            >
              {dateContent}
              {companySchedules}
            </div>
          );
          })}
      </div>
    </div>
  );
};

export default CustomCalendar;
