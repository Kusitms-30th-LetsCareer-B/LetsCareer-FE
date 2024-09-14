import { useEffect, useState } from 'react';

// API 관련
import { GetAlarmParamsType, Alert } from "../api/alarmType";
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


    // 처음 렌더링될 때 호출
    // 알림 값이 바뀌면 호출
    useEffect(() => {
        fetchAlerts();

    }, [alerts]);

    
    // 알림 데이터 가져오기 API 호출 함수
    const fetchAlerts = async () => {
        // userId가 있어야 API 호출 가능
        if(userId) {
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
        }
    };

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
        return (
            // 겉 보더, 높이 고정
            <div className="border h-[300px] min-w-[350px] rounded-lg shadow-lg bg-static-100 p-5">
                <div className="text-small18 font-semibold mb-3">
                    알림
                </div>
                <div className="text-neutral-20">
                    새로운 알림이 없습니다
                </div>;
            </div>
        );
    }


    // 정상 상태, 알림이 1개 이상일 때 렌더링
    return (
        // 겉 보더, 높이 고정
        <div className="border h-[300px] min-w-[350px] rounded-lg shadow-lg bg-static-100 p-5">
            <div className="text-small18 font-semibold mb-3">
                알림
            </div>
            
            {/* 스크롤 추가:  부모보다 h가 작아야 스크롤 생김 */}
            <div className="overflow-y-auto h-[220px]">
                {/* 알림 목록 띄우기: 정보(회사명, 전형종류, 종료날짜) */}
                {alerts.map((alert, index) => (
                    <div className="mb-3">
                        <div className="text-neutral-40">
                            {alert.endDate == getFormattedDate3(new Date())? "오늘" : alert.endDate}
                        </div>
                        <div className="text-neutral-20">
                            <span>
                                {alert.companyName} {alert.stageName} 전형이 </span>
                            <span className="text-primary-100">
                                {geteDateDifference(getFormattedDate3(new Date()), alert.endDate)}일 </span>
                            <span>
                                남았어요!
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Alarm;
