import React, { useState } from 'react';
import prevButtonIcon from "../shared/assets/calendar-prev.png"
import nextButtonIcon from "../shared/assets/calendar-next.png"
import filterButtonIcon from "../shared/assets/filter.png"
import addButtonIcon from "../shared/assets/add.png"

// 커스텀 훅 임포트
import useCalendar from '../shared/hooks/useCalendar';

// 칩스
import { DefaultDocumentChip, HoveredDocumentChip, ClickedDocumentChip,
  DefaultInterviewChip, HoveredInterviewChip, ClickedInterviewChip,
  DefaultOtherChip, HoveredOtherChip, ClickedOtherChip,
  DefaultPersonalChip, HoveredPersonalChip, ClickedPersonalChip } from "./chips/CalendarChip"


// 캘린더 컴포넌트
const CustomCalendar = () => {
  // 커스텀 캘린더 훅에서 상태와 핸들러 가져오기
  const {
    currentDate,
    selectedDate,
    hoveredDate,
    getDates,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    handleDateMouseOver,
    handleDateMouseOut,
    handleAllSchedule,
    handleNewSchedule
  } = useCalendar();

  // 달력 헤더에 표시할 컬럼명 배열 선언
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // 달력에 표시할 날짜 배열 가져오기
  const dates = getDates();


  return (
    /* 캘린더 전체 윤곽 컨테이너 스타일 */
    <div className="p-4 font-sans bg-neutral-100 shadow-none">

      {/* 달력 헤더 파트 */}
      <div className="flex items-center mb-4">

        {/* 월 이동 버튼 */}
        <button onClick={handlePrevMonth} className="px-4">
          <img src={prevButtonIcon} alt='이전 달'/>
        </button>
        <h2 className="text-small20 font-bold">
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



      {/* 달력 파트 */}
      <div className="grid grid-cols-7 gap-0">

        {/**요일 컬럼*/}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xsmall14 uppercase text-neutral-45 bg-transparent p-2">
            {day}
          </div>
        ))}


        {/**날짜 셀*/}
        {dates.map((date, index) => {
          const isToday = date && date.toDateString() === new Date().toDateString();
          const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
          const isHovered = date && hoveredDate && date.toDateString() === hoveredDate.toDateString();
          const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();
          //const isSunday = date && date.getDay() === 0;   // 모든 일요일 가져오기
          const isSunday = date && date.getDay() === 0 && date.getMonth() === currentDate.getMonth(); // 이번 달 일요일만 가져오기
          const isNextMonth = date && date.getMonth() > currentDate.getMonth();
          const isFifteenth = date && date.getDate() === 15; // 15일인지 확인


          {/** 특정 날짜 셀 UI */}
          {/*오늘 셀:    ${isToday ? 'bg-blue-200' : ''} 
            *다음 달 셀: ${isNextMonth ? 'text-gray-400' : ''}
            *선택된 셀:  ${isSelected ? 'bg-blue-500 text-white' : ''}
            *호버된 셀:  ${isHovered ? 'bg-blue-100' : ''}
            *현재달과 다음달 셀 다르게:  ${isCurrentMonth ? 'bg-white text-gray-600 hover:bg-gray-200' : 'bg-white text-gray-300'}
            */}
          const calendarCellClassName = 
          // 기본
          // 일요일
          // 다음달
          // 현재달
          // 이전달
          `
            justify-start items-end text-left border-r border-b border-neutral-80 cursor-pointer bg-white h-36 p-2
            ${isSunday ? 'text-system-error' : ''}
            ${isNextMonth ? 'text-neutral-70' : ''}
            ${isCurrentMonth ? 'text-neutral-45' : 'text-neutral-70'}
          `;
          
          {/** 특정 날짜 셀 데이터 */}
          const dateContent = date ? ((
              /* 호버 상태인 셀에 동그라미 표시 */
              <span
                className={`flex items-center text-xsmall16 justify-center w-5 h-5 
                  ${isHovered ? 'rounded-full bg-primary-100 border-5 border-primary-100 text-white' : ''}`}
              >
                {/* 날짜 셀에 들어갈 데이터 */}
                {date.getDate()}
              </span>
            )
          ) : null;


          {/** 일정 추가:  API 연동 부분 */}
          {/** 일단 임시로 15일이면 칩 추가함. */}
          const companySchedules = isFifteenth ? (
            /* 선택 상태 */
            isSelected ? (
              <ClickedDocumentChip companyName="네이버" />

            /* 호버 상태 */
            ):isHovered ? (
              <HoveredDocumentChip companyName="네이버" />

            /* 기본 상태 */
            ): (
              <DefaultDocumentChip companyName="네이버" />
            )
          ) : null;


          {/** 달력 셀에 출력 내용 + 이벤트 */}
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
