// 이전으로가기 아이콘
import prevButtonIcon from "../../shared/assets/calendar-prev.png"

// 즐겨찾기 아이콘
import favoriteStarIcon from "../../shared/assets/favoriteStar.png"

// Date picker를 띄우는 컴포, Date picker 관련 훅
import PopUpDatePicker from "../../components/PopUpDatePicker"
import useDatePicker from "../../shared/hooks/useDatePicker"
import { getFormattedDate3 } from "../../shared/hooks/useDate.ts";

// 개인 일정 API 연동


/** 컴포넌트 */
const ScheduleEnvPage = () => {
  /* 데이터피커 관련 훅 */
  // 시작일 관련
  // 사용할 훅 불러오기: 사용할 훅 별칭 정하기
  const {
    isDatePickerOpen: isStartDatePickerOpen,
    selectedDate: selectedStartDate,
    handleOpenDatePicker: handleOpenStartDatePicker,
    handleCloseDatePicker: handleCloseStartDatePicker,
    handleDateSelected: handleStartDateSelected,
  } = useDatePicker();

  // 마감일 관련
  // 사용할 훅 불러오기: 사용할 훅 별칭 정하기
  const {
    isDatePickerOpen: isEndDatePickerOpen,
    selectedDate: selectedEndDate,
    handleOpenDatePicker: handleOpenEndDatePicker,
    handleCloseDatePicker: handleCloseEndDatePicker,
    handleDateSelected: handleEndDateSelected,
  } = useDatePicker();

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
        <div className="grid grid-cols-2 py-2 gap-4"
        style={{ gridTemplateColumns: "100px minmax(0px, 1fr)" }}>
            
            {/** 1. 기업명 */}
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 라벨 */}
                <div className="text-start font-semibold text-small18 text-neutral-30">
                    기업명
                </div>
                {/* 필수 표식*/}
                <div className="text-start font-semibold text-small18 text-system-error">
                    *
                </div>
            </div>
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 텍스트 필드 */}
                <input type="text" 
                       className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
                       placeholder="기업명 검색"
                       /*
                       value={companyNameInput}
                       onChange={(e) => setCompanyNameInput(e.target.value)}
                       */
                />

                {/* 즐겨찾기 버튼 */}
                <div className="flex font-medium text-xsmall16 text-neutral-45 px-5">
                    <img src={favoriteStarIcon}/>
                    <div className="px-4">
                        관심기업으로 등록하기
                    </div>
                </div>
            </div>

            
            {/** 2. 직무 */}
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 라벨 */}
                <div className="text-start font-semibold text-small18 text-neutral-30">
                    직무
                </div>
                {/* 필수 표식*/}
                <div className="text-start font-semibold text-small18 text-system-error">
                    *
                </div>
            </div>
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 텍스트 필드 */}
                <input type="text" 
                       className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
                       placeholder="직무 입력"
                       /*
                       value={jobInput}
                       onChange={(e) => setJobInput(e.target.value)}
                       */
                />
            </div>

            
            {/** 3. 서류 일정 */}
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 라벨 */}
                <div className="text-start font-semibold text-small18 text-neutral-30">
                    서류 일정
                </div>
                {/* 필수 표식*/}
                <div className="text-start font-semibold text-small18 text-system-error">
                    *
                </div>
            </div>
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 시작일 */}
                <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]">
                    {/* 시작일이 선택되었으면 선택된 날짜 데이터를 2024-09-05 형식으로 출력 */}
                    {selectedStartDate ? getFormattedDate3(selectedEndDate) : '시작일'}
                    
                    {/* 이미지 클릭 시 DatePicker 열기 */}
                    <PopUpDatePicker onDateSelected={handleStartDateSelected}/>
                </div>

                <div className="text-center px-5">
                    ~
                </div>

                {/* 마감일 */}
                <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]">
                    {/* 마감일이 선택되었으면 선택된 날짜 데이터를 2024-09-05 형식으로 출력 */}
                    {selectedEndDate ? getFormattedDate3(selectedEndDate) : '마감일'}
                    
                    {/* 이미지 클릭 시 DatePicker 열기 */}
                    <PopUpDatePicker onDateSelected={handleEndDateSelected}/>
                </div>
                
            </div>

            
            {/** 4. 마감일 리마인드 */}
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                
            </div>
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 선택 버튼 */}
                <div className="text-start  font-regular text-xsmall16 text-neutral-45 mx-2">
                    마감일 리마인드 알림을 드릴까요?
                </div>
                <div className="mx-2">
                    <img />
                </div>
                <div className="text-start  font-regular text-xsmall16 text-neutral-45 mx-2">
                    예
                </div>
                <div className="mx-2">
                    <img />
                </div>
                <div className="text-start  font-regular text-xsmall16 text-neutral-45 mx-2">
                    아니오
                </div>
            </div>

            {/** 5. 공고 링크 */}
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 라벨 */}
                <div className="text-start font-semibold text-small18 text-neutral-30">
                    공고 링크
                </div>
            </div>
            <div className="flex justify-start items-center text-center font-semibold text-small18 text-neutral-30">
                {/* 텍스트 필드 */}
                <img />
                <input type="text" 
                       className="text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[550px]"
                       placeholder="공고 링크"
                       /*
                       value={announcementLinkInput}
                       onChange={(e) => setAnnouncementLinkInput(e.target.value)}
                       */
                />
            </div>
        </div>
    </div>
  );
}

export default ScheduleEnvPage;
