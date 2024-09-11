import { useParams } from "react-router-dom";
import { useScrap } from "../../../shared/hooks/useScrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DdayScheduleEndChip } from "../../../components/chips/DdayChip";
import { DepartmentChip } from "../components/Chips/SelfIntroductionChip";
import { AnnouncementButton } from "../components/Buttons/DetailStatusButton";
import { InterviewDeleteButton } from "../components/Buttons/RecurringNoteButton";
import { SelfIntroductionQuestions } from "../components/Pagination/SelfIntroducePagination";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

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
      <div className="flex w-full flex-shrink-0 flex-col items-start gap-[16px] self-stretch">
        {/* 질문 텍스트박스 */}
        <div className="mt-[16px] flex w-full items-start justify-between rounded-sm px-[20px] py-[14px] bg-primary-10 border border-neutral-80 " >
          <textarea
            value={question}
            rows={1}
            placeholder="질문을 입력하세요"
            onChange={(e) => onQuestionChange(e.target.value)}
            className="bg-primary-10 flex w-full resize-none text-xsmall16 font-regular tracking-[-0.096px] text-neutral-20 placeholder:text-primary-70 focus:outline-none"
          />
        </div>
        {/* 답변 텍스트박스 */}
        <div className="flex mb-[16px] items-start self-stretch px-[20px] py-[14px] border border-neutral-80 rounded-sm">
          <textarea
            value={answer}
            placeholder="답변을 입력하세요"
            onChange={(e) => onAnswerChange(e.target.value)}
            className="text-xsmall16 font-regular min-h-[262px] w-full resize-none tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
          />
        </div>
      </div>
    );
  };

interface IntroductionData {
    introduceId: number;
    order: number;
    question: string;
    answer: string;
    type: string;
}


export const WriteSelfIntroduction = () => {
  const { scrap, scrapImage } = useScrap();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const [introductions, setIntroductions] = useState<IntroductionData[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1);

  const [company, setCompany] = useState<string>("");
  const [announcementUrl, setAnnouncementUrl] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [stages, setStages] = useState<string>("");
  const [endDate, setEndDate] = useState<number>(0);

  const [selectedQuestion, setSelectedQuestion] = useState(0); 
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); 

  const [loading, setLoading] = useState(true);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/recruitments/${recruitmentId}`,
        );
        const { companyName, task, announcementUrl, stages, daysUntilEnd } = response.data.data;
        setCompany(companyName);
        setTask(task);
        setAnnouncementUrl(announcementUrl);
        setEndDate(daysUntilEnd);
        setStages(stages[stages.length - 1].stageName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recruitment details:", error);
        setLoading(false);
      }
    };

    if (recruitmentId) {
      fetchRecruitmentDetails();
    }
  }, [recruitmentId, stages]);


  useEffect(() => {
    const fetchSelfIntroductionQuestions = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/introduces`, {
            params: { recruitmentId },
        });

        const data = response.data.data;

        if (data && data.length > 0) {
            setIntroductions(data); // 조회된 데이터를 상태로 설정
        } else {
            // 조회된 데이터가 없으면 빈 질문 하나 추가
            setIntroductions([
            { introduceId: null, question: "", answer: "", order: 1, type: null },
            ]);
        }
        } catch (error) {
        console.error("Error fetching interview questions", error);
        // 에러 발생 시에도 기본 질문 추가
        setIntroductions([
            { introduceId: null, question: "", answer: "", order: 1, type: null },
        ]);
        }
    };

    fetchSelfIntroductionQuestions();
}, [recruitmentId]);

const handleAddQuestion = () => {
    setIntroductions([
      ...introductions,
      { introduceId: null, question: "", answer: "", order: introductions.length + 1, type: null },
    ]);
  };

  const handleSaveQuestion = async (index: number) => {
    const questionToSave = introductions[index];

    try {
      if (questionToSave.introduceId === null) {
        // 새로운 질문을 등록하는 경우
        const response = await axios.put(`${BASE_URL}/introduces`, 
        [
          {
            order: questionToSave.order,
            question: questionToSave.question,
            answer: questionToSave.answer,
          }
        ], 
        {
          params: { recruitmentId }, // recruitmentId를 쿼리 파라미터로 전달
        });

        // 응답 데이터가 올바른지 확인하고 상태 업데이트
        const newQuestion = response.data?.data?.[0] || null;
        if (newQuestion) {
          const updatedQuestions = [...introductions];
          updatedQuestions[index] = { ...questionToSave, introduceId: newQuestion.introduceId };
          setIntroductions(updatedQuestions);
        } else {
          console.error("No data returned from the server");
        }
      } else {
        // 기존 질문을 수정하는 경우
        await axios.put(`${BASE_URL}/introduces`, 
        [
          {
            order: questionToSave.order,
            question: questionToSave.question,
            answer: questionToSave.answer,
          }
        ], 
        {
          params: { recruitmentId }, // recruitmentId를 쿼리 파라미터로 전달
        });
      }
    } catch (error) {
      console.error("Error saving question", error);
    }
  };

  const handleDeleteQuestion = () => {
    setShowDeleteConfirm(true); // 삭제 확인창 띄우기
  };

  const handleDeleteConfirm = async () => {
    try {
      const introduceIdToDelete = introductions[selectedQuestion]?.introduceId;

      if (introduceIdToDelete) {
        // API 호출을 통한 삭제 처리
        await axios.delete(`${BASE_URL}/introduces/${introduceIdToDelete}`, {
          params: { recruitmentId },
        });
        // 삭제 후 처리 (예: 질문 리스트 갱신)
        const updatedQuestions = introductions.filter(
          (_, i) => i !== selectedQuestion,
        );
        setIntroductions(updatedQuestions);
        setSelectedQuestion(0); // 첫 번째 질문 선택
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false); // 삭제 확인창 닫기
  };


  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...introductions];

    if (!updatedQuestions[index]) {
      updatedQuestions[index] = { introduceId: null, question: "", answer: "", order: index + 1, type: null };
    }

    updatedQuestions[index].question = value;
    setIntroductions(updatedQuestions); // 질문 업데이트
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedQuestions = [...introductions];

    if (!updatedQuestions[index]) {
      updatedQuestions[index] = { introduceId: null, question: "", answer: "", order: index + 1, type: null };
    }

    updatedQuestions[index].answer = value;
    setIntroductions(updatedQuestions); // 답변 업데이트
  };


  return (
    <div className="mb-[20px] flex w-[747px] flex-col items-end rounded-md border border-neutral-80 bg-static-100 p-[24px]">
      <div className="mb-[16px] flex h-[28px] items-start items-center justify-between self-stretch">
        <DdayScheduleEndChip schedule={stages} day={endDate} />
        <div className="h-[20px] w-[20px] cursor-pointer" onClick={scrapImage}>
          {scrap}
        </div>
      </div>
      <div className="flex flex-col self-stretch">
        <div className="mb-[24px]">
          <span className="mr-[10px] text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
            {company}
          </span>
          <DepartmentChip department={task} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span className="mr-[12px] text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
              문항
            </span>
            <SelfIntroductionQuestions
                questions={introductions.map((_, index) => `${index + 1}`)} // 질문 번호
                selectedQuestion={selectedQuestion} // 현재 선택된 질문
                onQuestionClick={(index) => setSelectedQuestion(index)} // 질문 클릭 시 처리
                onQuestionAdd={handleAddQuestion} // 질문 추가 버튼 처리
                totalItems={introductions.length} // 전체 질문 수
                itemsPerPage={1} // 페이지 당 질문 수 (한 페이지에 하나의 질문만 표시)
                initialPage={1} // 초기 페이지는 1
                onPageChange={(page) => setSelectedQuestion(page - 1)} // 페이지 변경 시 처리
            />
          </div>
          <div className="flex gap-[12px]">
            <button
              onClick={handleDeleteQuestion}
              className="flex w-[110px] h-[38px] items-center justify-center gap-[10px] rounded-sm border border-neutral-80 px-[20px] py-[6px]"
            >
              <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                질문 삭제
              </span>
            </button>
            <AnnouncementButton
              onClick={() => {
                if (announcementUrl) {
                  window.location.href = announcementUrl;
                } else {
                  alert("공고 URL이 없습니다.");
                }
              }}
              text="공고 이동"
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

        <QuestionComponent
          question={introductions[selectedQuestion]?.question || ""}
          answer={introductions[selectedQuestion]?.answer || ""}
          onQuestionChange={(value) => handleQuestionChange(selectedQuestion, value)}
          onAnswerChange={(value) => handleAnswerChange(selectedQuestion, value)}
        />
      </div>
      <div className="flex justify-end">
        <button 
            onClick={() => handleSaveQuestion(selectedQuestion)}
            className="flex h-[36px] w-[130px] items-center justify-center rounded-sm bg-primary px-[32px] py-[6px]"
        >
            <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
                저장하기
            </div>
        </button>
      </div>
    </div>
  );
};