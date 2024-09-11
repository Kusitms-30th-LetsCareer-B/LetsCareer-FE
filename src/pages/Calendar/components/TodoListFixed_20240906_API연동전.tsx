/** 📌
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 해당 컴포 역할은 Calendar 폴더의 TodoListFixed.tsx 컴포로 바뀜
 * 연동 전 디자인은 참고할만해서 냅둠 */
import { useState } from 'react';

// 아이콘 이미지 임포트
import prevButtonIcon from "../../../shared/assets/calendar-prev.png"
import nextButtonIcon from "../../../shared/assets/calendar-next.png"

// 커스텀 훅 임포트
import {useTodoList} from '../../../shared/hooks/useTodoList.ts';

// ToDo 칩스 임포트
import { CompanyNameChip, CompanyNameSelectionChip, DocumentScheduleChip,
  InterviewScheduleChip, OtherScheduleChip, PersonalScheduleChip, } from "../../../components/chips/TodoListChip"
  
// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";


/** Props */
// 사용자 로그인 정보 가져오기
import {userInfo} from "../../../shared/api/loginInstance.ts"
// 달력에서 선택한 일정 정보 가져오기
// 채용일정, 개인일정, 투두리스트 중 채용일정만
import { RecruitmentScheduleListProps } from "../../../components/ToDoListTool.ts"
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, RecruitmentScheduleListProps {}


/* 리스트로 각 기업에 대한 일정 정보들을 받기:  API 연동 */
// 샘플 기업 데이터 (API에서 받아온다고 가정)
const sampleCompanies = [
    { id: 1, name: "네이버", schedules: ["면접 준비", "서류 제출"], completed: [false, true] },
    { id: 2, name: "카카오", schedules: ["코딩 테스트", "최종 발표"], completed: [true, false] },
    { id: 3, name: "현대자동차", schedules: ["코딩 테스트", "최종 발표"], completed: [true, true] },
];


// TodoList 컴포넌트
const MainTodoList = ({userId, userName, selectedDate, setSelectedDate}: CombinedProps) => {
    // 커스텀 훅에서 상태와 핸들러 가져오기
    const { 
        handlePrevDay, 
        handleNextDay, 
        useCompletedImage,
    } = useTodoList({selectedDate, setSelectedDate});
    
    // 기업별 일정 데이터
    const [companies, setCompanies] = useState(sampleCompanies); // 기업 데이터

    /* 컴포넌트 렌더링 */
    return (
        /* 컴포넌트 전체 윤곽 컨테이너 스타일 */
        <div className="font-sans rounded-lg border border-neutral-80 w-[247px]"> {/* width를 360px로 고정함. w-[360px] 삭제하면 반응형으로 됨 */}
            {/* 첫 번째 헤더 파트 */}
            <div className="flex items-center justify-center mb-4 py-5">
                {/* 이전달 이동 버튼 */}
                {/* 월 이동 버튼 */}
                <button onClick={handlePrevDay} className="px-4">
                    <img src={prevButtonIcon} alt='이전 달'/>
                </button>

                {/* 날짜 출력: 년도.월.일 */}
                {/* 선택된 날짜가 있으면 선택된 날짜 관련 데이터: selectedDate */}
                {/* 선택된 날짜가 없으면 오늘 날짜 관련 데이터:  (new Date) */}
                <div className="text-lg font-bold text-neutral-30">
                    {selectedDate ? getFormattedDate2(selectedDate) : getFormattedDate2(new Date())}
                </div>
                
                {/* 다음달 이동 버튼 */}
                <button onClick={handleNextDay} className="px-4">
                    <img src={nextButtonIcon} alt='다음 달'/>
                </button>
            </div>
            

            {/* 두 번째 헤더 파트 */}
            {/**<div key={selectedDate ? selectedDate.toISOString() : company.id} className="mb-4">*/}
            <div className="px-7">
              {sampleCompanies.map((company) => (
                <div key={company.id} className="mb-4">
                  {/* 회사 이름 칩 */}
                  <div className="py-3">
                    <CompanyNameChip companyName={company.name}/>
                  </div>

                  {/* 스케줄 목록 */}
                  <ul>
                    {company.schedules.map((schedule, index) => {

                      // 훅을 사용하여 현재 스케줄의 상태에 따른 이미지와 토글 여부를 가져옴
                      const { imageSrc, toggleCompleted } = useCompletedImage(
                        company.id,
                        index,
                        company.completed,
                        (newCompleted) => {
                          // 상태 업데이트
                          const updatedCompanies = [...companies];
                          updatedCompanies[index].completed = newCompleted;
                          setCompanies(updatedCompanies);

                          // 변경된 정보를 백엔드에 전송
                          //updateBackend(company.id, newCompleted);
                        }
                      );
                      
                      //////////////////////////////////////////////////////
                      // 특정 기업의 스케줄 목록
                      return (
                        <>
                          {/** <li key={selectedDate ? selectedDate.toISOString() : index} className="flex items-center mb-2">
                          */}
                          
                          <li key={`${company.id}-${index}`} className="flex items-center mb-2">
                            {/* 상태 이미지 */}
                            <img src={imageSrc} alt={`Schedule status for ${schedule}`} className="w-4 h-4 mr-2" />

                            {/* 스케줄 내용 */}
                            <span className="text-neutral-40">{schedule}</span>
                          </li>

                          {/* 구분선 출력: 다음 기업과 구분 */}
                          {index == company.schedules.length - 1  // 현재 기업의 마지막 스케줄(index)이고
                          && company.id !== companies.length      // 기업 리스트의 맨 마지막이 기업이 아니면
                          && <hr className="mt-4" />              // 구분선 출력
                          }
                        </>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
        </div>
    );
};

export default MainTodoList;
