/** 전체 기업의 해당 날짜 투두 리스트 */
export const TodoDayGroupedByCompany_URL = "/todos/groupedByCompany";

/** API Type */
// GET 파라미터
export interface GetParamsTodoDayGroupedByCompanyType {
    userId: number;
    date: string;  // YYYY-MM-DD 형식으로 request 보내야 함. Date -> string 형식으로 바꿈
};

// GET 요청
export interface GetRequestTodoDayGroupedByCompanyType {
    companyName: string;
    todos: [];
}