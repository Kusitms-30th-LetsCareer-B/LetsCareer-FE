import React, { useEffect, useState } from 'react';

// API 관련
import { GetAlarmParamsType, GetAlarmsResponseType, Alert } from "../api/alarmType";
import { getAlarms } from "../api/alarmApiService";

// Date 관련
import { getFormattedDate3, geteDateDifference } from "../../../shared/hooks/useDate";

// Props
interface AlarmProps extends GetAlarmParamsType {
    alertsCount: number;
}

const Alarm = ({userId, alertsCount}: AlarmProps) => {
    // 알림 변수
    const [alerts, setAlerts] = useState<Alert[]>([]);

    // 알림 API 호출
    useEffect(() => {
        // API 호출 함수
        const fetchAlerts = async () => {
        try {
            // 응답받기
            const response = await getAlarms({userId});
            setAlerts(response.data.alerts); // 알림 목록 저장
            console.log("📫 알림 배송 완료");
            console.log(response);

            setLoading(false);
            setError(null);

        } catch (error) {
            setError('알림 목록을 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
        };

        fetchAlerts();
    }, []);


    // 상태 변수
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 로딩 상태 렌더링
    if (loading) {
        return <div>알림을 불러오는 중입니다...</div>;
    }

    // 에러 상태 렌더링
    if (error) {
        return <div>{error}</div>;
    }


    // 정상 상태, 알림이 0개일 때 렌더링
    if (alertsCount === 0) {
        return <div>알림이 없습니다</div>;
    }


    // 정상 상태, 알림이 1개 이상일 때 렌더링
    return (
        <div className="border ">
            <h2>알림 목록</h2>
            
            {/* 알림 띄우기: 정보(회사명, 전형종류, 종료날짜) */}
            {alerts.map((alert, index) => (
                <div>
                    <div className="text-neutral-30">
                        {alert.endDate == getFormattedDate3(new Date())? "오늘" : alert.endDate}
                    </div>
                    <div className="text-neutral-50">
                        <span>
                            {alert.companyName} {alert.stageName} 전형이
                        </span>
                        <span className="text-primary-100">{geteDateDifference(getFormattedDate3(new Date()), alert.endDate)} 남았어요!</span>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default Alarm;
