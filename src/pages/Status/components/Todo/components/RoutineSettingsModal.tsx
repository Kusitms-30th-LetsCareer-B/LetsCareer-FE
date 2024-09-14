import { useState, useEffect } from "react";

// Date picker를 띄우는 컴포넌트와 훅
import PopUpDatePicker from "../../../../../components/PopUpDatePicker";
import useDatePicker from "../../../../../shared/hooks/useDatePicker";

// Date 형식 파싱 함수
import { getFormattedDate3 } from "../../../../../shared/hooks/useDate"

interface RoutineSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    // 제출하기
    onSubmit: (content: string, startDate: Date, endDate: Date) => void; // 부모 컴포에서 받아오는 함수
    initialContent: string;
    initialStartDate?: string;
    initialEndDate?: string;
}

export const RoutineSettingsModal = ({ isOpen, onClose, onSubmit, initialContent, initialStartDate, initialEndDate}: RoutineSettingsModalProps) => {
    // 백엔드에 수정요청할 데이터 정보
    const [content, setContent] = useState(initialContent);
    
    // 시작일 관련 훅
    // 훅에서 사용한 변수명: 현재 컴포에서 사용할 변수명
    const {
        isDatePickerOpen: isStartDatePickerOpen,
        selectedDate: selectedStartDate,
        handleOpenDatePicker: handleOpenStartDatePicker,
        handleCloseDatePicker: handleCloseStartDatePicker,
        handleDateSelected: handleStartDateSelected,
    } = useDatePicker();

    // 마감일 관련 훅
    // 훅에서 사용한 변수명: 현재 컴포에서 사용할 변수명
    const {
        isDatePickerOpen: isEndDatePickerOpen,
        selectedDate: selectedEndDate,
        handleOpenDatePicker: handleOpenEndDatePicker,
        handleCloseDatePicker: handleCloseEndDatePicker,
        handleDateSelected: handleEndDateSelected,
    } = useDatePicker();


    // 컴포넌트가 처음 렌더링될 때 initialStartDate를 selectedStartDate로 초기화
    useEffect(() => {
        if (initialStartDate) {
            handleStartDateSelected(new Date(initialStartDate));
        }
        if (initialEndDate) {
            handleEndDateSelected(new Date(initialEndDate));
        }
    }, [initialStartDate, initialEndDate]);


    // 모든 항목이 작성되어야 submit 버튼 활성화
    const isFormValid = content.trim() && selectedStartDate && selectedEndDate;

    const handleSubmit = () => {
        if (isFormValid) {  // 모든 항목이 작성되었으면
            onSubmit(content, selectedStartDate, selectedEndDate); // 부모 컴포넌트로 입력값 전달하여 API 호출
            onClose(); // 모달 닫기
        }
    };

    if (!isOpen) return null;

    return (
        // 모델 최상위 윤곽, 부모 위치의 중앙을 시작으로 하여 y축만 250px 위로
        <div className="absolute transform top-1/2 left-1/2 flex justify-center items-center"
             style={{ transform: 'translate(-50%, -50%) translate(0px, -250px)' }} >
            {/** 전체 모달 박스 */}
            <div className="bg-white p-6 rounded-md shadow-lg w-[320px]">
                {/** 모달 닫기 버튼 */}
                <div className="flex justify-end mb-3 mr-2">
                    <button onClick={onClose} className="font-semibold text-neutral-20 hover:text-neutral-50">✕</button>
                </div>
                {/** 모달 내용 입력 필드 */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-90"
                    />
                </div>

                {/* 시작 날짜 입력 */}
                <div className="mb-4">
                    <label className="block text-xsmall12 text-neutral-30 mb-1">시작 날짜</label>
                    <div className="relative">
                        <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-3 min-w-[248px]" onClick={handleOpenStartDatePicker}>
                            {/* 선택된 날짜 포매팅 후 출력 */}
                            {selectedStartDate ? getFormattedDate3(selectedStartDate) : '시작일'}
                            
                            {/* 이미지 클릭 시 DatePicker 열기 */}
                            <div className="z-50">
                                <PopUpDatePicker onDateSelected={handleStartDateSelected}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 종료 날짜 입력 */}
                <div className="mb-4">
                    <label className="block text-xsmall12 text-neutral-30 mb-1">종료 날짜</label>
                    <div className="relative">
                        <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-3 min-w-[248px]" onClick={handleOpenEndDatePicker}>
                            {/* 선택된 날짜 포매팅 후 출력 */}
                            {selectedEndDate ? getFormattedDate3(selectedEndDate) : '마감일'}
                            
                            {/* 이미지 클릭 시 DatePicker 열기 */}
                            <div className="z-50">
                                <PopUpDatePicker onDateSelected={handleEndDateSelected} />
                            </div>
                        </div>
                    </div>
                </div>

                {/** 주기 */}
                {/** 현재 백엔드 프론트엔드 모두 '매일'만 구현된 상황 */}
                <div className="mb-5 flex items-center text-xsmall12 gap-3">
                    <div className="w-[100px] font-semibold text-neutral-30">
                        주기
                    </div>
                    
                    <button className="w-full py-2 bg-primary-10 text-primary-100 border-[2px] border-primary-100 rounded-sm hover:bg-primary-20">
                        매일
                    </button>
                    
                    <button className="w-full py-2 bg-neutral-90 text-neutral-50 rounded-sm cursor-not-allowed">
                        매주
                    </button>
                </div>

                {/* 완료 버튼 */}
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid} // 폼이 유효하지 않으면 비활성화
                    className={`w-full py-2 font-semibold rounded-sm
                    ${isFormValid ? 'bg-primary-100 text-white hover:bg-primary-80' : 'bg-neutral-90 text-neutral-50 cursor-not-allowed'}`}
                >
                    완료
                </button>
            </div>
        </div>
    );
};