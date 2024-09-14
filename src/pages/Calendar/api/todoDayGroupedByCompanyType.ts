/** 전체 기업의 해당 날짜 투두 리스트 */
export const TodoDayGroupedByCompany_URL = "/todos/groupedByCompany";

/** API Type */
// GET 파라미터
export interface GetTodoListDayGroupedByCompanyParamsType {
    userId: number;
    date: string;  // YYYY-MM-DD 형식으로 request 보내야 함. Date -> string 형식으로 바꿈
};

// GET 응답
export interface GetTodoListDayGroupedByCompanyResponseType {
    companyName: string;
    todos: [];
}

/** 연동받은 데이터 갖고 놀기 위한 인스턴스 틀 */
// Todo 데이터 타입
/**
 * content: "현대모비스 합격 포트폴리오 보기"
 * date: "2024-09-09"
 * isCompleted: false
 * isRoutine: true
 * recruitmentId: 23
 * todoId: 9
 */
export interface Todo {
    content: string;
    date: string;
    isCompleted: boolean;
    isRoutine: boolean;
    recruitmentId: number;
    todoId: number;
    routineId: number; // routine이 아닐 경우 null값으로 들어옴
  }
  