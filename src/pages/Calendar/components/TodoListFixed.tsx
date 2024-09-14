/** ✨ version2.
 * 사용자가 수정 불가능한 투두 메인보드 
 * 오늘 투두 리스트만 확인 가능한 version */

import { useState, useEffect } from 'react';

// ToDo 칩스 임포트
import { CompanyNameChip, CompanyNameSelectionChip, DocumentScheduleChip,
  InterviewScheduleChip, OtherScheduleChip, PersonalScheduleChip, } from "../../../components/chips/TodoListChip"

// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";

// API 연동 이벤트 임포트
import { getTodoListDayGroupedByCompany } from '../api/todoDayGroupedByCompanyApiService.ts';
import { Todo } from "../api/todoDayGroupedByCompanyType.ts"


// 아이콘 파일
//import checkRoundedSquareBlankedIcon from "../../../shared/assets/checkRoundedSquareBlanked.png";
//import checkRoundedSquareCheckedIcon from "../../../shared/assets/checkRoundedSquareChecked.png";
import checkRoundedSquareCheckedIcon from "../../../shared/assets/todo-check.png";
import checkRoundedSquareBlankedIcon from "../../../shared/assets/todo-no-check.png";

/** Props */
// 로그인 정보 Probs
// 사실 이렇게 받아도 됨
interface CompanyTodoListComponentProps {
  userId: number;
}

// 각 Company별 Todo List 데이터 타입
interface CompanyTodo {
  companyName: string;
  todos: Todo[];
}


// 기업별 TodoList 확인이 가능한 컴포넌트
const CompanyTodoListComponent = ({ userId }: CompanyTodoListComponentProps) => {
    // 오늘 날짜
    const [today, setToday] = useState(new Date())

    // company별로 Todo 데이터를 담은 list
    const [companyTodoList, setCompanyTodoList] = useState<CompanyTodo[]>([]);


    // 완료되지 않은 할 일 개수 계산하는 함수
    const incompleteTodosCount = companyTodoList.reduce((total, company) => {
      return total + company.todos.filter((todo) => !todo.isCompleted).length;
    }, 0);
      
    // 상태 변수
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // GET 요청 함수 호출: '/todos/groupedByCompany'
    // API 연동하여 기업별 투두리스트 가져오는 부분
    // 컴포넌트가 렌더링될 때 API 호출
    useEffect(() => {
      // userId가 있어야(로그인 상태여야) 작동되니깐 검증용으로
      if (userId) {
        
        const fetchTodoList = async () => {
          try {
            // 상태 제어
            setLoading(true); // 로딩 상태 시작
            setError(null);   // 에러 초기화

            // 요청 및 응답받기
            // date: 백엔드에서 지정한 매개변수명,  selectedDateString: 파라미터로 전달할 파라미터명
            const response = await getTodoListDayGroupedByCompany({ userId, date: getFormattedDate3(today) });

            console.log("📫 투두쨩~");
            // 백엔드로부터 받은 순수 DB 확인
            console.log(response);


            // 파싱: companyName별로 data(todoList)를 분리
            // 서버 응답 데이터 중 "data" 필드만 가져오기
            // 형태:  index, {companyName, todo[]}
            const companyTodoList: CompanyTodo[] = response.data;

            // 파싱한 DB 확인
            //console.log(companyTodoList);
            
            // 저장
            setCompanyTodoList(companyTodoList)

          } catch (error) {
            console.error('일별 기업 일정 투두 리스트를 불러오는 중 오류가 발생했습니다:', error);
            setError('일별 기업 일정 투두 리스트를 불러오는 중 오류가 발생했습니다.');

          } finally {
            // 상태 제어
            setLoading(false); // 로딩 상태 종료
          }
        };
        fetchTodoList();
      }
      // userId 또는 today가 바뀌면 API 다시 호출
    }, [userId, today]);


    
    // 로딩 상태 렌더링
    if (loading) {
      return <div>일정을 불러오는 중입니다...</div>;
    }

    // 에러 상태 렌더링
    if (error) {
      return <div>{error}</div>;
    }
    
    // 정상 상태 렌더링
    return (
        /* 컴포넌트 전체 윤곽 컨테이너 스타일 */
        <div className="mb-2">
            {/* 첫 번째 헤더 파트 */}
            <div className="flex justify-start items-center font-semibold text-neutral-30 text-lg py-7">
              오늘의 Todo List
            </div>


            {/* 두 번째 헤더 파트 */}
            <div>
              {/* 회사별 일정 리스트 */}     
              {companyTodoList.length > 0 ? (
                companyTodoList.map((companyTodo) => (
                  <div key={companyTodo.companyName}>

                    {/** 기업 */}
                    <div className="flex justify-start items-center gap-2 py-2">
                      {/* 회사 이름 칩 */}
                      <CompanyNameChip companyName={companyTodo.companyName}/>
                    </div>


                    {/** 해당 기업에 대한 TODO 리스트 */}
                    {/** todos 배열 순회 및 todo 항목 렌더링 */}
                    <ul>
                      {companyTodo.todos.map((todo) => (
                        <li className="py-2" key={todo.todoId}>
                          <div className="flex justify-start items-center text-center">
                            
                            {/* 상태에 따라 다른 이미지 렌더링 */}
                            <img
                              className="w-[17px] h-[17px]"
                              src={todo.isCompleted ? checkRoundedSquareCheckedIcon : checkRoundedSquareBlankedIcon} 
                              alt={todo.isCompleted ? "완료됨" : "미완료"}
                            />
                            {/* 할 일 내용 */}
                            <div className="px-2 font-medium text-xsmall14 text-neutral-40">
                              {todo.content}
                            </div>
                          
                            {/* 날짜 출력 */}
                            {/*
                            <div>
                              <small>{new Date(todo.date).toLocaleDateString()}</small>
                            </div>
                            */}
                          </div>

                          {/* 구분선 출력: 기업별로 분리, 단 맨 마지막 todo은 제외 */}
                          {
                            todo.todoId !== companyTodo.todos[companyTodo.todos.length-1].todoId?
                            <hr className="mt-4 p-1" /> : ""
                          }

                        </li>
                      ))}
                    </ul>

                  </div>
          ))
        ) : (
          <div className="rounded-sm bg-neutral-100 text-xsmall16 text-neutral-40 p-4 mb-4">
            오늘 등록된 투두 리스트가 없어요!
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTodoListComponent;
