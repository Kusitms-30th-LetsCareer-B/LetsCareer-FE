import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 백엔드와 통신하기 위한 axios 임포트

// 인터페이스 및 커스텀 훅 임포트
import {Company, useCountIncomplete, useTotalCountIncomplete,} from '../../../shared/hooks/useTodoList.ts';

// 아이콘 이미지 임포트
import todoListIcon from "../../../shared/assets/todoList.png"

/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts"
/* ToDo 관련 Tools 임포트 */
import { TodoListProps, formatDate2 } from "../../../components/ToDoListTool.ts"
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, TodoListProps {}
  
/* 리스트로 각 기업에 대한 일정 정보들을 받기:  API 연동 */
// 샘플 기업 데이터 (API에서 받아온다고 가정)
const sampleCompanies: Company[] = [
    { id: 1, name: "네이버", schedules: ["면접 준비", "서류 제출"], completed: [false, true] },
    { id: 2, name: "카카오", schedules: ["코딩 테스트", "최종 발표"], completed: [true, false] },
    { id: 3, name: "현대자동차", schedules: ["코딩 테스트", "최종 발표"], completed: [true, true] },
];

  

// SubTodoList 컴포넌트
const SubTodoList = ({userId, userName, selectedDate, setSelectedDate} : CombinedProps) => {

    // 기업별 일정 데이터
    const [companies, setCompanies] = useState(sampleCompanies); // 기업 데이터

    // 모든 기업의 미완료 스케줄 수의 총합을 계산하는 훅 사용
    const totalCount = useTotalCountIncomplete(companies);
    
    // API 연동하여 기업 리스트 가져오는 부분
    useEffect(() => {
        // 예시를 위해 sampleCompanies 사용
        // 실제로는 fetch() 등을 사용하여 API에서 데이터 가져오기
        setCompanies(sampleCompanies);
    }, []);


    /* 컴포넌트 렌더링 */
    return (
        <div className="font-sans rounded-lg border border-neutral-80 w-[247px]">
            {/* 첫 번째 헤더 파트 */}
            <div className="flex items-center justify-between py-5">
                {/* 이미지 */}
                <div className="flex-shrink-0 px-5"> {/* 이미지 크기를 고정하고 여백을 추가하지 않음 */}
                    <img src={todoListIcon} alt="Todo List Icon" />
                </div>
                
                {/* 텍스트 섹션 */}
                <div className="flex flex-row font-semibold px-5"> {/* flex-row로 가로 정렬 및 간격 설정 */}
                    
                    <div className="flex flex-col">
                        {/* 첫 번째 행: div1 */}
                        <div className="flex">
                            {/* div1 */}
                            {/* 타이틀 표시 */}
                            <div className='flex-1 text-xsmall14 text-neutral-60'>
                                오늘 해야 할 일
                            </div>
                        </div>
                        
                        {/* 두 번째 행: div2와 div3 */}
                        <div className="flex items-end"> {/* bottom으로 내려서 정렬 */}
                            {/* div2 */}
                            {/* 전체 미완료 스케줄 개수 표시 */}
                            <span className="text-medium22 text-neutral-10">
                                {totalCount}개
                            </span>
                            {/* 전체 스케줄 개수 표시 */}
                            <span className="text-xsmall16 text-neutral-60 px-2">
                                / {companies.length}개
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>

    );
};

export default SubTodoList;