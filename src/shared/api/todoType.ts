/** 투두 리스트 조작 */
export const Todos_URL = "/todos";

export const TodosCheck_URL = "/check";


/** API Types */
/** 특정 기업의 해당 날짜의 투두 리스트 조회 */
// GET 파라미터
export interface GetTodoByRecruitmentIdParamsType {
    recruitmentId: number;  // 기업 ID
    date: string; // 선택한 날짜
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetTodoByRecruitmentIdResponseType {
    todoId: number;
    content: string;
    isCompleted: boolean;
    date: string;
    recruitmnetIn: number;
    isRoutine: []
}


// POST 파라미터
export interface PostTodoByRecruitmentIdParamsType {
    userId: number;
    recruitmentId: number;  // 기업 ID
};

// POST 요청:  백엔드에 추가할 데이터
export interface PostTodoByRecruitmentIdRequestType {
    date: string;
    content: string;
}

// POST 응답:  null 값을 응답받음


/** 특정 투두 삭제 */
// DELETE 파라미터
export interface DeleteTodoParamsType {
    todoId: number;
}

// DELETE 응답:  null 값을 응답받음



/** 특정 투두 내용 수정 */
// PATCH 파라미터
export interface UpdateTodoContentsParamsType {
    todoId: number;
}

// PATCH 요청: 수정할 데이터를 담는 타입
export interface UpdateTodoContentsRequestType {
    content: string;
    date: string;
}

// PATCH 응답:  null 값을 응답받음


/** 특정 투두 완료 여부 수정 */
// PATCH 파라미터
export interface UpdateTodoCheckParamsType {
    todoId: number;
}

// PATCH 요청:  요청할 데이터가 없음. 토글값(true/false)로 수정하는 거라

// PATCH 응답:  null 값을 응답받음

