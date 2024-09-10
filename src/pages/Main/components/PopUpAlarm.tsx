import { useEffect, useState, useRef } from 'react';

// 아이콘 이미지 임포트
import alarmIcon from "../../../shared/assets/main-alarms.png";      // 알림이 있을 때 보여줄 이미지
import noAlarmIcon from "../../../shared/assets/main-no-alarms.png"; // 알림이 없을 때 보여줄 이미지


// API 관련
import { GetAlarmParamsType, GetAlarmsResponseType, Alert } from "../api/alarmType";
import { getAlarms } from "../api/alarmApiService";


/* Props */
// 로그인 정보 받기
import {userInfo} from "../../../shared/api/loginInstance.ts"
import Alarm from './Alarm.tsx';


const PopUpAlarmButton = ({userId, userName} : userInfo) => {
    // 알림 아이콘 이벤트
    const [isAlertsOpen, setIsAlertsOpen] = useState(false);

    // 알림 개수
    const [alertsCount, setAlertsCount] = useState(0);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // 알림 개수를 세기 위해 API 연동
    useEffect(() => {
        const fetchAlertsCount = async () => {
        try {
            // GET API 요청 및 데이터 받기
            const response = await getAlarms({userId});

            // 알림 개수 업뎃
            setAlertsCount(response.data.alerts.length);
            console.log("📫 알림 개수 배송 완료");
            console.log(response);

        } catch (error) {
            console.error('알림 개수를 불러오는 중 오류가 발생했습니다.', error);
        }
        };

        fetchAlertsCount();

        // 클릭 이벤트 핸들러
        const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsAlertsOpen(false); // 이미지 외부 클릭 시 AlertsComponent 닫기
        }
        };

        // 전역 클릭 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleAlerts = () => {
        setIsAlertsOpen((prev) => !prev);
    };
    

    // 렌더링
    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            {/* 알림 개수에 따른 이미지 표시 */}
            <img
                src={alertsCount > 0 ? alarmIcon : noAlarmIcon}
                alt="알림 이미지"
                onClick={toggleAlerts}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Alarm가 열릴 때만 표시 */}
            {isAlertsOpen && <Alarm userId={userId} alertsCount={alertsCount}/>}
        </div>
    );
}

export default PopUpAlarmButton;
