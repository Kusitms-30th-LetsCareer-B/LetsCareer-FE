import { useEffect, useState } from "react";
import { DepartmentChip } from "../Chips/SelfIntroductionChip";
import { FailedChip } from "../Chips/StatusChip";
import {
  RecurringNoteChip,
  RecurringNoteChip2,
  RecurringNoteChipGroup,
  RecurringNoteChipGroup2,
} from "../Chips/RecurringNoteChip";
import {
  InterviewDeleteButton,
  InterviewReactionButtons,
  IntroductionReactionButtons,
} from "../Buttons/RecurringNoteButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GoBackButton, RecurringGoBackButton } from "../../../../components/Buttons/Button";
import { SelfIntroductionQuestions } from "../Pagination/SelfIntroducePagination";
import { InterviewQuestions } from "../Pagination/RecurringNotePagination";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface RecurringNoteProps {
  company: string;
  task: string;
}

export const RecurringNoteHeader = ({ company, task }: RecurringNoteProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[8px]">
      <div className="flex items-center gap-[12px]">

          <RecurringGoBackButton text={`${company} 복기노트`} />
          {/* {company} 복기노트 */}
        <div className="flex items-center gap-[6px]">
          <FailedChip />
          <DepartmentChip department={task} />
        </div>
      </div>
      <span className="w-full text-xsmall16 font-medium tracking-[-0.096px] text-neutral-50">
        지금이 가장 잘 기억할 수 있는 순간이에요! 간편하게 복기 해볼까요?
      </span>
    </div>
  );
};

export const RecurringNoteTab = ({
  activeTab,
  setActiveTab,
  etcData,
  setActiveTabById,
  handleNewEtcClick,
  onSave,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <button
          className={`rounded-sm px-[12px] py-[6px] text-small18 font-semibold tracking-[-0.022px] ${
            activeTab === "document"
              ? "bg-primary-10 text-primary"
              : "text-neutral-45"
          }`}
          onClick={() => setActiveTab("document")}
        >
          서류
        </button>
        <button
          className={`rounded-sm px-[12px] py-[6px] text-small18 font-semibold tracking-[-0.022px] ${
            activeTab === "interview"
              ? "bg-primary-10 text-primary"
              : "text-neutral-45"
          }`}
          onClick={() => setActiveTab("interview")}
        >
          면접
        </button>

        <button
          className={`rounded-sm px-[12px] py-[6px] text-small18 font-semibold tracking-[-0.022px] ${
            activeTab === "etc"
              ? "bg-primary-10 text-primary"
              : "text-neutral-45"
          }`}
          onClick={() => {
            setActiveTab("etc"); // 기타 탭으로 전환
            handleNewEtcClick(); // 새로운 기타 항목 추가
          }}
        >
          기타
        </button>
        {activeTab === "etc" && (
          <>
            {/* 상단 탭에 저장된 reviewName들을 버튼으로 나열 */}
            {etcData.map((etcNote) => (
              <button
                key={etcNote.id}
                className="ml-[8px] h-[38px] rounded-sm border border-neutral-80 bg-neutral-100 px-[12px] py-[6px] text-neutral-30"
                onClick={() => setActiveTabById(etcNote.id)} // 기타 탭 클릭 시 데이터 조회
              >
                {etcNote.reviewName}
              </button>
            ))}
          </>
        )}
      </div>
      <button
        className="flex flex-shrink-0 justify-center gap-[10px] rounded-sm bg-primary px-[28px] py-[10px]"
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
  reviewName: string;
  satisfaction: string;
  wellDonePoints: string[];
  shortcomingPoints: string[];
  wellDoneMemo: string;
  shortcomingMemo: string;
  introduceId?: number;
  difficulty: string;
}

interface DocumentRecurringNoteLeftPartProps {
  documentData?: ReviewNote;
  setDocumentData: React.Dispatch<React.SetStateAction<ReviewNote>>;
}

export const DocumentRecurringNoteLeftPart = ({
  documentData = {
    id: 0,
    reviewName: "",
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
    difficulty: "",
  },
  setDocumentData,
}: DocumentRecurringNoteLeftPartProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wellDonePoints, setWellDonePoints] = useState<string[]>([]);
  const [shortcomingPoints, setShortcomingPoints] = useState<string[]>([]);

  useEffect(() => {
    setWellDonePoints(documentData?.wellDonePoints || []);
    setShortcomingPoints(documentData?.shortcomingPoints || []);
  }, [documentData?.wellDonePoints, documentData?.shortcomingPoints]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleWellDonePoint = (point: string) => {
    const updatedPoints = wellDonePoints?.includes(point) // 배열 존재 여부를 확인한 후 includes 사용
      ? wellDonePoints.filter((p) => p !== point) // 선택 해제
      : [...wellDonePoints, point]; // 선택된 경우 추가
  
    setWellDonePoints(updatedPoints);
  
    setDocumentData((prev) => ({
      ...prev,
      wellDonePoints: updatedPoints,
    }));
  };
  
  const toggleShortcomingPoint = (point: string) => {
    const updatedPoints = shortcomingPoints?.includes(point) // 배열 존재 여부를 확인한 후 includes 사용
      ? shortcomingPoints.filter((p) => p !== point) // 선택 해제
      : [...shortcomingPoints, point]; // 선택된 경우 추가
  
    setShortcomingPoints(updatedPoints);
  
    setDocumentData((prev) => ({
      ...prev,
      shortcomingPoints: updatedPoints,
    }));
  };

  return (
    <div className="flex h-full w-1/2 flex-col gap-[20px] rounded-md border border-neutral-80 px-[24px] py-[20px]">
      <div className="flex w-full items-center justify-between">
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
            selected={documentData?.satisfaction || ""} // Ensure empty string if satisfaction is null
            setSelected={(satisfaction) =>
              setDocumentData((prev) => ({
                ...prev,
                satisfaction: satisfaction || "",
              }))
            }
          />
        </div>
      </div>
      <div className="flex w-full">
        <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          잘한 점
        </span>
        <div className="flex w-full flex-col items-start justify-center gap-[16px]">
          <div className="flex flex-wrap gap-[10px]">
            {[
              "지원동기",
              "산업 이해도",
              "논리적 구성",
              "적극성",
              "경험 활용",
              "회사 이해도",
              "명확한 표현",
              "성장 가능성",
              "직무 적합성",
              "직무 이해도",
              "차별화",
              "열정 표현",
            ].map((point, index) => (
              <RecurringNoteChip2
                key={index}
                text={point}
                isSelected={wellDonePoints.includes(point)}
                onClick={() => toggleWellDonePoint(point)}
              />
            ))}
          </div>

          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className={`min-h-[252px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
              isFocused
                ? "outline-primary"
                : "border-neutral-80 text-neutral-30"
            }`}
            value={documentData?.wellDoneMemo || ""}
            onChange={(e) =>
              setDocumentData((prev) => ({
                ...prev,
                wellDoneMemo: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
      <div className="flex w-full">
        <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          아쉬운 점
        </span>
        <div className="flex w-full flex-col items-start justify-center gap-[16px]">
          <div className="flex flex-wrap gap-[10px]">
            {[
              "지원동기",
              "산업 이해도",
              "논리적 구성",
              "적극성",
              "경험 활용",
              "회사 이해도",
              "명확한 표현",
              "성장 가능성",
              "직무 적합성",
              "직무 이해도",
              "차별화",
              "열정 표현",
            ].map((point, index) => (
              <RecurringNoteChip2
                key={index}
                text={point}
                isSelected={shortcomingPoints.includes(point)}
                onClick={() => toggleShortcomingPoint(point)}
              />
            ))}
          </div>

          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className={`min-h-[252px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
              isFocused
                ? "outline-primary"
                : "border-neutral-80 text-neutral-30"
            }`}
            value={documentData?.shortcomingMemo || ""}
            onChange={(e) =>
              setDocumentData((prev) => ({
                ...prev,
                shortcomingMemo: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};
interface InterviewRecurringNoteLeftPartProps {
  interviewData?: ReviewNote;
  setInterviewData: React.Dispatch<React.SetStateAction<ReviewNote>>;
}

export const InterviewRecurringNoteLeftPart = ({
  interviewData = {
    id: 0,
    reviewName: "",
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
    difficulty: "",
  },
  setInterviewData,
}: InterviewRecurringNoteLeftPartProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wellDonePoints, setWellDonePoints] = useState<string[]>(
    interviewData.wellDonePoints,
  );
  const [shortcomingPoints, setShortcomingPoints] = useState<string[]>(
    interviewData.shortcomingPoints,
  );

  useEffect(() => {
    setWellDonePoints(interviewData.wellDonePoints);
    setShortcomingPoints(interviewData.shortcomingPoints);
  }, [interviewData.wellDonePoints, interviewData.shortcomingPoints]);

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

    setInterviewData((prev) => ({
      ...prev,
      wellDonePoints: updatedPoints,
    }));
  };

  const toggleShortcomingPoint = (point: string) => {
    const updatedPoints = shortcomingPoints.includes(point)
      ? shortcomingPoints.filter((p) => p !== point) // 선택 해제
      : [...shortcomingPoints, point]; // 선택된 경우 추가

    setShortcomingPoints(updatedPoints);

    setInterviewData((prev) => ({
      ...prev,
      shortcomingPoints: updatedPoints,
    }));
  };

  return (
    <div className="flex h-full w-1/2 flex-col gap-[20px] rounded-md border border-neutral-80 px-[24px] py-[20px]">
      <div className="flex w-full items-center justify-between">
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
            selected={interviewData.satisfaction}
            setSelected={(satisfaction) =>
              setInterviewData((prev) => ({
                ...prev,
                satisfaction: satisfaction || "",
              }))
            }
          />
        </div>
      </div>
      <div className="flex w-full">
        <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          잘한 점
        </span>
        <div className="flex w-full flex-col items-start justify-center gap-[16px]">
          <div className="flex flex-wrap gap-[10px]">
            {[
              "지원동기",
              "산업 이해도",
              "논리적 구성",
              "적극성",
              "경험 활용",
              "회사 이해도",
              "명확한 표현",
              "성장 가능성",
              "직무 적합성",
              "직무 이해도",
              "차별화",
              "열정 표현",
            ].map((point: string, index: number) => (
              <RecurringNoteChip2
                key={index}
                text={point}
                isSelected={wellDonePoints ? wellDonePoints.includes(point) : false} // wellDonePoints가 undefined일 때 대비
                onClick={() => toggleWellDonePoint(point)}
              />
            ))}
          </div>

          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className={`min-h-[252px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
              isFocused
                ? "outline-primary"
                : "border-neutral-80 text-neutral-30"
            }`}
            value={interviewData.wellDoneMemo}
            onChange={(e) =>
              setInterviewData((prev) => ({
                ...prev,
                wellDoneMemo: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
      <div className="flex w-full">
        <span className="w-1/5 text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          아쉬운 점
        </span>
        <div className="flex w-full flex-col items-start justify-center gap-[16px]">
          <div className="flex flex-wrap gap-[10px]">
            {[
              "지원동기",
              "산업 이해도",
              "논리적 구성",
              "적극성",
              "경험 활용",
              "회사 이해도",
              "명확한 표현",
              "성장 가능성",
              "직무 적합성",
              "직무 이해도",
              "차별화",
              "열정 표현",
            ].map((point: string, index: number) => (
              <RecurringNoteChip2
                key={index}
                text={point}
                isSelected={wellDonePoints ? wellDonePoints.includes(point) : false} // wellDonePoints가 undefined일 때 대비
                onClick={() => toggleWellDonePoint(point)}
              />
            ))}
          </div>

          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className={`min-h-[252px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
              isFocused
                ? "outline-primary"
                : "border-neutral-80 text-neutral-30"
            }`}
            value={interviewData.shortcomingMemo}
            onChange={(e) =>
              setInterviewData((prev) => ({
                ...prev,
                shortcomingMemo: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};

interface NoSelfIntroductionProps {
  onClick: () => void;
}

export const NoSelfIntroduction = ({ onClick }: NoSelfIntroductionProps) => {
  return (
    <div className="mb-[16px] flex w-full flex-col gap-[20px]">
      <div className="flex min-h-[756px] w-full flex-col items-end rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
        <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          자기소개 문항 불러오기
        </span>
        <div className="flex flex-col items-center justify-center gap-[20px] self-stretch">
          <div className="mt-[260px] flex flex-col items-center justify-center gap-[20px]">
            <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
              저장된 자소서 내용이 없어요!
            </span>
            <button
              onClick={onClick}
              className="flex items-center justify-center rounded-md bg-primary px-[20px] py-[13px]"
            >
              <span className="text-small18 font-medium tracking-[-0.022px] text-static-100">
                자기소개서 아카이빙 하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SelfIntroduction {
  introduceId: number | null;
  question: string;
  answer: string;
  reactionType: string | null;
}

interface DocumentRecurringNoteProps {
  question: string;
  answer: string;
  questions: string[];
  reactionType: string;
  introduceId: number;
  onQuestionClick: (index: number) => void;
  onReactionSave: (introduceId: number, reactionType: string) => void;
}

export const DocumentRecurringNoteRightPart = ({
  question,
  questions,
  answer,
  reactionType,
  introduceId,
  onQuestionClick,
  onReactionSave,
}: DocumentRecurringNoteProps) => {
  const [selectedDot, setSelectedDot] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0); // 선택된 질문 번호

  const handleQuestionClick = (index: number) => {
    setSelectedQuestion(index);
    onQuestionClick(index);
  };

  const handleDotClick = (index: number) => {
    setSelectedDot(index);
  };

  const handleReactionChange = (newReactionType: "잘했어요" | "아쉬워요" | null) => {
    onReactionSave(introduceId, newReactionType); 
  };


  return (
    <div className="mb-[20px] flex w-full flex-col items-end rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
      <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
        자기소개 문항 불러오기
      </span>
      <div className="mb-[20px] flex flex-shrink-0 flex-col items-start self-stretch rounded-md">
        <div className="mb-[16px] flex items-center">
          <InterviewQuestions
            questions={questions}
            selectedQuestion={selectedQuestion} // 현재 선택된 질문
            onQuestionClick={handleQuestionClick} // 질문 클릭 시 처리
          />
        </div>
        <div className="flex flex-shrink-0 flex-col items-start gap-[12px] self-stretch">
          <div className="flex min-h-[48px] w-full items-center justify-between rounded-sm bg-primary-10 px-[13px] py-[12px]">
            <div className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
              {question}
            </div>
          </div>
          <div className="font-regular mt-[12px] h-full min-h-[488px] w-full overflow-auto text-xsmall16 tracking-[-0.096px] text-neutral-30">
            {answer}
          </div>
        </div>
      </div>
      <div className="flex">
        <IntroductionReactionButtons
          introduceId={String(introduceId)}
          initialReactionType={reactionType ? (reactionType as "잘했어요" | "아쉬워요") : null}
          onReactionChange={handleReactionChange}
        />
      </div>
    </div>
  );
};

interface InterviewQuestion {
  interviewId: number | null;
  question: string;
  answer: string;
}

interface InterviewRecurringNoteProps {
  question: string;
  answer: string;
  questions: InterviewQuestion[]; // 여기서 questions 배열은 { question: string } 형태의 객체 배열
  interviewId: number;
  onQuestionClick: (index: number) => void;
}

interface QuestionComponentProps {
  question: string;
  answer: string;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
}

const QuestionComponent = ({
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
}: QuestionComponentProps) => {
  return (
    <div className="flex w-full flex-shrink-0 flex-col items-start gap-[12px] self-stretch">
      {/* 질문 텍스트박스 */}
      <div className="mt-[12px] flex w-full items-start self-stretch rounded-sm">
        <textarea
          value={question}
          placeholder="질문을 입력하세요"
          rows={1}
          onChange={(e) => onQuestionChange(e.target.value)}
          className="flex w-full resize-none items-start self-stretch rounded-sm border border-neutral-80 px-[16px] py-[12px] text-neutral-30 placeholder:text-neutral-45"
        />
      </div>
      {/* 답변 텍스트박스 */}
      <div className="mb-[20px] flex items-start self-stretch">
        <textarea
          value={answer}
          placeholder="답변을 입력하세요"
          onChange={(e) => onAnswerChange(e.target.value)}
          className="font-regular h-full min-h-[488px] w-full resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
        />
      </div>
    </div>
  );
};


interface InterviewQuestion {
  interviewId: number | null;
  question: string;
  answer: string;
  order: number;
  type: string | null;
}

interface InterviewRecurringNoteProps {
  question: string;
  answer: string;
  interviewId: number;
  reactionType: string;
  onReactionSave: (interviewId: number, reactionType: string) => void;
  questions: InterviewQuestion[]; // InterviewQuestion 배열 타입
  onQuestionClick: (index: number) => void;
}

export const InterviewRecurringNoteRightPart = ({
  question,
  answer,
  reactionType,
  onReactionSave,
  interviewId,
  questions,
  onQuestionClick,
}: InterviewRecurringNoteProps) => {
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0); // 선택된 질문 번호
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 확인창 표시 상태

  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  // 면접 질문 리스트 조회
  useEffect(() => {
    const fetchInterviewQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interviews`, {
          params: { recruitmentId },
        });

        const data = response.data.data;

        if (data && data.length > 0) {
          setInterviewQuestions(data); // 조회된 데이터를 상태로 설정
        } else {
          // 조회된 데이터가 없으면 빈 질문 하나 추가
          setInterviewQuestions([
            {
              interviewId: null,
              question: "",
              answer: "",
              order: 1,
              type: null,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching interview questions", error);
        // 에러 발생 시에도 기본 질문 추가
        setInterviewQuestions([
          { interviewId: null, question: "", answer: "", order: 1, type: null },
        ]);
      }
    };

    fetchInterviewQuestions();
  }, [recruitmentId]);

  const handleAddQuestion = () => {
    setInterviewQuestions([
      ...interviewQuestions,
      {
        interviewId: null,
        question: "",
        answer: "",
        order: interviewQuestions.length + 1,
        type: null,
      },
    ]);
  };

  const handleSaveQuestions = async () => {
    const requestBody = interviewQuestions.map((question) => ({
      order: question.order,
      question: question.question,
      answer: question.answer,
    }));
  
    try {
      const response = await axios.put(
        `${BASE_URL}/interviews`,
        requestBody,
        {
          params: { recruitmentId }, // 채용 일정 ID 전달
        }
      );
      alert("저장 완료");
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("저장 실패");
    }
  };

  const handleDeleteQuestion = async () => {
    setShowDeleteConfirm(true); // 삭제 확인창 띄우기
  };

  const handleDeleteConfirm = async () => {
    try {
      const interviewIdToDelete =
        interviewQuestions[selectedQuestion]?.interviewId;

      if (interviewIdToDelete) {
        // API 호출을 통한 삭제 처리
        await axios.delete(`${BASE_URL}/interviews/${interviewIdToDelete}`, {
          params: { recruitmentId },
        });

        // 삭제 후 처리 (예: 질문 리스트 갱신)
        const updatedQuestions = interviewQuestions.filter(
          (_, i) => i !== selectedQuestion,
        );
        setInterviewQuestions(updatedQuestions);
        setSelectedQuestion(0); // 첫 번째 질문 선택
      }

      alert("삭제 완료");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("삭제 실패");
    }
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...interviewQuestions];
    updatedQuestions[index].question = value;
    setInterviewQuestions(updatedQuestions); // 질문 업데이트
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedQuestions = [...interviewQuestions];
    updatedQuestions[index].answer = value;
    setInterviewQuestions(updatedQuestions); // 답변 업데이트
  };

  const handleReaction = (type: string) => {
    onReactionSave(interviewId, type); // reactionType을 저장하는 함수
  };

  const handleReactionChange = (newReactionType: "잘했어요" | "아쉬워요" | null) => {
    onReactionSave(interviewId, newReactionType);
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full flex-col items-end rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
        <div className="flex items-center self-stretch justify-between">
          <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
            면접 질문&답변 리스트
          </span>
          <div className="flex gap-[12px]">
            {/* 질문 저장 버튼 */}
            <button
              onClick={handleSaveQuestions}
              className="flex bg-neutral-100 items-center justify-center rounded-sm border border-neutral-80 px-[10px] py-[6px] w-[100px]"
            >
              <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                질문 저장
              </span>
            </button>
            {/* 질문 삭제 버튼 */}
            <button
              onClick={handleDeleteQuestion}
              className="flex bg-neutral-100 items-center justify-center rounded-sm border border-neutral-80 px-[10px] py-[6px] w-[100px]"
            >
              <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                질문 삭제
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between self-stretch gap-[6px]">
          <div className="flex items-center mt-[20px]">
            {/* 질문 리스트 컴포넌트 */}
            <SelfIntroductionQuestions
              questions={interviewQuestions.map((_, index) => `${index + 1}`)} // 질문 번호
              selectedQuestion={selectedQuestion} // 현재 선택된 질문
              onQuestionClick={(index) => setSelectedQuestion(index)} // 질문 클릭 시 처리
              onQuestionAdd={handleAddQuestion} // 질문 추가 버튼 처리
              totalItems={interviewQuestions.length} // 전체 질문 수
              itemsPerPage={1} // 페이지 당 질문 수 (한 페이지에 하나의 질문만 표시)
              initialPage={1} // 초기 페이지는 1
              onPageChange={(page) => setSelectedQuestion(page - 1)} // 페이지 변경 시 처리
            />
          </div>
        </div>
  
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <InterviewDeleteButton
              onDelete={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
          </div>
        )}
  
        {/* 질문/답변 입력 필드: 선택된 질문이 보이는 자리 */}
        <QuestionComponent
          question={interviewQuestions[selectedQuestion]?.question || ""}
          answer={interviewQuestions[selectedQuestion]?.answer || ""}
          onQuestionChange={(value) =>
            handleQuestionChange(selectedQuestion, value)
          }
          onAnswerChange={(value) =>
            handleAnswerChange(selectedQuestion, value)
          }
        />
  
        <div className="flex">
          {/* 리액션 버튼 그룹 */}
          <InterviewReactionButtons
            interviewId={String(interviewQuestions[selectedQuestion]?.interviewId || "")}
            initialReactionType={reactionType? (reactionType as "잘했어요" | "아쉬워요") : null}
            onReactionChange={handleReactionChange}
          />
        </div>
      </div>
    </div>
  );
}

interface EtcRecurringNotePartProps {
  etcData: ReviewNote[]; // ReviewNote 배열로 수정
  setEtcData: (index: number, updatedEtc: ReviewNote) => void;
}
export const EtcRecurringNotePart = ({ etcData, setEtcData }) => {
  const [showError, setShowError] = useState(false); // 에러 메시지 표시 여부 상태

  const handleReviewNameChange = (e) => {
    const value = e.target.value;
    setEtcData({ ...etcData, reviewName: value });
    if (!value) {
      setShowError(true); // 빈 값이면 에러 메시지 표시
    } else {
      setShowError(false); // 값이 있으면 에러 메시지 숨김
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-[20px] self-stretch rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
      <div className="flex w-full items-center justify-between">
        <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          간편 복기
        </span>
      </div>

      {/* 전형명 입력 */}
      <div className="flex w-full flex-col items-start gap-[8px] self-stretch">
        <div className="flex w-full items-center gap-[50px]">
          <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
            전형명
          </span>
          <input
            type="text"
            value={etcData.reviewName}
            onChange={handleReviewNameChange}
            placeholder="전형명을 입력하세요"
            className="rounded-sm border border-neutral-80 px-[16px] py-[12px] text-neutral-30 placeholder:text-neutral-45"
          />
        </div>
        {showError && (
          <span className="text-xs text-red-500">
            전형명을 입력해주세요
          </span>
        )}
      </div>

      {/* 만족도, 난이도 등 기타 정보 입력 */}
      {/* 만족도 */}
      <div className="flex items-center gap-[50px]">
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          만족도
        </span>
        <RecurringNoteChipGroup
          selected={etcData.satisfaction}
          setSelected={(satisfaction) =>
            setEtcData({ ...etcData, satisfaction })
          }
        />
      </div>

      {/* 난이도 */}
      <div className="flex items-center gap-[50px]">
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          난이도
        </span>
        <RecurringNoteChipGroup2
          selected={etcData.difficulty}
          setSelected={(difficulty) =>
            setEtcData({ ...etcData, difficulty: difficulty || "" })
          }
        />
      </div>

      {/* 잘한 점, 아쉬운 점 */}
      <div className="flex flex-col gap-[20px]">
        <div className="flex w-full items-start gap-[47px] self-stretch">
          <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
            잘한 점
          </span>
          <textarea
            value={etcData.wellDoneMemo}
            onChange={(e) =>
              setEtcData({ ...etcData, wellDoneMemo: e.target.value })
            }
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className="font-regular min-h-[130px] min-w-[980px] resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
          />
        </div>

        <div className="flex w-full items-start gap-[33px] self-stretch">
          <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
            아쉬운 점
          </span>
          <textarea
            value={etcData.shortcomingMemo}
            onChange={(e) =>
              setEtcData({ ...etcData, shortcomingMemo: e.target.value })
            }
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className="font-regular min-h-[130px] min-w-[980px] resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
          />
        </div>
      </div>
    </div>
  );
};

interface AgainQuestionProps {
  recruitmentId: string; 
}

export const IntroductionsAgainQuestion = ({ recruitmentId }: AgainQuestionProps) => {
  const [badQuestions, setBadQuestions] = useState<string[]>([]); // 질문 리스트 상태
  const [selectedDot, setSelectedDot] = useState(0); // 현재 선택된 질문의 index
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchBadQuestions = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `${BASE_URL}/introduces/additional?recruitmentId=${recruitmentId}`,
        );

        const questionsData = response.data.data || [];
        setBadQuestions(questionsData.map((q: any) => q.question));
        setLoading(false); // 데이터 로드 완료 시 로딩 상태 해제
      } catch (error) {
        console.error("Error fetching bad questions:", error);
        setLoading(false); // 에러 발생 시 로딩 상태 해제
      }
    };

    fetchBadQuestions();
  }, [recruitmentId]);

  const handleDotClick = (index: number) => {
    setSelectedDot(index); // 클릭한 버튼의 index로 변경
  };

  if (loading) {
    return <div>질문을 불러오는 중입니다...</div>; // 로딩 중일 때 출력
  }

  if (badQuestions.length === 0) {
    return <NoGoodQuestion />; // 조회된 질문이 없을 때 NoGoodQuestion 컴포넌트 출력
  }

  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-80 px-[24px] pb-[24px] pt-[20px]">
      <div className="flex flex-col">
        <span className="mb-[20px] self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          한 번 더 보면 좋을 질문
        </span>

        <div className="mb-[20px] flex min-h-[73px] items-start self-stretch rounded-sm bg-primary-10 px-[16px] py-[12px]">
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
            {badQuestions[selectedDot]} {/* 선택된 질문 표시 */}
          </span>
        </div>

        <div className="flex items-center justify-center gap-[8px]">
          {badQuestions.map((_, index) => (
            <button key={index} onClick={() => handleDotClick(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <circle
                  cx="4"
                  cy="4"
                  r="4"
                  fill={selectedDot === index ? "#757BFF" : "#E7E7E7"} // 선택된 버튼만 색을 변경
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const InterviewsAgainQuestion = ({ recruitmentId }: AgainQuestionProps) => {
  const [badQuestions, setBadQuestions] = useState<string[]>([]); // 질문 리스트 상태
  const [selectedDot, setSelectedDot] = useState(0); // 현재 선택된 질문의 index

  useEffect(() => {
    const fetchBadQuestions = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `${BASE_URL}/interviews/additional?recruitmentId=${recruitmentId}`,
        );

        const questionsData = response.data.data || [];
        // 질문 리스트를 상태에 저장
        setBadQuestions(questionsData.map((q: any) => q.question));
      } catch (error) {
        console.error("Error fetching bad questions:", error);
      }
    };

    fetchBadQuestions();
  }, [recruitmentId]);

  const handleDotClick = (index: number) => {
    setSelectedDot(index); // 클릭한 버튼의 index로 변경
  };

  if (badQuestions.length === 0) {
    return <NoGoodQuestion />; // 조회된 질문이 없을 때 NoGoodQuestion 컴포넌트 출력
  }


  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-80 px-[24px] pb-[24px] pt-[20px]">
      <div className="flex flex-col">
        <span className="mb-[20px] self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          한 번 더 보면 좋을 질문
        </span>

        {badQuestions.length > 0 ? (
          <>
            <div className="mb-[20px] flex min-h-[73px] items-start self-stretch rounded-sm bg-primary-10 px-[16px] py-[12px]">
              <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                {badQuestions[selectedDot]} {/* 선택된 질문 표시 */}
              </span>
            </div>
            <div className="flex items-center justify-center gap-[8px]">
              {badQuestions.map((_, index) => (
                <button key={index} onClick={() => handleDotClick(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="4"
                      fill={selectedDot === index ? "#757BFF" : "#E7E7E7"} // 선택된 버튼만 색을 변경
                    />
                  </svg>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>질문을 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
};

export const NoGoodQuestion = () => {
  return (
    <div className="flex w-full flex-col items-start rounded-md border border-neutral-80 bg-static-100 px-[24px] py-[24px] pt-[20px] mt-[3px]">
      <div className="flex w-full flex-col gap-[20px]">
        <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          한 번 더 보면 좋을 질문
        </span>
        <div className="flex min-h-[96px] items-center justify-center self-stretch rounded-sm bg-primary-10 px-[16px] py-[12px]">
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-primary-70">
            아쉬웠던 답변의 질문을 한번 더 확인해요
          </span>
        </div>
      </div>
    </div>
  );
};
