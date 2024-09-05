import { useEffect, useState } from "react";
import { DepartmentChip } from "../Chips/SelfIntroductionChip";
import { FailedChip } from "../Chips/StatusChip";
import { RecurringNoteChip, RecurringNoteChip2, RecurringNoteChipGroup } from "../Chips/RecurringNoteChip";
import { ButtonGroup } from "../Buttons/RecurringNoteButton";
import { SelfIntroductionQuestions } from "../Pagination/RecurringNotePagination";

interface RecurringNoteProps {
    company: string;
    task: string;
}

export const RecurringNoteHeader = ({company, task}: RecurringNoteProps) => {
    
    return (
        <div className="flex flex-col w-full items-start gap-[8px]">
            <div className="flex items-center gap-[12px]">
                <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
                    {company} 복기노트
                </span>
                <div className="flex items-center gap-[6px]">
                    <FailedChip />
                    <DepartmentChip department={task}/>
                </div>
            </div>
            <span className="w-full text-xsmall16 font-medium tracking-[-0.096px] text-neutral-50">
                지금이 가장 잘 기억할 수 있는 순간이에요! 간편하게 복기 해볼까요?
            </span>
        </div>
    );
}

export const RecurringNoteTab = ({ onSave }: { onSave: () => void }) => {
    const [activeTab, setActiveTab] = useState("document");
  
    const renderContent = () => {
      switch (activeTab) {
        case "document":
          return <div>서류 관련 정보</div>;
        case "interview":
          return <div>면접 관련 정보</div>;
        case "etc":
          return <div>기타 관련 정보</div>;
        default:
          return null;
      }
    };
  
    return (
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <button
            className={`px-[12px] py-[6px] rounded-sm text-small18 font-semibold tracking-[-0.022px] ${
              activeTab === "document" ? "bg-primary-10 text-primary" : "text-neutral-45"
            }`}
            onClick={() => setActiveTab("document")}
          >
            서류
          </button>
          <button
            className={`px-[12px] py-[6px] rounded-sm text-small18 font-semibold tracking-[-0.022px] ${
              activeTab === "interview" ? "bg-primary-10 text-primary" : "text-neutral-45"
            }`}
            onClick={() => setActiveTab("interview")}
          >
            면접
          </button>
          <button
            className={`px-[12px] py-[6px] rounded-sm text-small18 font-semibold tracking-[-0.022px] ${
              activeTab === "etc" ? "bg-primary-10 text-primary" : "text-neutral-45"
            }`}
            onClick={() => setActiveTab("etc")}
          >
            기타
          </button>
        </div>
        <button
          className="flex px-[28px] py-[10px] justify-center gap-[10px] flex-shrink-0 bg-primary rounded-sm"
          onClick={onSave}
        >
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
            저장하기
          </span>
        </button>
      </div>
    );
  };
  

interface ReviewNote {
    id: number;
    satisfaction: string;
    wellDonePoints: string[];
    shortcomingPoints: string[];
    wellDoneMemo: string;
    shortcomingMemo: string;
  }

interface DocumentRecurringNoteLeftPartProps {
    documentData?: ReviewNote;
    setDocumentData: React.Dispatch<React.SetStateAction<ReviewNote>>;
}

export const DocumentRecurringNoteLeftPart = ({
    documentData = {id: 0, satisfaction: "", wellDonePoints: [], shortcomingPoints: [], wellDoneMemo: '', shortcomingMemo: '' }, 
    setDocumentData,
}: DocumentRecurringNoteLeftPartProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [wellDonePoints, setWellDonePoints] = useState<string[]>(documentData.wellDonePoints);
    const [shortcomingPoints, setShortcomingPoints] = useState<string[]>(documentData.shortcomingPoints);
  
    useEffect(() => {
        setWellDonePoints(documentData.wellDonePoints);
        setShortcomingPoints(documentData.shortcomingPoints);
      }, [documentData.wellDonePoints, documentData.shortcomingPoints]);

      
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const toggleWellDonePoint = (point: string) => {
        const updatedPoints = wellDonePoints.includes(point)
          ? wellDonePoints.filter((p) => p !== point) // 선택 해제
          : [...wellDonePoints, point]; // 선택된 경우 추가
    
        setWellDonePoints(updatedPoints);
    
        setDocumentData((prev) => ({
          ...prev,
          wellDonePoints: updatedPoints,
        }));
      };
    
      const toggleShortcomingPoint = (point: string) => {
        const updatedPoints = shortcomingPoints.includes(point)
          ? shortcomingPoints.filter((p) => p !== point) // 선택 해제
          : [...shortcomingPoints, point]; // 선택된 경우 추가
    
        setShortcomingPoints(updatedPoints);
    
        // Update the documentData state with the new points
        setDocumentData((prev) => ({
          ...prev,
          shortcomingPoints: updatedPoints,
        }));
      };

    return(
        <div className="w-1/2 h-full flex px-[24px] py-[20px] flex-col gap-[20px] border border-neutral-80 rounded-md">
            <div className="flex justify-between items-center w-full">
                <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                    간편 복기
                </span>
            </div>
            <div className="flex items-center gap-[50px]">
                <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                    만족도
                </span>
                <div className="flex gap-[10px]">
                <RecurringNoteChipGroup
                        selected={documentData.satisfaction}
                        setSelected={(satisfaction) => setDocumentData((prev) => ({ ...prev, satisfaction: satisfaction || "" }))}
                        />                
                </div>
            </div>
            <div className="flex w-full">
                <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                    잘한 점 
                </span>
                <div className="flex flex-col items-start justify-center gap-[16px] w-full">
                    <div className="flex flex-wrap gap-[10px]">
                            {["지원동기", "산업 이해도", "논리적 구성", "적극성", "경험 활용", "회사 이해도", "명확한 표현", "성장 가능성", "직무 적합성", "직무 이해도", "차별화", "열정 표현"].map(
                                (point, index) => (
                                <RecurringNoteChip2
                                    key={index}
                                    text={point}
                                    isSelected={wellDonePoints.includes(point)}
                                    onClick={() => toggleWellDonePoint(point)}
                                />
                            )
                            )}
                    </div>

                    <textarea
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="추가로 메모하고 싶은 점을 적어주세요"
                    className={`w-full min-h-[252px] border rounded-sm px-[16px] py-[12px] resize-none placeholder:text-neutral-45 ${
                        isFocused
                          ? "outline-primary"
                          : "border-neutral-80 text-neutral-30"
                      }`}
                      value={documentData.wellDoneMemo}
                      onChange={(e) => setDocumentData((prev) => ({ ...prev, wellDoneMemo: e.target.value }))}
                    ></textarea>
                </div>
            </div>
            <div className="flex w-full">
                <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                    아쉬운 점 
                </span>
                <div className="flex flex-col items-start justify-center gap-[16px] w-full">
                    <div className="flex flex-wrap gap-[10px]">
                        {["지원동기", "산업 이해도", "논리적 구성", "적극성", "경험 활용", "회사 이해도", "명확한 표현", "성장 가능성", "직무 적합성", "직무 이해도", "차별화", "열정 표현"].map(
                            (point, index) => (
                                <RecurringNoteChip2
                                    key={index}
                                    text={point}
                                    isSelected={shortcomingPoints.includes(point)}
                                    onClick={() => toggleShortcomingPoint(point)}
                                />
                            )
                        )}
                    </div>

                    <textarea
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="추가로 메모하고 싶은 점을 적어주세요"
                    className={`w-full min-h-[252px] border rounded-sm px-[16px] py-[12px] resize-none placeholder:text-neutral-45 ${
                        isFocused
                          ? "outline-primary"
                          : "border-neutral-80 text-neutral-30"
                      }`}
                      value={documentData.shortcomingMemo}
                      onChange={(e) => setDocumentData((prev) => ({ ...prev, shortcomingMemo: e.target.value }))}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

interface DocumentRecurringNoteProps {
    question: string;
    answer: string;
    goodQuestion: string;
    questions: string[];
}

export const DocumentRecurringNoteRightPart = ({question, questions, answer, goodQuestion}: DocumentRecurringNoteProps ) => {
    const [selectedDot, setSelectedDot] = useState(0);

    const handleDotClick = (index: number) => {
        setSelectedDot(index);
    };
    
    return(
        <div className="w-1/2 flex flex-col items-start">
            <div className="w-full bg-static-100 flex flex-col items-end border border-neutral-80 rounded-md px-[24px] pt-[20px] pb-[24px]">
                <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                    자기소개 문항 불러오기
                </span>
                <div className="flex flex-col items-start flex-shrink-0 self-stretch rounded-md mb-[20px]">
                    <div className="flex items-center mb-[16px]">
                        <SelfIntroductionQuestions questions={questions} />
                    </div>
                    <div className="flex flex-col items-start flex-shrink-0 self-stretch gap-[12px]">
                        <div className="w-full bg-primary-10 flex justify-between items-center rounded-sm px-[13px] py-[12px]">
                            <div className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                                {question}
                            </div>
                        </div>
                        <div className="w-full min-h-[486px] h-full overflow-auto text-xsmall16 font-regular tracking-[-0.096px] text-neutral-30 mt-[12px]">
                            {answer}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <ButtonGroup />
                </div>
            </div>
            <div className="w-full mt-[20px] flex flex-col border border-neutral-80 rounded-md px-[24px] pt-[20px] pb-[24px]">
                <div className="flex flex-col">
                    <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30 mb-[20px]">한 번 더 보면 좋을 질문</span>
                    <div className="bg-primary-10 flex px-[16px] py-[12px] rounded-sm items-start self-stretch mb-[20px]">
                        <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                            {goodQuestion}
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-[8px]">
                        {Array(4).fill(0).map((_, index) => (
                            <button key={index} onClick={() => handleDotClick(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <circle 
                                        cx="4" 
                                        cy="4" 
                                        r="4" 
                                        fill={selectedDot === index ? '#757BFF' : '#E7E7E7'} // 선택된 버튼만 색을 변경
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};