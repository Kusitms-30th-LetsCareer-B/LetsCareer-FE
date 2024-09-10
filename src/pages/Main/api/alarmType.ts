/** 알림 기능 */
export const Alarm_URL = "/alerts";


/** API Types */
// GET 파라미터
export interface GetAlarmParamsType {
    userId: number;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetAlarmsResponseType {
    alerts: Alert[];
}

// 알림 타입
export interface Alert {
    companyName: string,
    stageName: string,
    endDate: string
}
