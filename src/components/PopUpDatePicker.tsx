/** 데이터 피커를 팝업으로 띄우는 컴포 */

// Date picker 아이콘, 컴포넌트, 훅
import datePicker from "../shared/assets/datePicker.png";
import DatePicker from "./DatePicker";
import useDatePicker from "../shared/hooks/useDatePicker";

// 부모 컴포에게 selectedDate값을 넘기기위한 Probs
interface PopUpDatePickerProps {
  onDateSelected: (date: Date) => void;
}

// 컴포넌트
const PopUpDatePicker = ({ onDateSelected }: PopUpDatePickerProps) => {
  // 사용할 훅 불러오기
  const {
    isDatePickerOpen,
    selectedDate,
    handleOpenDatePicker,
    handleCloseDatePicker,
    handleDateSelected,
  } = useDatePicker();

  // handleDateSelected 발동시에
  // 부모 컴포에게 selectedDate를 넘기기 위한 훅 정의
  const handleDateSelect = (date: Date) => {
    handleDateSelected(date); // 기존 훅 업뎃
    onDateSelected(date); // 부모에게 선택된 데이터 전송
    handleCloseDatePicker(); // 날짜 선택 후 DatePicker 닫기
  };

  return (
    <>
      {/* 이미지 클릭 시 DatePicker 열기 */}
      <div onClick={handleOpenDatePicker} className="cursor-pointer">
        <img src={datePicker} alt="date picker icon" />
      </div>

      {/* DatePicker 컴포넌트: 위에서 img 클릭시에 띄우기 */}
      {isDatePickerOpen && (
        // 데이터피커를 절대적 위치(부모 컴포 바로 위)에 독립적으로 띄우기
        <div className="absolute mt-2 p-4">
          <DatePicker
            onCancel={handleCloseDatePicker} // 닫기 버튼 클릭 시 핸들러
            onSelect={handleDateSelect} // 날짜 선택 시 핸들러
            message={"서류 마감일을 선택해주세요."}
          />
        </div>
      )}
    </>
  );
};
export default PopUpDatePicker;
