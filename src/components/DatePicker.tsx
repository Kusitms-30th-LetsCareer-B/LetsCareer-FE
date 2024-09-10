import React, { useState } from "react";
import prevButtonIcon from "../shared/assets/calendar-prev.png";
import nextButtonIcon from "../shared/assets/calendar-next.png";
import filterButtonIcon from "../shared/assets/filter.png";
import addButtonIcon from "../shared/assets/add.png";

// 커스텀 훅 임포트
import useCalendar from "../shared/hooks/useCalendar";
import { getFormattedDate5 } from "../shared/hooks/useDate";

interface DatePickerProps {
  onCancel: () => void; // 취소 버튼 클릭 시 호출될 함수
  onSelect: (date: Date) => void; // 선택완료 버튼 클릭 시 호출될 함수
  message: string;
}

// 캘린더 컴포넌트
const DatePicker = ({ onCancel, onSelect, message }: DatePickerProps) => {
  // 커스텀 캘린더 훅에서 상태와 핸들러 가져오기
  const {
    currentDate,
    selectedDate,
    hoveredDate,
    getCurrentDates,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    handleDateMouseOver,
    handleDateMouseOut,
    handleAllSchedule,
    handleNewSchedule,
  } = useCalendar();

  // 달력 헤더에 표시할 컬럼명 배열 선언
  const daysOfWeekEng = ["S", "M", "T", "W", "T", "F", "S"];
  const daysOfWeekKor = ["일", "월", "화", "수", "목", "금", "토"];

  // 달력에 표시할 날짜 배열 가져오기
  const dates = getCurrentDates();

  // 일정 선택완료 버튼 클릭시 부모 컴포넌트로 날짜 반환
  const handleConfirmSelection = () => {
    if (selectedDate) {
      onSelect(selectedDate);
    }
  };

  return (
    /* 캘린더 전체 윤곽 컨테이너 스타일 */
    <div className="w-[360px] rounded-lg border border-neutral-90 bg-static-100 font-sans shadow-xl">
      {" "}
      {/* width를 360px로 고정함. w-[360px] 삭제하면 반응형으로 됨 */}
      {/* 첫 번째 헤더 파트 */}
      <div>
        {/* 메세지 출력 필드 (mb-4: bottom 4칸 띄우기) */}
        <div className="px-5 py-5 text-xsmall14 text-neutral-30">{message}</div>

        {/* 오늘 날짜 출력 */}
        {/* 선택된 날짜 출력를 출력하고 싶으면 (new Date) 대신에 selectedDate 넣기 */}
        {/*
        <div className="font-semibold text-medium24 text-static-0 px-5 mb-6">
          {(new Date).getMonth()+1}월 {(new Date).getDate()}일 {`(`}{daysOfWeekKor[(new Date).getDay()]}{`)`}
        </div> */}

        {/* (수정)
         * 선택이 안 되었으면: 오늘 날짜 출력
         * 선택이 되었으면:    선택된 날짜 출력
         */}
        <div className="mb-6 px-5 text-medium24 font-semibold text-static-0">
          {selectedDate
            ? getFormattedDate5(selectedDate)
            : getFormattedDate5(new Date())}
        </div>

        {/* 수평선 라인 (MarkDown에서 --- ) */}
        <hr className="my-6 border-t-2 border-schemes-outline_variant" />
      </div>
      {/* 두 번째 헤더 파트 */}
      <div className="flex items-center justify-between">
        {" "}
        {/* 아이템을 한 줄로 하되 하나는 우측정렬, 하나는 좌측정렬 */}
        {/* 좌측에 정렬할 아이템 */}
        <div className="flex items-center justify-center">
          {" "}
          {/* 아이템을 한 줄로 정렬 */}
          {/* 이번 년도/달 출력 */}
          <div className="px-5 text-xsmall14 font-medium text-neutral-30">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </div>
          {/* 뒤집어진 삼각형 버튼 */}
          <div
            className="h-0 w-0 border-neutral-30 border-l-transparent border-r-transparent"
            style={{
              borderLeftWidth: "6px",
              borderRightWidth: "6px",
              borderTopWidth: "6px",
            }}
          ></div>
        </div>
        {/* 우측에 정렬할 아이템 */}
        <div>
          {/* 월 이동 버튼 */}
          <button onClick={handlePrevMonth} className="px-4">
            <img src={prevButtonIcon} alt="이전 달" />
          </button>
          <button onClick={handleNextMonth} className="px-4">
            <img src={nextButtonIcon} alt="다음 달" />
          </button>
        </div>
      </div>
      {/* 달력 파트 */}
      <div className="grid grid-cols-7 gap-0">
        {/**요일 컬럼*/}
        {daysOfWeekEng.map((day, index) => (
          // 디버깅 완료: day를 key로 하면 오류남.
          // day는 SAT/SUN 모두 'S'로 표현되고, 화/목도 'T'로 표현되어서 고유한 key가 아님.
          // index를 조합하여 고유한 key 값 생성
          <div
            key={`${day}-${index}`}
            className="bg-transparent p-2 text-center text-xxsmall12 uppercase text-neutral-30"
          >
            {day}
          </div>
        ))}
        
        {/** 특정 날짜 셀 UI */}
        {dates.map((date, index) => {
          const isToday =
            date && date.toDateString() === new Date().toDateString();
          const isSelected =
            date &&
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();
          const isHovered =
            date &&
            hoveredDate &&
            date.toDateString() === hoveredDate.toDateString();
          const isCurrentMonth =
            date && date.getMonth() === currentDate.getMonth();
          const isSunday =
            date &&
            date.getDay() === 0 &&
            date.getMonth() === currentDate.getMonth(); // 이번 달 일요일만 가져오기
          const isNextMonth = date && date.getMonth() > currentDate.getMonth();
          const isFifteenth = date && date.getDate() === 15; // 15일인지 확인

          {
            /** 모든 셀이 동일한 UI인 캘린더 */
          }
          const calendarCellClassName = `flex justify-center items-center text-center bg-white text-xsmall16 text-neutral-30 cursor-pointer h-10`;

          {
            /** 특정 날짜 셀 데이터 */
          }
          const dateContent = date ? (
            /* 선택, 호버 상태인 셀에 동그라미 표시 */
            <span
              className={`flex items-center justify-center ${isSelected ? "border-5 h-10 w-10 rounded-full border-primary-100 bg-primary-100 text-white" : ""} ${isHovered ? "border-5 h-10 w-10 rounded-full border-primary-100 bg-primary-100 text-white" : ""}`}
            > 
              {/* 날짜 셀에 들어갈 데이터 */}
              {date.getDate()}
            </span>
          ) : null;


          // 디버깅 완료: uniqueKey를 index로만 하면 안 되고 date 값도 해줘야 충돌 안 남
          const uniqueKey = date ? `${date.toISOString()}-${index}` : `empty-${index}`;
          return (
            <div
              key={uniqueKey}
              className={calendarCellClassName}
              onClick={() => handleDateClick(date)}
              onMouseOver={() => handleDateMouseOver(date)}
              onMouseOut={handleDateMouseOut}
            >
              {dateContent}
            </div>
          );
        })}
      </div>
      {/** 마지막 파트 */}
      <div className="flex justify-end px-5 py-3">
        {" "}
        {/*아이템들을 선형으로 우측 정렬*/}
        {/* 취소 버튼 */}
        <div
          onClick={onCancel}
          className="cursor-pointer rounded-lg px-7 text-xsmall14 text-neutral-40 hover:text-primary-100"
        >
          취소
        </div>
        {/* 선택완료 버튼 */}
        <div
          onClick={handleConfirmSelection}
          className="cursor-pointer rounded-lg text-xsmall14 text-neutral-40 hover:text-primary-100"
        >
          선택완료
        </div>
        <br />
      </div>
    </div>
  );
};

export default DatePicker;
