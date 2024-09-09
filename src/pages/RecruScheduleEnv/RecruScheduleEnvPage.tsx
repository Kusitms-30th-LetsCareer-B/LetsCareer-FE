import React, { useState } from 'react';

// API 연동 모듈 임포트
import { registerSchedule } from './api/recruScheduleApiService';

// Date picker를 띄우는 컴포넌트와 훅
import PopUpDatePicker from "../../components/PopUpDatePicker";
import useDatePicker from "../../shared/hooks/useDatePicker";

// 아이콘 파일
import prevButtonIcon from "../../shared/assets/calendar-prev.png";
import favoriteStarIconEmpty from "../../shared/assets/favoriteStarEmpty.png";
import favoriteStarIconFilled from "../../shared/assets/favoriteStarFilled.png";

// 컴포넌트
const ScheduleEnvPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [task, setTask] = useState('');
  const [announcementUrl, setAnnouncementUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRemind, setIsRemind] = useState(false);

  const userId = 1; // 예시 userId, 실제로는 로그인 정보 등을 통해 받아와야 함

  // 시작일 관련 훅
  const {
    isDatePickerOpen: isStartDatePickerOpen,
    selectedDate: selectedStartDate,
    handleOpenDatePicker: handleOpenStartDatePicker,
    handleCloseDatePicker: handleCloseStartDatePicker,
    handleDateSelected: handleStartDateSelected,
  } = useDatePicker();

  // 마감일 관련 훅
  const {
    isDatePickerOpen: isEndDatePickerOpen,
    selectedDate: selectedEndDate,
    handleOpenDatePicker: handleOpenEndDatePicker,
    handleCloseDatePicker: handleCloseEndDatePicker,
    handleDateSelected: handleEndDateSelected,
  } = useDatePicker();

  // API 호출 핸들러
  const handleSubmit = async () => {
    if (!companyName || !task || !selectedStartDate || !selectedEndDate) {
      alert('모든 필수 입력값을 입력해주세요.');
      return;
    }

    const scheduleData = {
      companyName,
      isFavorite,
      task,
      isRemind,
      announcementUrl,
      stageStartDate: selectedStartDate.toISOString().split('T')[0],
      stageEndDate: selectedEndDate.toISOString().split('T')[0],
    };

    try {
      const response = await registerSchedule(userId, scheduleData);
      alert(response.message); // 성공 메시지 출력
    } catch (error) {
      alert('채용 일정을 등록하는 데 실패했습니다.');
    }
  };

  return (
    <div className="bg-static-100 rounded-sm p-10">
      {/** 타이틀 */}
      <div className="flex justify-start items-center text-center font-bold text-medium24 text-neutral-0">
        <div className="flex items-center">
          <img src={prevButtonIcon} className="h-[16px]" />
        </div>
        <div className="flex items-center px-5">
          관심 기업의 채용 일정을 등록하고 관리하세요!
        </div>
      </div>

      {/** 기업 정보 입력 */}
      <div className="grid grid-cols-2 py-2 gap-4" style={{ gridTemplateColumns: "100px minmax(0px, 1fr)" }}>
        {/** 기업명 */}
        <div className="flex justify-start items-center">
          <div className="text-start font-semibold text-small18 text-neutral-30">
            기업명
          </div>
          <div className="text-start font-semibold text-small18 text-system-error">
            *
          </div>
        </div>
        <div className="flex justify-start items-center">
          <input
            type="text"
            className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
            placeholder="기업명 검색"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="flex font-medium text-xsmall16 text-neutral-45 px-5">
            {/* isFavorite에 따라 다른 이미지 렌더링 */}
            <img
              className="w-[24px] h-[24px]"
              src={isFavorite ? favoriteStarIconFilled : favoriteStarIconEmpty} 
              alt="favorite icon"
            />
            <div
              className="px-4 cursor-pointer"
              onClick={() => setIsFavorite(!isFavorite)}  // 클릭 시 토글
            >
              {isFavorite ? "관심기업으로 등록됨" : "관심기업으로 등록하기"}
            </div>
          </div>
        </div>

        {/** 직무 */}
        <div className="flex justify-start items-center">
          <div className="text-start font-semibold text-small18 text-neutral-30">직무</div>
          <div className="text-start font-semibold text-small18 text-system-error">*</div>
        </div>
        <div className="flex justify-start items-center">
          <input
            type="text"
            className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
            placeholder="직무 입력"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        {/** 서류 일정 */}
        <div className="flex justify-start items-center">
          <div className="text-start font-semibold text-small18 text-neutral-30">서류 일정</div>
          <div className="text-start font-semibold text-small18 text-system-error">*</div>
        </div>
        <div className="flex justify-start items-center">
          <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]" onClick={handleOpenStartDatePicker}>
            {selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '시작일'}
            {/* 이미지 클릭 시 DatePicker 열기 */}
            <PopUpDatePicker onDateSelected={handleStartDateSelected}/>
          </div>
          <div className="px-5">~</div>
          <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]" onClick={handleOpenEndDatePicker}>
            {selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '마감일'}
            
            {/* 이미지 클릭 시 DatePicker 열기 */}
            <PopUpDatePicker onDateSelected={handleEndDateSelected}/>
          </div>
        </div>

        {/** 마감일 리마인드 */}
        <div className="flex justify-start items-center"></div>
        <div className="flex justify-start items-center">
          <div className="text-start font-regular text-xsmall16 text-neutral-45 mx-2">
            마감일 리마인드 알림을 드릴까요?
          </div>
          <div className="mx-2">
            <input type="checkbox" checked={isRemind} onChange={() => setIsRemind(!isRemind)} />
          </div>
        </div>

        {/** 공고 링크 */}
        <div className="flex justify-start items-center">
          <div className="text-start font-semibold text-small18 text-neutral-30">공고 링크</div>
        </div>
        <div className="flex justify-start items-center">
          <input
            type="text"
            className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
            placeholder="공고 링크"
            value={announcementUrl}
            onChange={(e) => setAnnouncementUrl(e.target.value)}
          />
        </div>
      </div>

      {/** 등록 버튼 */}
      <button className="mt-5 p-3 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
};

export default ScheduleEnvPage;
