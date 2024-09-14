import React, { useEffect, useState } from 'react';

import prevButtonIcon from "../shared/assets/calendar-prev.png";
import nextButtonIcon from "../shared/assets/calendar-next.png";
import filterButtonIcon from "../shared/assets/filter.png";
import addButtonIcon from "../shared/assets/add.png";

// 커스텀 캘린더 훅 임포트
import useCalendar from "../shared/hooks/useCalendar";

// 페이지 전환 훅 임포트
import { useNavigationStatusByRecruitmentId } from "../Path.ts";

// 캘린더 칩스
import {
  filterState,
  DefaultDocumentChip,
  HoveredDocumentChip,
  ClickedDocumentChip,
  DefaultInterviewChip,
  HoveredInterviewChip,
  ClickedInterviewChip,
  DefaultOtherChip,
  HoveredOtherChip,
  ClickedOtherChip,
  DefaultPersonalChip,
  HoveredPersonalChip,
  ClickedPersonalChip,
} from "./chips/CalendarChip";


// 투두 칩스
import {
  // 서류 칩
  DocumentScheduleChip,
  // 면접 칩
  InterviewScheduleChip,
  // 기타 칩
  OtherScheduleChip,
  // 개인 일정 칩
  PersonalScheduleChip
} from "./chips/TodoListChip";




/* Date 관련 hook 임포트 */
import { getYearMonthDay, getStringYear, getStringMonth, getFormattedDate3, getFormattedDate2 } from "../shared/hooks/useDate.ts";


/** 기업 채용 일정 API 연동 관련 이벤트 */
import { getCalendarMonthRecruitmentsList } from '../pages/Calendar/api/calendarMonthRecruitmentsApiService.ts';
import { GetCalendarMonthRecruitmentsResponseType } from '../pages/Calendar/api/calendarMonthRecruitmentsType.ts';


/** 개인 일정 API 연동 관련 이벤트 */
import { getCalendarMonthPersonalWorksList } from '../pages/Calendar/api/calendarMonthPersonalWorksApiService.ts';
import { GetCalendarMonthPersonalWorksResponseType } from '../pages/Calendar/api/calendarMonthPersonalWorksType.ts';


// 캘린더에 띄울 스케줄 칩스 필터 Enum 정의
enum ScheduleFilter {
  ALL = "전체 일정 보기",
  DOCUMENT = "서류 일정 보기" ,
  INTERVIEW = "면접 일정 보기",
  OTHER = "기타 일정 보기"
}


/** Props */
interface CalendarComponentProps {
  userId: number;

  // 부모 컴포에게 전달할 변수/함수들
  // 1. selectedDate:  캘린더에 선택된 날짜
  // 2. recruitmentScheduleChips:  선택된 날짜에 대한 기업 채용 일정 칩스 (디자인: TodoListChip.tsx)
  // 3. personalScheduleChips:     선택된 날짜에 대한 개인 일정 칩스 (디자인: TodoListChip.tsx)
  onDateSelected: (date: Date, 
                   recruitmentScheduleChips: JSX.Element[],
                   personalScheduleChips: JSX.Element[]) => void;
}


/** 캘린더 컴포넌트 */
const CustomCalendar:  React.FC<CalendarComponentProps> = ({userId, onDateSelected}) => {
  /**---------------------------------------------------*/
  /** 디자인 관련 변수, 함수 */
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
    handleNewSchedule,
  } = useCalendar();

  
  // 달력 헤더에 표시할 컬럼명 배열 선언
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 달력에 표시할 날짜 배열 가져오기
  const dates = getDates();


  /**---------------------------------------------------*/
  /** 일정 칩스 필터 이벤트 */
  // 달력에 표시할 일정 종류 상태
  // 초기값은 "전체 일정 보기" 상태
  const [scheduleStage, setScheduleStage] = useState<ScheduleFilter>(ScheduleFilter.ALL);
  
  // 필터 변경 핸들러
  const handleScheduleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScheduleStage(event.target.value as ScheduleFilter);
  };

  
  // 기업 채용 일정 필터링 함수: 선택된 체크박스(전체/서류/면접/기타)에 대한 일정만 가져오기
  const getFilteredRecruitmentDataByStageType = (recruitmentsData: GetCalendarMonthRecruitmentsResponseType[]) => {
    switch (scheduleStage) {
      case ScheduleFilter.DOCUMENT:
        return recruitmentsData.filter((item) => item.filter === filterState.START || item.filter === filterState.FINISH || item.filter === filterState.WRITTEN);
      case ScheduleFilter.INTERVIEW:
        return recruitmentsData.filter((item) => item.filter === filterState.INTERVIEW);
      case ScheduleFilter.OTHER:
        return recruitmentsData.filter((item) => item.filter === filterState.OTHER);
      default:
        return recruitmentsData; // '전체 일정'인 경우 전체 데이터 반환
    }
  };

  // 칩 누르면 해당 기업 상세 페이지로 전환하는 훅
  const navigateByRecruitmentId = useNavigationStatusByRecruitmentId();


  /**---------------------------------------------------*/
  /** API 연동 데이터 관련 변수, 함수 */
  // 기업 채용 일정 원본 데이터
  const [recruitmentsDataList, setRecruitmentsDataList] = useState<GetCalendarMonthRecruitmentsResponseType[]>([]);

  // 기업 채용 일정 파싱 데이터:  필터별 개수 상태
  const [documentCount, setDocumentCount] = useState(0); // 서류
  const [interviewCount, setInterviewCount] = useState(0); // 면접
  const [otherCount, setOtherCount] = useState(0); // 기타


  // 기업 채용 일정 필터링 함수: 선택된 일정에 대한 일정만 가져오기
  const getFilteredRecruitmentDataForDate = (date: Date) => {
    // 기업 채용 일정만 가져와서 파싱
    const recruitmentSchedulesForDate = recruitmentsDataList.filter((data) => {
      // data.date는 'YYYY-MM-DD' 형식의 문자열이므로 Date 객체로 변환
      const dataDate = new Date(data.date);

      return (
        dataDate.getFullYear() === date.getFullYear() &&
        dataDate.getMonth() === date.getMonth() &&
        dataDate.getDate() === date.getDate()
      );
    });

    // <리턴1> 선택된 날짜에 대한 전체 기업 채용 일정 리턴
    //return recruitmentSchedulesForDate;
    
    // <리턴2> 선택박스 필터링 추가 후 리턴
    // 선택박스(전체/서류/면접/기타)에 체크된 기업 채용 일정만 리턴
    return getFilteredRecruitmentDataByStageType(recruitmentSchedulesForDate); // 필터 적용
  };
  
  
  // 개인 일정 원본 데이터
  const [personalWorksDataList, setPersonalWorksDataList] = useState<GetCalendarMonthPersonalWorksResponseType[]>([]);
  
  /** 💗 개인 일정 연동 
   *  특정 날짜의 개인 일정 데이터를 가져오는 함수 */
  const getPersonalWorksForDate = (date: Date) => {
    return personalWorksDataList.filter((data) => {
      const workDate = new Date(data.date);

      return (
        workDate.getFullYear() === date.getFullYear() &&
        workDate.getMonth() === date.getMonth() &&
        workDate.getDate() === date.getDate()
      );
    });
  };



  // 컴포넌트가 렌더링될 때 API 호출
  useEffect(() => {
    // userId가 있어야(로그인 상태여야) 작동되니깐 검증용으로.
    // 달력에 출력되는 날짜가 있어야 request (API 연동) 가능
    if (userId && currentDate) {
      // 달력에 출력된 날짜를 기준으로 API 연동.
      // 꼭 선택된 날짜가 아니어도 되니깐 selectedDate가 아닌 currentDate 이용함.
      const year  = getStringYear(currentDate);
      const month = getStringMonth(currentDate);

      // 기업 채용 일정 + 개인 일정 연동
      const fetchAllCalendarScheduleList = async () => {
        try {
          // 상태 제어
          setLoading(true); // 로딩 상태 시작
          setError(null);   // 에러 초기화

          // 기업 채용 일정 요청 및 응답받기
          const responseRecruitments = await getCalendarMonthRecruitmentsList({ userId, year, month });
          console.log("📫 캘린더쨩 기업 채용 일정 샤랄라~");
          console.log(responseRecruitments); // 백엔드로부터 응답받은 DB 확인
          setRecruitmentsDataList(responseRecruitments.data);  // 원본 DB 저장

          // 개인 일정 요청 및 응답받기
          const responsePersonalWorks = await getCalendarMonthPersonalWorksList({ userId, year, month });
          console.log("📫 캘린더쨩 개인 일정 샤랄라~");
          console.log(responsePersonalWorks); // 백엔드로부터 응답받은 DB 확인
          setPersonalWorksDataList(responsePersonalWorks.data);  // 원본 DB 저장

          /** 참고
          * response는 다음과 같은 형식으로 들어온다. 그 중 data 부분만 저장
          * code: 200
          * data:
          * message:
          */

          
          ////////////////////////////////////////////////////////////////
          // 데이터 파싱:  Response 파싱 DB 저장

          /** 1. 기업 채용 일정 파싱 */
          // 필터별 기업 채용 일정 개수 계산
          const documentItems = responseRecruitments.data.filter(item => item.filter === filterState.START || filterState.FINISH || filterState.WRITTEN); // "서류"
          const interviewItems = responseRecruitments.data.filter(item => item.filter === filterState.INTERVIEW); // "면접"
          const otherItems = responseRecruitments.data.filter(item => item.filter === filterState.OTHER); // 기타 일정
          
          // 필더별 기업 채용 일정 개수 저장
          setDocumentCount(documentItems.length);
          setInterviewCount(interviewItems.length);
          setOtherCount(otherItems.length);


          /** 2. 개인 일정 개수 파싱 */
          

        } catch (error) {
          console.error('월별 채용 일정을 불러오는 중 오류가 발생했습니다:', error);
          setError('월별 채용 일정을 불러오는 중 오류가 발생했습니다.')

        } finally {
          // 상태 제어
          setLoading(false); // 로딩 상태 종료
        }
      };

      
      fetchAllCalendarScheduleList();
    }

  // userId 또는 selecetedDate 또는 currentDate 값이 바뀔 때마다
  // useEffect 함수 호출 및 API 호출 (데이터 새로 불러오기)
  }, [userId, selectedDate, currentDate]);



  /** API 연동 정보를 부모에게 반환 
   * 부모 컴포넌트로 선택된 날짜 및 스케줄 칩스를 전달하는 함수
   *  선택된 날짜에 대한 스케줄 정보를 TodoList Chips로 반환하는 함수
   */
  /* Method1. 투두 칩 반환 함수 */
  const handleDateSelect = (date: Date) => {
    // 캘린더 기존 UI 훅 업뎃
    handleDateClick(date);

    // 연동받은 기업 일정 정보
    const recruitmentsSchedulesForDate = getFilteredRecruitmentDataForDate(date);

    // 연동받은 개인 일정 정보
    const personalSchedulesForDate = getPersonalWorksForDate(date);


    // 기업 일정 칩스 생성
    // recruitmentsData:  위에서 response 받고 저장한 데이터
    const recruitmentScheduleChips = recruitmentsSchedulesForDate.map((recruitmentsData) => {
      // 서류 칩
      const documentStatus = recruitmentsData.filter === filterState.START? "시작":
                             recruitmentsData.filter === filterState.FINISH? "마감": "";

      const documentScheduleChip =
        <DocumentScheduleChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
          status={documentStatus}
        />;
      
      // 면접 칩
      const interviewScheduleChip =
        <InterviewScheduleChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
        />;
      
      // 기타 칩
      const otherScheduleChip =
        <OtherScheduleChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
          contents=""
        />;
      

      // 일정 종류에 맞는 칩을 반환
      return (
        recruitmentsData.filter === filterState.INTERVIEW ? interviewScheduleChip :
        recruitmentsData.filter === filterState.OTHER ? otherScheduleChip :
        documentScheduleChip
      );
    });


    
    // 개인 일정 칩스 생성
    // personalScheduleData:  위에서 response 받고 저장한 데이터
    const personalScheduleChips = personalSchedulesForDate.map((personalScheduleData) => (
      <>
      {/* 디버깅 완료
      {console.log(personalScheduleData)}
      {console.log('믜야!!')}
      */}
      <PersonalScheduleChip key={personalScheduleData.personalScheduleId} contents={personalScheduleData.content} />
      </>
    ));

    
    
    // 부모 컴포넌트로 선택된 날짜와 칩스 전달  (칩스에는 선택된 날짜에 대한 일정 정보가 명시됨)
    onDateSelected(date, recruitmentScheduleChips, personalScheduleChips);
  };
  
  // 현재 선택된 날짜에 대한 스케줄 정보를 Calendar Chips로 반환하는 함수
  /* Method2. 캘린더 칩 반환 함수 */
  /*
  const handleDateSelect = (date: Date) => {
    // 캘린더 기존 UI 훅 업뎃
    handleDateClick(date);
    const recruitmentsSchedulesForDate = getFilteredRecruitmentDataForDate(date);

    const recruitmentScheduleChips = recruitmentsSchedulesForDate.map((recruitmentsData) => {
      // 서류 칩스
      const documentScheduleChip =
        <DefaultDocumentChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
          filter={recruitmentsData.filter}
        />;
      
      // 면접 칩스
      const interviewScheduleChip =
        <DefaultInterviewChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
        />;
      
      // 기타 칩스
      const otherScheduleChip =
        <DefaultOtherChip
          key={recruitmentsData.scheduleId}
          companyName={recruitmentsData.companyName}
        />;
      

      // 일정 종류에 맞는 칩을 반환
      return (
        recruitmentsData.filter === filterState.INTERVIEW ? interviewScheduleChip :
        recruitmentsData.filter === filterState.OTHER ? otherScheduleChip :
        documentScheduleChip
      );
    });
    
    
    // 부모 컴포넌트로 선택된 날짜와 그에 대한 일정 칩스를 전달하는 함수 호출
    onDateSelected(date, recruitmentScheduleChips);
  };
  */


  /**---------------------------------------------------*/
  /** 상태 관련 변수, 함수 */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  /**---------------------------------------------------*/
  // 로딩 상태 처리, rendering
  if (loading) {
    return <div>일정을 불러오는 중입니다...</div>;
  }

  // 에러 상태 처리, rendering
  if (error) {
    return <div>{error}</div>;
  }

  // 정상 상태 처리, rendering
  return (
    /* 캘린더 전체 윤곽 컨테이너 스타일 */
    /* 캘린더 칩스가 캘린더 date cell 밖으로 삐져나오지 않게 캘린더 min width 지정함 */
    <div className="bg-neutral-100 p-4 font-sans shadow-none min-w-[900px]">

      {/* 달력 헤더 파트 */}
      <div className="flex justify-between h-[full] w-[full]">
        {/* 좌측 아이템: 달력 무빙, 현황 메인보드 */}
        <div className="flex items-center mb-4">
          {/* 캘린더 월 무빙 헤더 (월 이동 버튼) */}
          <button onClick={handlePrevMonth} className="px-4">
            <img src={prevButtonIcon} alt="이전 달" />
          </button>
          <h2 className="flex justify-center items-center text-small20 font-bold min-w-[125px]">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
            {/**영문: {monthNames[currentDate.getMonth()]}*/}
          </h2>
          <button onClick={handleNextMonth} className="px-4">
            <img src={nextButtonIcon} alt="다음 달" />
          </button>


          {/* 캘린더 상태 보더: 필터별 일정 개수 표시  */}
          <div className="font-regular mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-secondary-100 text-xxsmall11 text-secondary-0" />
            <div className="font-xxsmall12 min-w-[60px] mr-2 flex items-center justify-center px-0.5 text-xxsmall12 text-neutral-30">
              서류 {documentCount}건
            </div>
            <div className="font-regular mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-100 text-xxsmall11 text-primary-0" />
            <div className="font-xxsmall12 min-w-[60px] mr-2 flex items-center justify-center px-0.5 text-xxsmall12 text-neutral-30">
              면접 {interviewCount}건
            </div>
            <div className="font-regular mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-normal text-xxsmall11 text-teritory-0" />
            <div className="font-xxsmall12 min-w-[60px] mr-2 flex items-center justify-center px-0.5 text-xxsmall12 text-neutral-30">
              기타 {otherCount}건
          </div>
        </div>

        
        {/* 우측 아이템: 일정 선택박스, 일정 추가 버튼 */}
        <div className="flex items-center mb-4 mr-4 h-[full] w-[full]">
          {/* 전체 일정 보기 버튼 */}
          {/* 캘린더 필터 선택 박스 */}
          <div className="font-xxsmall12 flex h-9 w-36 items-center justify-start rounded-xs border border-neutral-80 bg-static-100 px-2 text-xxsmall12 text-neutral-45">
            <select className="cursor-pointer px-2" id="scheduleFilter" value={scheduleStage} onChange={handleScheduleStageChange}>
              <option value={ScheduleFilter.ALL}>{ScheduleFilter.ALL}</option>
              <option value={ScheduleFilter.DOCUMENT}>{ScheduleFilter.DOCUMENT}</option>
              <option value={ScheduleFilter.INTERVIEW}>{ScheduleFilter.INTERVIEW}</option>
              <option value={ScheduleFilter.OTHER}>{ScheduleFilter.OTHER}</option>
            </select>
          </div>


          <p className="px-1.5" />

          {/* 새 채용 일정 추가하기 버튼 */}
          <button
            onClick={handleNewSchedule}
            className="font-xxsmall12 flex h-[35px] w-[170px] items-center justify-start rounded-xs bg-primary-100 text-xxsmall12 text-static-100"
          >
            <img
              className="px-3"
              src={addButtonIcon}
              alt="새 채용일정 추가하기"
            />
            새 채용일정 추가하기
          </button>
        </div>
      </div>

      {/* 달력 파트 */}
      <div className="grid grid-cols-7 gap-0 h-[full] w-[full]">
        {/**요일 컬럼*/}
        {daysOfWeek.map((day) => (
          <div
            key={day} // SUN ~ SAT 고윳값 맞음
            className="bg-transparent p-2 text-center text-xsmall14 uppercase text-neutral-45"
          >
            {day}
          </div>
        ))}

        {/**날짜 셀*/}
        {dates.map((date, index) => {
          // const isToday = date && date.toDateString() === new Date().toDateString();
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
          //const isSunday = date && date.getDay() === 0;   // 모든 일요일 가져오기
          const isSunday =
            date &&
            date.getDay() === 0 &&
            date.getMonth() === currentDate.getMonth(); // 이번 달 일요일만 가져오기
          const isNextMonth = date && date.getMonth() > currentDate.getMonth();
          const isFifteenth = date && date.getDate() === 15; // 15일인지 확인



          {/** 특정 날짜 셀 UI 매뉴얼 */
           /* ---------------------------------------------------------------
            * 오늘 셀:    ${isToday ? 'bg-blue-200' : ''}
            * 다음 달 셀: ${isNextMonth ? 'text-gray-400' : ''}
            * 선택된 셀:  ${isSelected ? 'bg-blue-500 text-white' : ''}
            * 호버된 셀:  ${isHovered ? 'bg-blue-100' : ''}
            * 현재달과 다음달 셀 다르게:  ${isCurrentMonth ? 'bg-white text-gray-600 hover:bg-gray-200' : 'bg-white text-gray-300'}
            */
          }
          
          {/** 캘린더에 띄울 전체 날짜 '셀' 디자인: 셀 크기, 보더 등 */}
          const calendarCellClassName =
            // 기본 (전체 날짜 셀에 공용으로 들어갈 디자인)
            // 일요일
            // 다음달
            // 현재달
            // 이전달
            `
            justify-start items-end text-left border-r border-b border-neutral-80 cursor-pointer bg-white h-[120px] w-[123px] p-2
            ${isSunday ? "text-system-error" : ""}
            ${isNextMonth ? "text-neutral-70" : ""}
            ${isCurrentMonth ? "text-neutral-45" : "text-neutral-70"}
          `;


          {/** 특정 날짜 셀 '텍스트 데이터' 디자인 퍼블리싱 */}
          const dateContent = date ? (
            /* 호버 상태인 셀에 동그라미 표시 */
            <span className={`flex h-6 w-6 justify-center items-center text-xsmall16 ${isHovered ? "border rounded-full border-primary-100 bg-primary-100 text-white" : ""}`}>

              {/* 호버 상태인 날짜 셀에 들어갈 데이터 공용 디자인, mb-1: 날짜 텍스트 아래 조금 띄우기 */}
              <div className="flex justify-center items-center mb-1">
                {date.getDate()}
              </div>
            </span>
          ) : null;


          
          {/** 기업 채용 일정 칩 */}
          // 현재 보이는 월의 전체 기업 일정 중에서
          // 각 날짜 셀에 대한 기업 일정만 가져오기
          const recruitmentsSchedulesForDate = getFilteredRecruitmentDataForDate(date);

          {/** 각 칩스에 대한 데이터 셀에 띄울 디자인 적용하는 부분 */}
          {/** CalendarChips를 셀에 추가:  API 연동받은 정보를 참고하여 선택된 날짜에 대해 기업 일정 칩스 추가 */}
          const companySchedules = recruitmentsSchedulesForDate.map((recruitmentsData) => {
            // 고유한 기업채용일정 key 설정
            const key = `company-${recruitmentsData.scheduleId}`;

            // 서류 칩스
            const documentScheduleChip = 
              // 셀 선택 상태
              isSelected ?
              <ClickedDocumentChip 
                key={key}
                filter={recruitmentsData.filter}
                companyName={recruitmentsData.companyName} 
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />
              :
              // 셀 호버 상태
              isHovered?
              <HoveredDocumentChip 
                key={key}
                filter={recruitmentsData.filter}
                companyName={recruitmentsData.companyName} 
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              /> 
              :
              // 셀 기본 상태
              <DefaultDocumentChip
                key={key}
                filter={recruitmentsData.filter}
                companyName={recruitmentsData.companyName}
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />
            
            // 면접 칩스
            const interviewScheduleChip =
              // 셀 선택 상태
              isSelected ?
              <ClickedInterviewChip 
                key={key}
                companyName={recruitmentsData.companyName}
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />
              :
              // 셀 호버 상태
              isHovered?
              <HoveredInterviewChip 
                key={key}
                companyName={recruitmentsData.companyName} 
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              /> 
              :
              // 셀 기본 상태
              <DefaultInterviewChip
                key={key}
                companyName={recruitmentsData.companyName}
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />

            // 기타 칩스
            const otherScheduleChip =
              // 셀 선택 상태
              isSelected ?
              <ClickedOtherChip 
                key={key}
                companyName={recruitmentsData.companyName} 
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />
              :
              // 셀 호버 상태
              isHovered?
              <HoveredOtherChip 
                key={key}
                companyName={recruitmentsData.companyName} 
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              /> 
              :
              // 셀 기본 상태
              <DefaultOtherChip
                key={key}
                companyName={recruitmentsData.companyName}
                onClick={() => navigateByRecruitmentId(recruitmentsData.recruitmentId)}
              />
              //console.log(recruitmentsData.filter) // 확인 완료
              
            return (
              <div>
                {
                  // 면접 칩 반환
                  recruitmentsData.filter == filterState.INTERVIEW?
                  interviewScheduleChip
                  :

                  // 기타 칩 반환
                  recruitmentsData.filter == filterState.OTHER?
                  otherScheduleChip
                  :

                  // 서류 칩 반환
                  documentScheduleChip
                }
              </div>
            );
          });

          
          {/** 개인 일정 칩 */}
          // 현재 보이는 월의 전체 개인 일정 중에서
          // 각 날짜 셀에 대한 개인 일정만 가져오기
          const personalSchedulesForDate = getPersonalWorksForDate(date);

          
          {/** 각 칩스에 대한 데이터 셀에 띄울 디자인 적용하는 부분 */}
          {/** CalendarChips를 셀에 추가:  API 연동받은 정보를 참고하여 선택된 날짜에 대해 기업 일정 칩스 추가 */}
          const personalSchedules = personalSchedulesForDate.map((personalScheduleForDate) => {
            // 고유한 개인일정 key 설정
            const key = `personal-${personalScheduleForDate.personalScheduleId}`;

            // 개인 일정칩스
            const personalScheduleChip = 
              // 셀 선택 상태
              isSelected ?
              <ClickedPersonalChip
                key={key}
                personalSchedule={personalScheduleForDate.content}
              />
              :
              // 셀 호버 상태
              isHovered?
              <HoveredPersonalChip
                key={key}
                personalSchedule={personalScheduleForDate.content}
              /> 
              :
              // 셀 기본 상태
              <DefaultPersonalChip
                key={key}
                personalSchedule={personalScheduleForDate.content}
              />

            
            return (
              // 개인 일정 칩 반환
              personalScheduleChip
            );
          });

                  
          {
            /** 임시로 매월 15일마다 칩을 추가한 코드 */
          }
          { /**
          const companySchedules = isFifteenth ? (
            // 선택 상태
            isSelected ? (
              <ClickedDocumentChip companyName="네이버" />
            ) : // 호버 상태
            isHovered ? (
              <HoveredDocumentChip companyName="네이버" />
            ) : (
              // 기본 상태
              <DefaultDocumentChip companyName="네이버" />
            )
          ) : null;
          */
          }


          {
            /** 달력 셀에 출력 내용 + 이벤트*/
          }
          return (
            <div
              key={date ? `${getFormattedDate3(date)}`: index} // 고유한 key 생성: 날짜 데이터, index는 date (1일, 2일, ...이라 달이 중첩되면 중복값됨)
              className={calendarCellClassName}
              onClick={() => handleDateSelect(date)}
              onMouseOver={() => handleDateMouseOver(date)}
              onMouseOut={handleDateMouseOut}
            >
              {/** 날짜 데이터 출력 */}
              {dateContent}

              {/** 기업 일정 칩스 출력 */}
              {companySchedules}

              {/** 개인 일정 칩스 출력 */}
              {personalSchedules}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
