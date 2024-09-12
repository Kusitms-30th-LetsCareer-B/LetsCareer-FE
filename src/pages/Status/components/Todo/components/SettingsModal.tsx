import { useState } from "react";

// Date picker를 띄우는 컴포넌트와 훅
import PopUpDatePicker from "../../../../../components/PopUpDatePicker";
import useDatePicker from "../../../../../shared/hooks/useDatePicker";

// Date 형식 파싱 함수
import { getFormattedDate3 } from "../../../../../shared/hooks/useDate"

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    // 제출하기
    onSubmit: (content: string, startDate: Date, endDate: Date) => void; // 부모 컴포에서 받아오는 함수
    initialContent: string;
    initialStartDate?: Date;
    initialEndDate?: Date;
}

export const SettingsModal = ({ isOpen, onClose, onSubmit, initialContent, initialStartDate, initialEndDate}: SettingsModalProps) => {
    // 백엔드에 수정요청할 데이터 정보
    const [content, setContent] = useState(""); // 자료 아카이빙하기 입력 필드 상태
    const [startDate, setStartDate] = useState(new Date()); // 시작 날짜 상태
    const [endDate, setEndDate] = useState(new Date()); // 종료 날짜 상태

    
    // 시작일 관련 훅
    const {
        isDatePickerOpen: isStartDatePickerOpen,
        selectedDate: selectedStartDate,
        handleOpenDatePicker: handleOpenStartDatePicker,
        handleCloseDatePicker: handleCloseStartDatePicker,
        handleDateSelected: handleStartDateSelected,
    } = useDatePicker();

    // 마감일 관련 훅
    const {
        isDatePickerOpen: isEndDatePickerOpen,
        selectedDate: selectedEndDate,
        handleOpenDatePicker: handleOpenEndDatePicker,
        handleCloseDatePicker: handleCloseEndDatePicker,
        handleDateSelected: handleEndDateSelected,
    } = useDatePicker();

    const handleSubmit = () => {
        onSubmit(content, startDate, endDate); // 부모 컴포넌트로 입력값 전달하여 API 호출
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="absolute fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-[320px]">
                {/* 모달 제목 */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                {/* 시작 날짜 입력 */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">시작 날짜</label>
                    <div className="relative">
                        <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]" onClick={handleOpenStartDatePicker}>
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
                    <label className="block text-sm mb-1">종료 날짜</label>
                    <div className="relative">
                        <div className="flex justify-between text-start rounded-xs border border-neutral-80 font-regular text-xsmall16 text-neutral-45 p-5 min-w-[248px]" onClick={handleOpenEndDatePicker}>
                            {/* 선택된 날짜 포매팅 후 출력 */}
                            {selectedEndDate ? getFormattedDate3(selectedEndDate) : '마감일'}
                            
                            {/* 이미지 클릭 시 DatePicker 열기 */}
                            <span>
                                <PopUpDatePicker onDateSelected={handleEndDateSelected} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* 완료 버튼 */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 bg-primary-100 text-white rounded-md hover:bg-blue-700"
                >
                    완료
                </button>
            </div>
        </div>
    );
};