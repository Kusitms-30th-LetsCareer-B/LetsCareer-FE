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
  ButtonGroup,
  InterviewDeleteButton,
} from "../Buttons/RecurringNoteButton";
import { SelfIntroductionQuestions } from "../Pagination/RecurringNotePagination";
import { Pagination } from "../Pagination/SelfIntroducePagination";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface RecurringNoteProps {
  company: string;
  task: string;
}

export const RecurringNoteHeader = ({ company, task }: RecurringNoteProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[8px]">
      <div className="flex items-center gap-[12px]">
        <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
          {company} 복기노트
        </span>
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

export const RecurringNoteTab = ({ activeTab, setActiveTab, onSave }) => {
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
          onClick={() => setActiveTab("etc")}
        >
          기타
        </button>
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
  const [wellDonePoints, setWellDonePoints] = useState<string[]>(
    documentData.wellDonePoints,
  );
  const [shortcomingPoints, setShortcomingPoints] = useState<string[]>(
    documentData.shortcomingPoints,
  );

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
            selected={documentData.satisfaction}
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
            value={documentData.wellDoneMemo}
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
            value={documentData.shortcomingMemo}
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
            className={`min-h-[257px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
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
            className={`min-h-[257px] w-full resize-none rounded-sm border px-[16px] py-[12px] placeholder:text-neutral-45 ${
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
    <div className="flex w-1/2 flex-col gap-[20px]">
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
  goodQuestion: string;
  questions: string[];
  reactionType: string;
  onReactionSave: (introduceId: number, reactionType: string) => Promise<void>;
  introduceId: number;
  onQuestionClick: (index: number) => void;
}

export const DocumentRecurringNoteRightPart = ({
  question,
  questions,
  answer,
  goodQuestion,
  reactionType,
  onReactionSave,
  introduceId,
  onQuestionClick,
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

  return (
    <div className="mb-[20px] flex w-full flex-col items-end rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
      <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
        자기소개 문항 불러오기
      </span>
      <div className="mb-[20px] flex flex-shrink-0 flex-col items-start self-stretch rounded-md">
        <div className="mb-[16px] flex items-center">
          <SelfIntroductionQuestions
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
          <div className="font-regular mt-[12px] h-full min-h-[465px] w-full overflow-auto text-xsmall16 tracking-[-0.096px] text-neutral-30">
            {answer}
          </div>
        </div>
      </div>
      <div className="flex">
        <ButtonGroup
          introduceId={introduceId}
          reactionType={reactionType}
          onReactionSave={onReactionSave}
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
  questions:  InterviewQuestion[]; // 여기서 questions 배열은 { question: string } 형태의 객체 배열
  reactionType: string;
  onReactionSave: (introduceId: number, reactionType: string) => Promise<void>;
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
          className="font-regular min-h-[465px] w-full resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
        />
      </div>
    </div>
  );
};

export const InterviewRecurringNoteRightPart = ({
  question,
  questions,
  answer,
  reactionType,
  onReactionSave,
  interviewId,
  onQuestionClick,
}: InterviewRecurringNoteProps) => {
  const [questionList, setQuestionList] = useState(
    questions.map((q) => ({ question: q.question, answer: q.answer, interviewId: q.interviewId }))
  );
  const [selectedQuestion, setSelectedQuestion] = useState(0); // 선택된 질문 번호
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 확인창 표시 상태
  const [currentInterviewId, setCurrentInterviewId] = useState<number | null>(
    null,
  ); // 선택된 질문의 interviewId

  // 초기 질문, 답변 데이터 업데이트 (조회)
  useEffect(() => {
    setQuestionList(
      questions.map((q) => ({ question: q.question, answer: q.answer, interviewId: q.interviewId }))
    );
  }, [questions, question, answer]);


  const handleQuestionClick = (index: number) => {
    setSelectedQuestion(index);
    onQuestionClick(index);
    setCurrentInterviewId(questionList[index]?.interviewId || null); // 현재 선택된 질문의 interviewId 설정
  };

  const handleDeleteQuestion = () => {
    setShowDeleteConfirm(true); // 삭제 확인창 띄우기
  };

  const handleDeleteConfirm = async () => {
    try {
      const interviewIdToDelete = questionList[selectedQuestion]?.interviewId;

      if (interviewIdToDelete) {
        // API 호출을 통한 삭제 처리
        await axios.delete(`${BASE_URL}/interviews/${interviewIdToDelete}`, {
          params: { recruitmentId: interviewId },
        });
        alert("질문이 삭제되었습니다.");
        // 삭제 후 처리 (예: 질문 리스트 갱신)
        const updatedQuestions = questionList.filter((_, i) => i !== selectedQuestion);
        setQuestionList(updatedQuestions);
        setSelectedQuestion(0); // 첫 번째 질문 선택
      } else {
        alert("삭제할 질문의 ID를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("질문 삭제에 실패했습니다.");
    }
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };


  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };

  const handleAddQuestion = async () => {
    try {
      const newOrder = questionList.length + 1;
      const newQuestion = { interviewId: null, order: newOrder, question: "", answer: "" };
      setQuestionList([...questionList, newQuestion]); // 새로운 질문 추가
      setSelectedQuestion(questionList.length); // 새로운 질문 선택

      // API 요청으로 새로운 질문 추가
      const response = await axios.put(`${BASE_URL}/interviews?recruitmentId=${interviewId}`, [
        newQuestion,
      ]);

      const addedQuestion = response.data[0]; // 서버에서 반환된 질문 데이터
      const updatedQuestionList = [...questionList];
      updatedQuestionList[updatedQuestionList.length - 1].interviewId = addedQuestion.interviewId;
      setQuestionList(updatedQuestionList); // 새로운 질문에 interviewId 추가
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[index].answer = value;
    setQuestionList(updatedQuestions); // 답변 업데이트
  };

  // 질문 업데이트 (자동 저장 API 호출)
  const handleQuestionChange = async (index: number, value: string) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[index].question = value;
    setQuestionList(updatedQuestions); // 질문 업데이트

    // API 호출하여 변경된 질문 저장
    try {
      await axios.put(
        `${BASE_URL}/interviews?recruitmentId=${interviewId}`,
        updatedQuestions.map((q, i) => ({
          order: i + 1,
          question: q.question,
          answer: q.answer,
        })),
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full flex-col items-end rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
        <span className="self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          면접 질문&답변 리스트
        </span>
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center">
            {/* 질문 리스트 컴포넌트 */}
            <SelfIntroductionQuestions
             questions={questionList.map((q, index) => `${index + 1}`)} // 질문 번호
             selectedQuestion={selectedQuestion} // 현재 선택된 질문
             onQuestionClick={handleQuestionClick} // 질문 클릭 시 처리
            />
            {/* 추가하기 버튼 */}
            <button
              onClick={handleAddQuestion} // 질문 추가 버튼 클릭
              className="ml-[6px] mt-[18px] flex h-[28px] w-[70px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-neutral-80 bg-static-100"
            >
              <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-45">
                추가하기
              </span>
            </button>
          </div>
          {/* 질문 삭제 버튼 */}
          <button
            onClick={handleDeleteQuestion}
            className="flex items-center justify-center gap-[10px] rounded-sm border border-neutral-80 px-[20px] py-[6px]"
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
              질문 삭제
            </span>
          </button>
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
          question={questionList[selectedQuestion]?.question || ""}
          answer={questionList[selectedQuestion]?.answer || ""}
          onQuestionChange={(value) =>
            handleQuestionChange(selectedQuestion, value)
          }
          onAnswerChange={(value) =>
            handleAnswerChange(selectedQuestion, value)
          }
        />

        <div className="flex">
          {/* 리액션 버튼 그룹 */}
          <ButtonGroup
            introduceId={interviewId}
            reactionType={reactionType}
            onReactionSave={onReactionSave}
          />
        </div>
      </div>
    </div>
  );
};

interface EtcRecurringNotePartProps {
  etcData?: ReviewNote;
  setEtcData: React.Dispatch<React.SetStateAction<ReviewNote>>;
}

export const EtcRecurringNotePart = ({
  etcData = {
    id: 0,
    reviewName: "",
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
    difficulty: "",
  },
  setEtcData,
}: EtcRecurringNotePartProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[20px] self-stretch rounded-md border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[20px]">
      <div className="flex w-full items-center justify-between self-stretch">
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
            selected={etcData.satisfaction}
            setSelected={(satisfaction) =>
              setEtcData((prev) => ({
                ...prev,
                satisfaction: satisfaction || "",
              }))
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-[50px]">
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          난이도
        </span>
        <div className="flex gap-[10px]">
          <RecurringNoteChipGroup2
            selected={etcData.difficulty}
            setSelected={(difficulty) =>
              setEtcData((prev) => ({
                ...prev,
                difficulty: difficulty || "",
              }))
            }
          />
        </div>
      </div>

      <div className="flex w-full items-start gap-[45px] self-stretch">
        <span className="w-text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          잘한 점
        </span>
        <div className="flex min-w-[988px] items-start self-stretch rounded-sm">
          <textarea
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className="font-regular min-h-[130px] w-full resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
          ></textarea>
        </div>
      </div>

      <div className="flex w-full items-start gap-[32px] self-stretch">
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          아쉬운 점
        </span>
        <div className="flex min-w-[988px] items-start self-stretch rounded-sm">
          <textarea
            placeholder="추가로 메모하고 싶은 점을 적어주세요"
            className="font-regular min-h-[130px] w-full resize-none rounded-sm border border-neutral-80 px-[16px] py-[12px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

interface AgainQuestionProps {
  goodQuestions: string[]; // 질문 리스트로 수정
}

export const AgainQuestion = ({ goodQuestions }: AgainQuestionProps) => {
  const [selectedDot, setSelectedDot] = useState(0); // 현재 선택된 질문의 index

  const handleDotClick = (index: number) => {
    setSelectedDot(index); // 클릭한 버튼의 index로 변경
  };

  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-80 px-[24px] pb-[24px] pt-[20px]">
      <div className="flex flex-col">
        <span className="mb-[20px] self-stretch text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          한 번 더 보면 좋을 질문
        </span>
        <div className="mb-[20px] flex min-h-[96px] items-start self-stretch rounded-sm bg-primary-10 px-[16px] py-[12px]">
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
            {goodQuestions[selectedDot]} {/* 선택된 질문 표시 */}
          </span>
        </div>
        <div className="flex items-center justify-center gap-[8px]">
          {goodQuestions.map((_, index) => (
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

export const NoGoodQuestion = () => {
  return (
    <div className="mb-[20px] flex h-full w-full flex-col items-start rounded-md border border-neutral-80 bg-static-100 px-[24px] py-[24px] pt-[20px]">
      <div className="flex w-full flex-col gap-[20px]">
        <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
          한번 더 보면 좋을 질문
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
