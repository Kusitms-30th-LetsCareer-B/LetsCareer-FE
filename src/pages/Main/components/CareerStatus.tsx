import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate 훅
import { Ddayh24Chip } from "../../../components/chips/DdayChip";
import { getCareerList } from "../api/careerStatusApiService.ts"; // API 모듈에서 함수 임포트
import nextButtonIcon from "../../../shared/assets/calendar-next.png";
import { PrepareDocumentChip, PassDocumentChip, PrepareInterviewChip, PassInterviewChip, JobTestChip } from "../../../components/chips/StatusChip";

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

// 상태 값에 따라 칩 컴포넌트를 반환하는 훅
const getChipComponent = (status: string) => {
  switch (status) {
    case 'PREPARE_DOCUMENT':
      return <PrepareDocumentChip />;
    case 'PASS_DOCUMENT':
      return <PassDocumentChip />;
    case 'PREPARE_INTERVIEW':
      return <PrepareInterviewChip />;
    case 'PASS_INTERVIEW':
      return <PassInterviewChip />;
    case 'JOB_TEST':
      return <JobTestChip />;
    default:
      return null; // status가 알 수 없는 경우 null 반환
  }
};

/* Probs 관리 */
interface CareerListProbs {
  statusPageLink: string;
  userId: number; // 추가된 userId 파라미터
}

// 임시: 첫 번째 페이지의 데이터 호출
const pageNum = "1"

/* 컴포넌트 */
const CareerStatus = ({ userId, statusPageLink }: CareerListProbs) => {
  const [careerList, setCareerList] = useState<Career[]>([]); // 채용 일정 상태 저장
  const [visibleCareers, setVisibleCareers] = useState(6); // 표시할 최대 줄 수
  const navigate = useNavigate(); // 페이지 전환 함수

  // API 호출을 통해 데이터를 가져오는 함수
  useEffect(() => {
    const fetchCareerList = async () => {
      try {
        const data = await getCareerList(userId, pageNum);
        setCareerList(data.data.recruitments); // API 응답 데이터 중 recruitments 저장
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchCareerList();
  }, [userId]); // userId가 변경될 때마다 다시 호출

  // 더보기 버튼 클릭 핸들러
  const handleMoreButtonClick = () => {
    navigate(statusPageLink); // 더 많은 정보를 출력하는 StatusPage로 전환
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
            음
            <Ddayh24Chip day={career.daysUntilEnd} /> {career.endDate}
          </div>
          <div className="px-2">{career.companyName}</div>
          <div className="px-2">{career.task}</div>
          <div className="px-2">{getChipComponent(career.status)}</div>
        </div>
      ))}
      
    </div>
  );
};

export default CareerStatus;
