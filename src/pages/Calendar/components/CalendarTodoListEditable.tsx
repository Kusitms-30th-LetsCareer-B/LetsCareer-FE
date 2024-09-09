/** 사용자가 수정 가능한 투두 설정창 */

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

// API 연동 이벤트 임포트
import { getResponseTodoDayGroupedByCompany } from '../api/todoDayGroupedByCompanyApiService.ts';
import { GetParamsTodoDayGroupedByCompanyType, GetRequestTodoDayGroupedByCompanyType } from '../api/todoDayGroupedByCompanyType.ts';


// 아이콘 파일
import addNeutral40Icon from "../../../shared/assets/add-neutral-40.png";
import checkRoundedSquareBlankedIcon from "../../../shared/assets/checkRoundedSquareBlanked.png";
import checkRoundedSquareCheckedIcon from "../../../shared/assets/checkRoundedSquareChecked.png";


/* 일정 추가 버튼 디자인 컴포넌트 */
// 개인 스케줄 추가 버튼 임포트
import { ScheduleButton } from "./ScheduleButton.tsx"

/** Probs 인터페이스 */
/*
// 1) 로그인 정보 Probs
import {userInfo} from "../../../shared/api/loginInstance.ts"
// 2) ToDo 관련 Tools Probs
import { TodoListProps } from "../../../components/ToDoListTool.ts"
// 3) 부모 컴포로부터 최종 입력받을 Probs
// Request 보낼 데이터도 함께 전달 받음
interface CalendarComponentProps extends userInfo, TodoListProps {
  userId: number;
  selectedDateString: string; // YYYY-MM-DD 형식으로 request 보내야 함. Date -> string 형식으로 바꿈
}
*/
// 사실 이렇게 받아도 됨
interface CalendarComponentProps {
  userId: number;
  selectedDateString: string; // YYYY-MM-DD 형식으로 request 보내야 함.
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}


// Date 관련 hook 임포트
import { getFormattedDate1, getFormattedDate2, getFormattedDate3 } from "../../../shared/hooks/useDate.ts";


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

// 각 Company별 Todo List를 파싱하기위해 정의한 데이터 타입
interface CompanyTodo {
  companyName: string;
  todos: Todo[];
}


/** 기업별 TodoList 확인이 가능한 컴포 */
const CompanyTodoListComponent: React.FC<CalendarComponentProps> = ({ userId, selectedDate, setSelectedDate, selectedDateString }) => {
    // 커스텀 훅에서 상태와 핸들러 가져오기
    const { 
        handlePrevDay, 
        handleNextDay, 
        useCompletedImage,
    } = useTodoList({selectedDate, setSelectedDate});


    // company별로 Todo 데이터를 담은 list
    const [companyTodoList, setCompanyTodoList] = useState<CompanyTodo[]>([]);


    // 완료되지 않은 할 일 개수 계산하는 함수
    const incompleteTodosCount = companyTodoList.reduce((total, company) => {
      return total + company.todos.filter((todo) => !todo.isCompleted).length;
    }, 0);
      
    // 상태 변수
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


  
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
            const response = await getResponseTodoDayGroupedByCompany({ userId, date: selectedDateString });

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
      // userId 또는 selectedDateString가 바뀌면 API 다시 호출
    }, [userId, selectedDateString]);


    //// 이건 뭐제
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
        <div>
            {/* 두 번째 헤더 파트 */}
            <div>
              
              {/* 타이틀 */}
              {/* TODO 개수가 1개 이상이면 완료되지 않은 할 일 개수를 렌더링 */}
              {
                incompleteTodosCount > 0 ? (
                  <div className="font-semibold text-small18 text-neutral-30 py-3">
                    아직 {incompleteTodosCount}건의 TODO가 남았어요
                  </div>
                ): ""
              }

              {/* 회사별 일정 리스트 */}
              {companyTodoList.length > 0 ? (
                companyTodoList.map((companyTodo) => (
                  <div key={companyTodo.companyName} className="py-3">

                    {/** 기업 */}
                    <div className="flex justify-start items-center gap-2">
                      {/* 회사 이름 칩 */}
                      <CompanyNameChip companyName={companyTodo.companyName}/>
                      
                      {/* 기업 TODO 추가 버튼 칩 */}
                      <img className="w-[16px] h-[16px]" src={addNeutral40Icon} />
                    </div>

                    {/** 해당 기업에 대한 TODO 리스트 */}
                    {/** todos 배열 순회 및 todo 항목 렌더링 */}
                    <ul>
                      {companyTodo.todos.map((todo) => (
                        <li className="py-4" key={todo.todoId}>
                          <div className="flex justify-start items-center text-center">
                            
                            {/* 상태에 따라 다른 이미지 렌더링 */}
                            <img
                              className="w-[24px] h-[24px]"
                              src={todo.isCompleted ? checkRoundedSquareCheckedIcon : checkRoundedSquareBlankedIcon} 
                              alt={todo.isCompleted ? "완료됨" : "미완료"}
                            />
                            {/* 할 일 내용 */}
                            <div className="px-2 font-medium text-xsmall14 text-neutral-40">
                              {todo.content}
                            </div>
                          </div>

                          {/* 구분선 출력: 기업별로 분리
                          <hr className="mt-4 p-1" />
                           */}
                        </li>
                      ))}
                    </ul>
                  </div>
          ))
        ) : (
          <div className="rounded-sm bg-neutral-100 text-xsmall16 text-neutral-40 p-4">
            {getFormattedDate1(selectedDate)}에는 등록된 투두 리스트가 없어요!
          </div>
        )}

        
                    
        {/* 구분선 출력 */}
        <hr className="mt-4 p-1" />

        {/* 투두리스트 추가하기 */}
        <div className="justify-between items-center text-center mb-5">
            {/* 추가하기 버튼 */}
            <button >
                <ScheduleButton contents='투두리스트 추가하기' />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyTodoListComponent;
