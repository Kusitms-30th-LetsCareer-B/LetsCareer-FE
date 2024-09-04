import { DocumentRecurringNoteLeftPart, DocumentRecurringNoteRightPart, RecurringNoteHeader, RecurringNoteTab } from "./components/Helpers/RecurringNoteHelper";

function RecurringNotePage() {
    const company = "하이브아이엠";
    const department = "마케팅 직무";
    const question = "지원자가 생각하는 이 회사만의 경쟁력이 무엇이고, 향후 3년 간 사업 방향성은 어떻게 될 것 같나요?";
    const answer = "잠이 오니";
    const goodQuestion = "제가 잘하고 잇는걸까요..?";

    const questions = [
        "자기소개서 문항 1",
        "자기소개서 문항 2",
        "자기소개서 문항 3",
        "자기소개서 문항 4",
        "자기소개서 문항 5",
      ];

    return (
        <div className="w-[1128px] mb-[100px] mx-[48px] mt-[40px]">
            <RecurringNoteHeader company={company} department={department}/>
            <div className="flex flex-col w-full items-start gap-[20px] mt-[40px] mb-[20px]">
                <RecurringNoteTab />
            </div>
            <div className="flex items-start gap-[20px]">
                <DocumentRecurringNoteLeftPart />
                <DocumentRecurringNoteRightPart question={question} answer={answer} goodQuestion={goodQuestion} questions={questions} />
            </div>
        </div>
    );
}

export default RecurringNotePage;
