import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 백엔드와 통신하기 위한 axios 임포트

// 아이콘 이미지 임포트
import prevButtonIcon from "../../../shared/assets/calendar-prev.png"
import nextButtonIcon from "../../../shared/assets/calendar-next.png"

// 커스텀 훅 임포트
import {useTodoList} from '../../../shared/hooks/useTodoList.ts';

// ToDo 칩스 임포트
import { CompanyNameChip, CompanyNameSelectionChip, DocumentScheduleChip,
  InterviewScheduleChip, OtherScheduleChip, PersonalScheduleChip, } from "../../../components/chips/TodoListChip"

  
/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts"
/* ToDo 관련 Tools 임포트 */
import { TodoListProps, formatDate2 } from "../../../components/ToDoListTool.ts"
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, TodoListProps {}
  

/* 리스트로 각 기업에 대한 일정 정보들을 받기:  API 연동 */
// 샘플 기업 데이터 (API에서 받아온다고 가정)
const sampleCompanies = [
    { id: 1, name: "네이버", schedules: ["면접 준비", "서류 제출"], completed: [false, true] },
    { id: 2, name: "카카오", schedules: ["코딩 테스트", "최종 발표"], completed: [true, false] },
    { id: 3, name: "현대자동차", schedules: ["코딩 테스트", "최종 발표"], completed: [true, true] },
];



/** TodoList 컴포넌트 */
const TodoList = ({userId, userName, selectedDate, setSelectedDate} : CombinedProps) => {

    // 커스텀 훅에서 상태와 핸들러 가져오기
    const { 
        handlePrevDay, 
        handleNextDay, 
        useCompletedImage,
    } = useTodoList({selectedDate, setSelectedDate});


    // 기업별 일정 데이터
    const [companies, setCompanies] = useState(sampleCompanies); // 기업 데이터

  
    // API 연동하여 기업 리스트 가져오는 부분
    useEffect(() => {
        // 예시를 위해 sampleCompanies 사용
        // 실제로는 fetch() 등을 사용하여 API에서 데이터 가져오기
        setCompanies(sampleCompanies);
    }, []);


    // 백엔드에 기업 일정 토글 상태 업데이트 전송하는 함수
    const updateBackend = async (companyId: number, updatedCompleted: boolean[]) => {
      try {
        await axios.post('/api/updateCompleted', {
          id: companyId,
          completed: updatedCompleted,
        });
        console.log('Completed 상태가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('Completed 상태 업데이트 중 오류 발생:', error);
      }
    };


    /* 컴포넌트 렌더링 */
    return (
        /* 컴포넌트 전체 윤곽 컨테이너 스타일 */
        <div>
        {/*<div className="font-sans rounded-lg border border-neutral-80 w-[247px]"> {/* width를 360px로 고정함. w-[360px] 삭제하면 반응형으로 됨 */}
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
                    {selectedDate ? formatDate2(selectedDate) : formatDate2(new Date())}
                </div>
                
                {/* 다음달 이동 버튼 */}
                <button onClick={handleNextDay} className="px-4">
                    <img src={nextButtonIcon} alt='다음 달'/>
                </button>
            </div>
            

            {/* 두 번째 헤더 파트 */}
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
                          updateBackend(company.id, newCompleted);
                        }
                      );


                      // 특정 기업의 스케줄 목록
                      return (
                        <>
                          <li key={index} className="flex items-center mb-2">
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

export default TodoList;
