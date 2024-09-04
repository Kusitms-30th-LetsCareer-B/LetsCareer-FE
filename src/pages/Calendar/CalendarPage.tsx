import Calender from "../../components/Calendar";
import DatePicker from "../../components/DatePicker";

import {
  DefaultDocumentChip,
  HoveredDocumentChip,
  ClickedDocumentChip,
  DefaultInterviewChip,
  HoveredInterviewChip,
  ClickedInterviewChip,
  DefaultOtherChip,
  HoveredOtherChip,
  ClickedOtherChip,
  DefaultPersonalChip,
  HoveredPersonalChip,
  ClickedPersonalChip,
} from "../../components/Chips/CalendarChip";
import useDatePicker from "../../shared/hooks/useDatePicker";

function CalendarPage() {
  // 캘린더 컴포 테스트용
  const companyName = "네이버";
  const personalSchedule = "개인일정";

  // 데이터피커 테스트용
  const {
    isDatePickerOpen,
    selectedDate,
    handleOpenDatePicker,
    handleCloseDatePicker,
    handleDateSelected,
  } = useDatePicker();

  return (
    <>
      <h1>캘린더 페이지 테스트</h1>
      <Calender />
      <br />
      <DatePicker
        onCancel={handleCloseDatePicker}
        onSelect={handleDateSelected}
        message={"서류 시작일을 선택해주세요."}
      />
      {/* 선택된 날짜 표시 */}
      {selectedDate && <div>선택된 날짜: {selectedDate.toDateString()}</div>}
      <br />
      <DefaultDocumentChip companyName={companyName} />
      <HoveredDocumentChip companyName={companyName} />
      <ClickedDocumentChip companyName={companyName} />
      <br />
      <DefaultInterviewChip companyName={companyName} />
      <HoveredInterviewChip companyName={companyName} />
      <ClickedInterviewChip companyName={companyName} />
      <br />
      <DefaultOtherChip companyName={companyName} />
      <HoveredOtherChip companyName={companyName} />
      <ClickedOtherChip companyName={companyName} />
      <br />
      <DefaultPersonalChip personalSchedule={personalSchedule} />
      <HoveredPersonalChip personalSchedule={personalSchedule} />
      <ClickedPersonalChip personalSchedule={personalSchedule} />
    </>
  );
}

export default CalendarPage;
