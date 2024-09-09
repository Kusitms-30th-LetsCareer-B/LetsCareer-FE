import { useState, useEffect } from 'react';


/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts"
/* ToDo 관련 Tools 임포트 */
import { RecruitmentScheduleListProps } from "../../../components/ToDoListTool.ts"
/* Date 관련 hook 임포트 */
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";



/* 채용 일정 관련 */
// 인터페이스 및 커스텀 훅 임포트
import {Company, useCountIncomplete, useTotalCountIncomplete,} from '../../../shared/hooks/useTodoList.ts';

// 아이콘 이미지 임포트
import todoListIcon from "../../../shared/assets/todoList.png"



// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, RecruitmentScheduleListProps {}



/* 리스트로 각 기업에 대한 일정 정보들을 받기:  API 연동 
// 샘플 기업 데이터 (API에서 받아온다고 가정)
const sampleCompanies: Company[] = [
    { id: 1, name: "네이버", schedules: ["면접 준비", "서류 제출"], completed: [false, true] },
    { id: 2, name: "카카오", schedules: ["코딩 테스트", "최종 발표"], completed: [true, false] },
    { id: 3, name: "현대자동차", schedules: ["코딩 테스트", "최종 발표"], completed: [true, true] },
];

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
*/


/** 컴포넌트 */
const CalendarCareerList = ({userId, userName, selectedDate, setSelectedDate} : CombinedProps) => {
    //////////////////////////////////////////////////////////////////
    /** 채용 일정 API 연동 */

    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////    
    /* 컴포넌트 렌더링 */
    return (
        <>
            {/* 첫 번째 헤더 파트: 선택된 날짜 불러오기 */}
            <div className="flex items-center justify-start font-bold text-primary-100 text-small20 py-6">
                {/* selectedDate가 null이면 함수가 아니라 안전한 문자열로 처리 */}
                {selectedDate ? getFormattedDate1(selectedDate)+' 일정' : '날짜가 없습니다.'}
            </div>

            {/* 두 번째 헤더 파트: 텍스트 타이틀 */}
            <div className="font-semibold text-small18 text-neutral-30">
                커리어 일정
            </div>

            
            {/* 세 번째 헤더 파트: 채용 일정 칩스 */}
            
        </>


    );
};

export default CalendarCareerList;
