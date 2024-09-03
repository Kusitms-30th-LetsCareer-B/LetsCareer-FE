import { useState } from 'react';


///////////////////////////////////////////////////////////////////////
// Calendar Event 형식 인터페이스 정의
export interface Event {
    date: Date;
    type: string;
    institution: string;
    color: string;
}
  
// Custom Event 인터페이스 정의
// Event 중에서 type과 color만 사용자가 임의로 지정 가능
export interface CustomType {
    type: string;
    color: string;
}


///////////////////////////////////////////////////////////////////////
// 타입 안정성 제공 용도
// 객체의 구조를 정의하여 객체의 타입을 강력하게 제한
interface UseCalendarEventsReturnType {
    events: Event[];
    customTypes: CustomType[];
    selectedDate: Date | null;
    hoveredDate: Date | null;
    
    institution: string;
    selectedType: string;
    newType: string;
    newColor: string;
    
    addEvent: (date: Date, type: string, institution: string) => void;
    addCustomType: (type: string, color: string) => void;
    removeCustomType: (type: string) => void;
    setCustomTypeColor: (type: string, color: string) => void;
    setSelectedDate: (date: Date) => void;
    setHoveredDate: (date: Date) => void;
    
    setInstitution: (institution: string) => void;
    setSelectedType: (type: string) => void;
    setNewType: (type: string) => void;
    setNewColor: (color: string) => void;
}



///////////////////////////////////////////////////////////////////////
const useCalendar = (): UseCalendarEventsReturnType => {
    /* 상태 관리 변수 */
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 클릭된 날짜 상태
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null); // 호버된 날짜 상태

    const [events, setEvents] = useState<Event[]>([]);
    const [customTypes, setCustomTypes] = useState<CustomType[]>([]);

    const [institution, setInstitution] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [newType, setNewType] = useState<string>('');
    const [newColor, setNewColor] = useState<string>('#000000');
    


    /* 상태 관리 함수 */
    // 일정 추가 함수
    const addEvent = (date: Date, type: string, institution: string) => {
        const eventExists = events.filter(event => event.date.toDateString() === date.toDateString());

        // 하루에 최대 3개의 일정만 허용
        if (eventExists.length >= 3) {
        alert('하루에 최대 3개의 일정만 등록할 수 있습니다.');
        return;
        }

        const typeObj = customTypes.find((customType) => customType.type === type);
        if (!typeObj) {
        alert('유효하지 않은 타입입니다. 먼저 타입을 추가하세요.');
        return;
        }

        const newEvent: Event = { date, type, institution, color: typeObj.color };
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    // 사용자 정의 타입 추가 함수
    const addCustomType = (type: string, color: string) => {
        setCustomTypes(prevTypes => [...prevTypes, { type, color }]);
    };

    // 사용자 정의 타입 제거 함수
    const removeCustomType = (type: string) => {
        setCustomTypes(prevTypes => prevTypes.filter(t => t.type !== type));
    };

    // 사용자 정의 타입 색상 설정 함수
    const setCustomTypeColor = (type: string, color: string) => {
        setCustomTypes(prevTypes =>
        prevTypes.map(t => (t.type === type ? { ...t, color } : t))
        );
    };

    return {
        events,
        customTypes,
        selectedDate,
        hoveredDate,

        institution,
        selectedType,
        newType,
        newColor,
        
        addEvent,
        addCustomType,
        removeCustomType,
        setCustomTypeColor,
        
        setSelectedDate,
        setHoveredDate,
        setInstitution,
        setSelectedType,
        setNewType,
        setNewColor,
    };
};

export default useCalendar;









    {/*
    const [isPeriodOn, setIsPeriodOn] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(defaultDate);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [isCalendarOpened, setIsCalendarOpened] = useState(true);

    const handlePeriodToggle = () => {
        setIsPeriodOn((prevState) => !prevState);

        ```
        if (isPeriodOn === true) {
            setSelectedEndDate(null);
        }
        setIsPeriodOn((prev) => !prev);
        ```
    };

    const handlePeriodEnd = () => {
        setIsPeriodOn(false);
    };

    const handleOpenCalendar = () => {
        setIsCalendarOpened(true);
    };

    const handleStartDateInput = (date: Date | null) => {
        setSelectedStartDate(date);
    };

    const handleEndDateInput = (date: Date | null) => {
        setSelectedEndDate(date);
    };
    */}