import Calender from "../../components/Calendar"
import { DefaultDocumentChip, HoveredDocumentChip, ClickedDocumentChip,
         DefaultInterviewChip, HoveredInterviewChip, ClickedInterviewChip,
         DefaultOtherChip, HoveredOtherChip, ClickedOtherChip,
         DefaultPersonalChip, HoveredPersonalChip, ClickedPersonalChip } from "../../components/chips/CalendarChip"

function CalendarPage() {
  const companyName="네이버";
  const personalSchedule="개인일정";

  return (
    <>
      <h1>캘린더 페이지</h1>
      <Calender/>
      <br/>
      <DefaultDocumentChip companyName={companyName}/>
      <HoveredDocumentChip companyName={companyName}/>
      <ClickedDocumentChip companyName={companyName}/><br/>
      <DefaultInterviewChip companyName={companyName}/>
      <HoveredInterviewChip companyName={companyName}/>
      <ClickedInterviewChip companyName={companyName}/><br/>
      <DefaultOtherChip companyName={companyName}/>
      <HoveredOtherChip companyName={companyName}/>
      <ClickedOtherChip companyName={companyName}/><br/>
      <DefaultPersonalChip personalSchedule={personalSchedule}/>
      <HoveredPersonalChip personalSchedule={personalSchedule}/>
      <ClickedPersonalChip personalSchedule={personalSchedule}/>
    </>
  );
}

export default CalendarPage;
