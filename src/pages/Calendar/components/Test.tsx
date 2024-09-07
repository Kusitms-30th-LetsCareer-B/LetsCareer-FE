import React, { useState, useEffect } from 'react';

import { Todo } from '../api/todoType.ts';

// ToDo API 모듈화된 서비스 임포트
import {
  getTodos,
  addTodo,
  deleteTodo,
  checkTodo,
  delayTodo,
  updateTodo,
  getGroupedByCompanyTodos,
} from '../api/todoApiService.ts';
import { GetGroupedByCompanyResponse } from '../api/todoType'; // 타입 정의


/* 로그인 정보 받기 */
import {userInfo} from "../../../shared/api/loginInstance.ts"
/* ToDo 관련 Tools 임포트 */
import { TodoListProps, formatDate1 } from "../../../components/ToDoListTool.ts"
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, TodoListProps {}


// TodoList 컴포넌트
const TodoList: React.FC<CombinedProps> = ({ userId, userName, selectedDate }) => {
  const [companyTodos, setCompanyTodos] = useState<GetGroupedByCompanyResponse['data']>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const formattedDate = selectedDate
  ? selectedDate.toLocaleDateString('en-CA') // YYYY-MM-DD 형식으로 로컬 시간 변환
  : '';


  // selectedDate가 변경될 때마다 투두 항목을 가져옵니다.
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        // API 호출로 투두 항목을 가져옵니다.
        const params = { userId, date: formattedDate };
        const response = await getGroupedByCompanyTodos(params);
        setCompanyTodos(response.data);
      } catch (err) {
        setError('투두 목록을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userId, selectedDate]); // userId와 selectedDate가 변경될 때마다 API 호출

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>{userName}님의 {formattedDate} 투두 목록</h2>
      {companyTodos.length === 0 ? (
        <div>해당 날짜에 투두가 없습니다.</div>
      ) : (
        companyTodos.map((company) => (
          <div key={company.companyName}>
            <h3>{company.companyName}</h3>
            <ul>
              {company.todos.map((todo) => (
                <li key={todo.todoId}>
                  <span>{todo.content}</span>
                  <span>{todo.isCompleted ? '완료' : '미완료'}</span>
                  <span>{todo.date}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
