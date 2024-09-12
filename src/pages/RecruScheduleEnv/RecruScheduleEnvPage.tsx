import React, { useEffect, useState } from 'react';
import { useGoBack } from "../../shared/hooks/useGoBack"; // 이전 페이지로 전환하기 위한 훅

// API 연동 모듈 임포트
import { registerSchedule } from './api/recruScheduleApiService';

// Date picker를 띄우는 컴포넌트와 훅
import PopUpDatePicker from "../../components/PopUpDatePicker";
import useDatePicker from "../../shared/hooks/useDatePicker";

// 아이콘 파일
import prevButtonIcon from "../../shared/assets/calendar-prev.png";
import favoriteStarIconEmpty from "../../shared/assets/favoriteStarEmpty.png";
import favoriteStarIconFilled from "../../shared/assets/favoriteStarFilled.png";

// Date 관련 훅
import { getFormattedDate3 } from "../../shared/hooks/useDate"
import { GoBackButton } from '../../components/Buttons/Button';

// 컴포넌트
const ScheduleEnvPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [companyName, setCompanyName] = useState('');
  const [task, setTask] = useState('');
  const [announcementUrl, setAnnouncementUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRemind, setIsRemind] = useState(false);
  const goBack = useGoBack(); // 뒤로 가기 핸들러

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
      goBack(); // 등록하기 버튼 클릭 후 자동으로 이전 페이지로 가기
      
    } catch (error) {
      alert('채용 일정을 등록하는 데 실패했습니다.');
    }
  };


  return (
    <div className="bg-static-100 h-[780px] rounded-sm p-10">
      <div className='flex justify-between items-center'>
        {/** 타이틀 */}
        <GoBackButton text="관심 기업의 채용 일정을 등록하고 관리하세요!" />
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
            className="text-start rounded-sm border border-neutral-80 font-regular text-xsmall16 text-neutral-30 p-5 min-w-[550px] px-[20px] py-[14px] placeholder:text-neutral-45 focus:outline-none"
            placeholder="기업명 검색"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div 
            className="flex font-medium text-xsmall16 text-neutral-45 px-5"
            onClick={() => setIsFavorite(!isFavorite)}  // 클릭 시 토글
          >
            {/* isFavorite에 따라 다른 이미지 렌더링 */}
            <img
              className="w-[24px] h-[24px]"
              src={isFavorite ? favoriteStarIconFilled : favoriteStarIconEmpty} 
              alt="favorite icon"
            />
            <div
              className="px-4 cursor-pointer min-w-[200px]"
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
            className="text-start rounded-sm border border-neutral-80 font-regular text-xsmall16 text-neutral-30 min-w-[550px] px-[20px] py-[14px] placeholder:text-neutral-45 focus:outline-none"
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
          <div className={`flex justify-between text-start rounded-sm border border-neutral-80 font-regular text-xsmall16 min-w-[248px] px-[20px] py-[14px] ${selectedStartDate ? "text-neutral-30" : "text-neutral-45"}`} onClick={handleOpenStartDatePicker}>
            {/* 선택된 날짜 포매팅 후 출력 */}
            {selectedStartDate ? getFormattedDate3(selectedStartDate) : '시작일'}
            
            {/* 이미지 클릭 시 DatePicker 열기 */}
            <PopUpDatePicker onDateSelected={handleStartDateSelected}/>
          </div>
          <div className="px-5">~</div>
          <div className={`flex justify-between text-start rounded-sm border border-neutral-80 font-regular text-xsmall16 min-w-[248px] px-[20px] py-[14px] ${selectedEndDate ? "text-neutral-30" : "text-neutral-45"}`} onClick={handleOpenEndDatePicker}>
            {/* 선택된 날짜 포매팅 후 출력 */}
            {selectedEndDate ? getFormattedDate3(selectedEndDate) : '마감일'}
            
            {/* 이미지 클릭 시 DatePicker 열기 */}
            <PopUpDatePicker onDateSelected={handleEndDateSelected}/>
          </div>
        </div>

        {/** 마감일 리마인드 */}
        <div className="flex justify-start items-center"></div> {/* 1열: 빈칸셀 */}
        <div className="flex justify-start items-center">       {/* 2열: 알림여부셀 */}
          <div className="text-start font-regular text-xsmall16 text-neutral-45 mx-2 min-w-[250px]">
            마감일 리마인드 알림을 드릴까요?
          </div>
          <div className="">
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
            className="text-start rounded-sm border border-neutral-80 font-regular text-xsmall16 text-neutral-30 min-w-[550px] px-[20px] py-[14px] placeholder:text-neutral-45 focus:outline-none"
            placeholder="공고 링크"
            value={announcementUrl}
            onChange={(e) => setAnnouncementUrl(e.target.value)}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <button className="px-[20px] py-[12px] min-w-[300px] mt-[40px] mb-[40px] mr-[130px] bg-primary-100 text-white rounded-md" onClick={handleSubmit}>
            등록하기
        </button>
      </div>
    </div>
  );
};

export default ScheduleEnvPage;
