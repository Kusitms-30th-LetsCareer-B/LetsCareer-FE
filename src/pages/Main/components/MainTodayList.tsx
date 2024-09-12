/** 오늘 해야 할 일 컴포넌트 */
import React, { useState, useEffect } from 'react';

// 인터페이스 및 커스텀 훅 임포트
import {Company, useCountIncomplete, useTotalCountIncomplete,} from '../../../shared/hooks/useTodoList.ts';

// Date 관련 hook 임포트 
import { getYearMonthDay, getYear, getMonth, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";

// API 연동 이벤트 임포트
import { getTodoListDayGroupedByCompany } from '../../Calendar/api/todoDayGroupedByCompanyApiService.ts';

// 아이콘 이미지 임포트
import todoListIcon from "../../../shared/assets/todoList.png"

/** Props */
// 로그인 정보 받기
import { userInfo } from "../../../shared/api/loginInstance.ts"
// ToDo 관련 Tools Probs
import { TodoListProps } from "../../../components/ToDoListTool.ts"
// Props 인터페이스:  부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, TodoListProps {}

/** 연동받은 데이터 갖고 놀기 위한 인스턴스 틀 */
// 각 Todo별 파싱을 위해 정의한 데이터 타입
/** 
 * content: "현대모비스 합격 포트폴리오 보기"
 * date: "2024-09-09"
 * isCompleted: false
 * isRoutine: true
 * recruitmentId: 23
 * todoId: 9
 */
interface Todo {
    content: string;
    date: string;
    isCompleted: boolean;
    isRoutine: boolean;
    recruitmentId: number;
    todoId: number;
}


// SubTodoList 컴포넌트
const SubTodoList = ({userId, userName, selectedDate, setSelectedDate} : CombinedProps) => {
    // 오늘 날짜: string type
    const [today, setToday] = useState<string>('');
    // 오늘 투두 리스트
    const [totalTodayTodos, setTotalTodayTodos] = useState<Todo[]>([]);
    // 오늘 투두리스트 총 개수
    const [totalTodayTodosCount, setTotalTodayTodosCount] = useState(0);
    // 오늘 미완료 상태인 투두리스트
    const [uncompletedTodayTodos, setUncompletedTodayTodos] = useState<Todo[]>([]);
    // 오늘 미완료 상태인 투두리스트 개수
    const [uncompletedTodayTodosCount, setUncompletedTodayTodosCount] = useState(0);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 백엔드에는 데이터를 YYYY-MM-DD 형식으로 전달해야 함.
                setToday(getFormattedDate3(new Date()));

                // GET 호출
                // 백엔드에서 데이터를 받아온다.
                const response = await getTodoListDayGroupedByCompany({ userId, date: today });
                // 확인
                //console.log("📫 인애쨩~ todoDayGroupedByCompany 데이터 배송 완료! 메인홈에서 확인!!");
                //console.log(response)


                // 200 뜨면 파싱 처리
                if (response.code === 200) {
                    // 응답받은 부분 중 에러 처리 관련 항목(code, message) 외 data 항목만 갖고 놀기
                    const data = response.data;

                    // 오늘 전체 투두리스트 구하기
                    const totalTodayTodos = data.flatMap((company: any) =>
                        company.todos.filter((todo: Todo) => todo.date === today)
                    );
                    setTotalTodayTodos(totalTodayTodos)

                    // 오늘 전체 투두리스트 개수 구하기
                    setTotalTodayTodosCount(totalTodayTodos.length);


                    // 오늘 미완료된 투두리스트 필터링
                    const totalTodayUncompletedTodos = totalTodayTodos.filter((todo: Todo) => !todo.isCompleted);
                    setUncompletedTodayTodos(totalTodayUncompletedTodos);

                    // 오늘 미완료된 투두리스트 개수 구하기
                    setUncompletedTodayTodosCount(totalTodayUncompletedTodos.length);
                }
            } catch (error) {
                console.error("todoDayGroupedByCompany 데이터를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchData();

    // userId, 선택된 날짜, 오늘 날짜가 바뀔 때마다 API 호출
    // 캘린더에서 날짜 선택할 때마다 today todo list 값이 바뀌니깐
    }, [userId, selectedDate, today]);


    /* 컴포넌트 렌더링 */
    return (
        <div>
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
                                {uncompletedTodayTodosCount}개
                            </span>
                            {/* 전체 스케줄 개수 표시 */}
                            <span className="text-xsmall16 text-neutral-60 px-2">
                                / {totalTodayTodosCount}개
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubTodoList;