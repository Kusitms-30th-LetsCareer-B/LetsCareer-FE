import React, { useState, useEffect } from 'react';
import prevButtonIcon from "../../../shared/assets/calendar-prev.png"
import nextButtonIcon from "../../../shared/assets/calendar-next.png"

// 커스텀 훅 임포트
import useTodoList from '../../../shared/hooks/useTodoList';

// 샘플 기업 데이터 (API에서 받아온다고 가정)
const sampleCompanies = [
    { id: 1, name: "네이버", schedules: ["면접 준비", "서류 제출"], completed: false },
    { id: 2, name: "카카오", schedules: ["코딩 테스트", "최종 발표"], completed: false },
];

// 컴포 파라미터(props) 타입 정의
interface TodoListProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  }
  

// TodoList 컴포넌트
const TodoList: React.FC<TodoListProps> = (props) => {

    // 커스텀 캘린더 훅에서 상태와 핸들러 가져오기    
    // props로 전달받은 selectedDate와 setSelectedDate를 useTodoList에 전달
    const { 
        handlePrevDay, 
        handleNextDay, 
        formatDate 
    } = useTodoList(props);


    // 기업별 일정 데이터
    const [companies, setCompanies] = useState(sampleCompanies); // 기업 데이터

  
    // API 연동하여 기업 리스트 가져오는 부분
    useEffect(() => {
        // 예시를 위해 sampleCompanies 사용
        // 실제로는 fetch() 등을 사용하여 API에서 데이터 가져오기
        setCompanies(sampleCompanies);
    }, []);

    // 기업 일정 완료 체크 핸들러
    const handleCompleteSchedule = (id: number) => {
        setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
            company.id === id ? { ...company, completed: !company.completed } : company
        )
        );
    };


    return (
        /* 컴포넌트 전체 윤곽 컨테이너 스타일 
        <div className="p-4">*/
        <div className="font-sans rounded-lg border border-neutral-90 shadow-xl w-[360px]"> {/* width를 360px로 고정함. w-[360px] 삭제하면 반응형으로 됨 */}
            {/* 첫 번째 헤더 파트 */}
            <div className="flex items-center justify-between mb-4">
                {/* 이전달 이동 버튼 */}
                {/* 월 이동 버튼 */}
                <button onClick={handlePrevDay} className="px-4">
                    <img src={prevButtonIcon} alt='이전 달'/>
                </button>

                {/* 날짜 출력: 년도.월.일 */}
                {/* 선택된 날짜가 있으면 선택된 날짜 관련 데이터: selectedDate */}
                {/* 선택된 날짜가 없으면 오늘 날짜 관련 데이터:  (new Date) */}
                <div className="text-lg font-bold">
                    {props.selectedDate ? formatDate(props.selectedDate) : formatDate(new Date())}
                </div>
                
                {/* 다음달 이동 버튼 */}
                <button onClick={handleNextDay} className="px-4">
                    <img src={nextButtonIcon} alt='다음 달'/>
                </button>
            </div>
            

            {/* 두 번째 헤더 파트 */}
            <div className="space-y-4">
              {companies.map((company, index) => (
                <div key={company.id} className="border-b last:border-0 pb-2">
                  {/* 기업명 */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-medium">{company.name}</span>
                    
                    {/* 해당 기업과 관련된 일정 완료 체크 버튼 */}
                    <button
                      onClick={() => handleCompleteSchedule(company.id)}
                      className={`px-3 py-1 rounded ${company.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                    >
                      {company.completed ? "완료" : "완료 체크"}
                    </button>
                  </div>
      
                  {/* 해당 기업과 관련된 일정 */}
                  <ul className="mt-2 ml-4 list-disc">
                    {company.schedules.map((schedule, idx) => (
                      <li key={idx} className="text-sm">{schedule}</li>
                    ))}
                  </ul>
      
                  {/* 마지막 i가 아니면 구분선 출력 */}
                  {index !== companies.length - 1 && <hr className="mt-4" />}
                </div>
              ))}
            </div>
            {/* 리스트로 각 기업에 대한 일정 정보들을 받기:  API 연동 */}
            {/* Chips: 기업명을 probs로 건네기 */}
            {/* 해당 기업과 관련된 일정 완료 체크 버튼 */}
            {/* 해당 기업과 관련된 일정 */}
            {/* 마지막 i가 아니면 구분선 출력 */}
            
            {/* 수평선 라인 (MarkDown에서 --- ) */}
            <hr className="border-t-2 border-schemes-outline_variant my-6" />
        </div>
    );
};

export default TodoList;
