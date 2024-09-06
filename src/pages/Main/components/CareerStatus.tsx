import React, { useState, useEffect } from "react";
import axios from "axios"; // 백엔드 연동
import { useNavigate } from "react-router-dom"; // 페이지 전환을 위한 useNavigate 훅
import { Ddayh24Chip } from "../../../components/chips/DdayChip";

// 더보기 아이콘
import nextButtonIcon from "../../../shared/assets/calendar-next.png";

// 상태 칩스 7종
import {
  PrepareDocumentChip,
  PassDocumentChip,
  PrepareInterviewChip,
  PassInterviewChip,
  JobTestChip,
} from "../../../components/chips/StatusChip";

// 임시용: 나중에 hooks로 옮기기
// 각 Career 항목의 타입 정의
interface Career {
  id: number;
  remainingDays: number;
  deadline: string;
  companyName: string;
  position: string;
  status: number; // 0~4 (StatusChip)
}

// 임시용: 나중에 hooks 폴더로 옮기기
// 상태 값에 따라 칩 컴포넌트를 빈환하는 훅
const getChipComponent = (status: number) => {
  switch (status) {
    case 0:
      return <PrepareDocumentChip />;
    case 1:
      return <PassDocumentChip />;
    case 2:
      return <PrepareInterviewChip />;
    case 3:
      return <PassInterviewChip />;
    case 4:
      return <JobTestChip />;
    default:
      return null; // status가 0에서 4 사이의 값이 아닌 경우, null 반환
  }
};

/* Probs 관리 */
interface CareerListProbs {
  statusPageLink: string;
}

/* 컴포넌트 */
const CareerStatus = ({ statusPageLink }: CareerListProbs) => {
  const [careerList, setCareerList] = useState<Career[]>([]); // jobData 상태가 Job 타입의 배열
  const [visibleCareers, setVisibleCareers] = useState(6); // 표시할 최대 줄 수
  const navigate = useNavigate(); // 페이지 전환 함수

  // 백엔드에서 데이터 가져오는 함수
  /*
  useEffect(() => {
    // 비동기 함수로 데이터를 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/jobs'); // API 엔드포인트에 맞게 수정
        setCareerData(response.data);

      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);
  */

  // 백엔드 연동 전 임시 데이터 설정
  useEffect(() => {
    // 테스트용 샘플 데이터
    const samples: Career[] = [
      {
        id: 1,
        remainingDays: 9,
        deadline: "2024-10-15",
        companyName: "네이버",
        position: "개발자",
        status: 0,
      },
      {
        id: 2,
        remainingDays: 10,
        deadline: "2024-10-22",
        companyName: "카카오",
        position: "디자이너",
        status: 1,
      },
      {
        id: 3,
        remainingDays: 17,
        deadline: "2024-10-13",
        companyName: "삼성전자",
        position: "마케팅",
        status: 2,
      },
      {
        id: 4,
        remainingDays: 19,
        deadline: "2024-10-17",
        companyName: "LG",
        position: "기획자",
        status: 3,
      },
      {
        id: 5,
        remainingDays: 29,
        deadline: "2024-10-11",
        companyName: "현대차",
        position: "엔지니어",
        status: 4,
      },
      {
        id: 6,
        remainingDays: 40,
        deadline: "2024-10-20",
        companyName: "SK",
        position: "관리자",
        status: 4,
      },
      {
        id: 7,
        remainingDays: 42,
        deadline: "2024-10-12",
        companyName: "롯데",
        position: "회계사",
        status: 3,
      },
    ];

    setCareerList(samples); // 샘플 데이터를 상태에 설정
  }, []);

  // 더보기 버튼 클릭 핸들러
  const handleMoreButtonClick = () => {
    navigate(statusPageLink); // 더 많은 정보를 출력하는 StatusPage로 전환
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      {/* 커리어 현황 헤더 */}
      <div className="flex justify-between py-7">
        {/* 커리어 현황 타이틀 */}
        <div className="text-small20 font-semibold text-neutral-10">
          내 커리어 현황, 한 눈에 확인해요
        </div>
        {/* 더보기 버튼 */}
        <div>
          <img src={nextButtonIcon} />
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-4 border-b-2 border-t-2 border-neutral-80 bg-static-100 py-3 text-xsmall14 font-medium text-neutral-50">
        <div className="flex justify-start px-2">마감기한</div>
        <div className="flex justify-start px-3">기업</div>
        <div className="flex justify-start px-3">직무</div>
        <div className="flex justify-start px-3">상태</div>
      </div>

      {/* 테이블 데이터 출력 */}
      {careerList.slice(0, visibleCareers).map((career, index) => (
        <div
          key={index}
          className="flex grid grid-cols-4 justify-center gap-2 py-2 text-xsmall14 text-neutral-30"
        >
          <div className="flex gap-2 px-2">
            <Ddayh24Chip day={career.remainingDays} /> {career.deadline}
          </div>
          <div className="px-2">{career.companyName}</div>
          <div className="px-2">{career.position}</div>
          <div className="px-2">{getChipComponent(career.status)}</div>
          {/*<div>{career.status}</div>*/}
        </div>
      ))}
    </div>
  );
};

export default CareerStatus;
