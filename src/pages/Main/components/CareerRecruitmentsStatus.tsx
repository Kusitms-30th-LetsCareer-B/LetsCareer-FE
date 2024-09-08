import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate 훅
import { Ddayh24Chip } from "../../../components/chips/DdayChip.tsx";
import { getCareerList } from "../api/careerRecruitmentsStatusApiService.ts"; // API 모듈에서 함수 임포트
import nextButtonIcon from "../../../shared/assets/calendar-next.png";

// 상태 칩스
import { PrepareDocumentChip, PassDocumentChip, PrepareInterviewChip, PassInterviewChip, OtherStatusChip } from "../../../components/chips/StatusChip.tsx";

// API 연동 타입
import { GetParamsRecruitmentStatusType, GetRequestRecruitmentStatusType } from "../api/careerRecruitmentsStatusType.ts"

/** 더미
 *  end_date:2024-11-01
    is_final:true
    start_date:
    created_time:2024-09-05 08:45:14.043764
    recruitment_id:1
    stage_id:4
    updated_time:2024-09-05 08:45:14.043764
    stage_name:최종면접
    status:PROGRESS
 */
/** stauts 종류
 * PROGRESS
 * PASSES
 * FAILED
 */
// 각 Career 항목의 타입 정의
interface Career {
  recruitmentId: number;
  companyName: string;
  task: string;
  status: string;
  endDate: string;
  daysUntilEnd: number;
  stageName: string;
}

/*
stage_name: 서류, 면접, 기타(직무테스트 등)
status:
* PROGRESS
* PASSES
* FAILED
*/
// 상태 값에 따라 칩 컴포넌트를 반환하는 훅
const getChipComponent = (stageName: string, status: string) => {
  switch(stageName){
    case "서류":
      switch(status){
        case "PROGRESS":
          return <PrepareDocumentChip />;
        case "PASSED":
          return <PassDocumentChip />;
      }
    case "면접":
      switch(status){
        case "PROGRESS":
          return <PrepareInterviewChip />;
        case "PASSED":
          return <PassInterviewChip />;
      }
  }
  
  let contents = "";
  contents += stageName;
  switch(status){
    case "PROGRESS":
      contents = contents + "준비중";
    case "PASSED":
      contents = contents + "합격";
    case "FAILED":
      contents = contents + "불합격";
    default:
      contents += status;
  }
  return <OtherStatusChip contents={contents} />;
};


/* 컴포넌트 */
const CareerStatus = ({ userId, page }: GetParamsRecruitmentStatusType) => {
  const [careerList, setCareerList] = useState<Career[]>([]); // 채용 일정 상태 저장
  const [visibleCareers, setVisibleCareers] = useState(6); // 표시할 최대 줄 수
  const navigate = useNavigate(); // 페이지 전환 함수

  // API 호출을 통해 데이터를 가져오는 함수
  useEffect(() => {
    const fetchCareerList = async () => {
      try {
        const data = await getCareerList({userId, page});
        setCareerList(data.data.recruitments); // API 응답 데이터 중 recruitments 저장

      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchCareerList();
  }, [userId]); // userId가 변경될 때마다 다시 호출

  // 더보기 버튼 클릭 핸들러
  const handleMoreButtonClick = () => {
    navigate(page); // 더 많은 정보를 출력하는 StatusPage로 전환
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* 커리어 현황 헤더 */}
      <div className="flex justify-between py-7">
        <div className="text-neutral-10 text-small20 font-semibold">
          내 커리어 현황, 한 눈에 확인해요
        </div>
        <div>
          <img src={nextButtonIcon} onClick={handleMoreButtonClick} alt="more button" />
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-4 text-xsmall14 font-medium text-neutral-50 bg-static-100 border-t-2 border-b-2 border-neutral-80 py-3">
        <div className="flex justify-start px-2">마감기한</div>
        <div className="flex justify-start px-3">기업</div>
        <div className="flex justify-start px-3">직무</div>
        <div className="flex justify-start px-3">상태</div>
      </div>

      {/* 테이블 데이터 출력 */}
      {careerList.slice(0, visibleCareers).map((career) => (
        <div
          key={career.recruitmentId}
          className="flex justify-center grid grid-cols-4 gap-2 py-2 text-xsmall14 text-neutral-30"
        >
          <div className="flex px-2 gap-2">
            음{career.companyName}
            <Ddayh24Chip day={career.daysUntilEnd} /> {career.endDate}
          </div>
          <div className="px-2">{career.companyName}</div>
          <div className="px-2">{career.task}</div>
          <div className="px-2">{getChipComponent(career.stageName, career.status)}</div>
        </div>
      ))}
      
    </div>
  );
};

export default CareerStatus;
