import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 전환을 위한 useNavigate 훅
import { PATHS } from "../../../Path.ts";
import { Ddayh24Chip } from "../../../components/chips/DdayChip.tsx";
import { getCareerList } from "../api/careerRecruitmentsStatusApiService.ts"; // API 모듈에서 함수 임포트
import nextButtonIcon from "../../../shared/assets/calendar-next.png";

// 상태 칩스
import {
  PrepareDocumentChip,
  PassDocumentChip,
  PrepareInterviewChip,
  PassInterviewChip,
  OtherStatusChip,
} from "../../../components/chips/StatusChip.tsx";


// 백엔드에서 받는 진행 상태 Enum으로 관리
enum ScheduleFilter {
  PROGRESS = "PROGRESS",
  PASSED = "PASSED",
  FAILED = "FAILED",
}
enum StageFilter {
  DOCUMENT = "서류",
  INTERVIEW = "면접",
  //OTHER = "기타", "직무테스트", "코딩테스트", ...
}

// API 연동 타입
import {
  GetParamsRecruitmentStatusType,
  GetRequestRecruitmentStatusType,
} from "../api/careerRecruitmentsStatusType.ts";

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
 * PASSED
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
* PASSED
* FAILED
*/
// 상태 값에 따라 칩 컴포넌트를 반환하는 훅
const getChipComponent = (stageName: string, status: string) => {
  switch (stageName) {
    case StageFilter.DOCUMENT:
      switch (status) {
        case ScheduleFilter.PROGRESS:
          return <PrepareDocumentChip />;
        case ScheduleFilter.PASSED:
          return <PassDocumentChip />;
        case ScheduleFilter.FAILED: // 불합격인 경우 null 반환하여 띄우지 않기
          return null;
      }
    case StageFilter.INTERVIEW:
      switch (status) {
        case ScheduleFilter.PROGRESS:
          return <PrepareInterviewChip />;
        case ScheduleFilter.PASSED:
          return <PassInterviewChip />;
        case ScheduleFilter.FAILED: // 불합격인 경우 null 반환하여 띄우지 않기
          return null;
      }
  }
 
  // 기타 상태일 때는 'stageName'에 코딩테스트 등 지원 종류가 나옴
  return <OtherStatusChip contents={stageName} />;
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
        const response = await getCareerList({ userId, page });

        // API 연동 확인
        console.log("📫 status(기업 일정 메인보드) 데이터 배송완료!!");
        console.log(response.data)

        // 파싱: endDate 기준 오름차순 정렬
        const sortedCareers = response.data.recruitments.sort((a: Career, b: Career) => {
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        setCareerList(sortedCareers); // API 응답 데이터 중 recruitments 저장
        

      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchCareerList();
  // userId가 변경될 때마다 다시 호출 (백엔드와 API 연동)
  }, [userId]);

  // 더보기 버튼 클릭 핸들러
  const handleMoreButtonClick = () => {
    // 지원 현황 페이지로 이동
    navigate(PATHS.STATUS_PATH); // 더 많은 정보를 출력하는 StatusPage로 전환
  };

  return (
    <div className="mx-auto min-w-[700px] p-4">
      {/* 커리어 현황 헤더 */}
      <div className="flex justify-between py-7">
        <div className="text-small20 font-semibold text-neutral-10">
          내 커리어 현황, 한 눈에 확인해요
        </div>
        <div>
          <img
            src={nextButtonIcon}
            className="cursor-pointer"
            onClick={handleMoreButtonClick}
            alt="more button"
          />
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
      {careerList
        // getChipComponent가 null을 반환하면 메인보드에 띄우지 않고, visibleCareers+1 해주고 다음 career로 skip
        .filter(career => getChipComponent(career.stageName, career.status) !== null) // getChipComponent가 null이 아닌 항목만 필터링
        .slice(0, visibleCareers + 1) // visibleCareers에서 하나 더 표시
        .map((career) => (
          <div
            key={career.recruitmentId}
            className="flex grid grid-cols-4 justify-center gap-2 py-2 text-xsmall14 text-neutral-30"
          >
            <div className="flex gap-2 px-2">
              <Ddayh24Chip day={career.daysUntilEnd} /> {career.endDate}
            </div>
            <div className="px-2">{career.companyName}</div>
            <div className="px-2">{career.task}</div>
            <div className="px-2">
              {getChipComponent(career.stageName, career.status)}
            </div>
          </div>
      ))}
    </div>
  );
};

export default CareerStatus;
