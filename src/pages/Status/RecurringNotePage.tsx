import { useEffect, useState } from "react";
import {
  AgainQuestion,
  DocumentRecurringNoteLeftPart,
  DocumentRecurringNoteRightPart,
  EtcRecurringNotePart,
  InterviewRecurringNoteLeftPart,
  InterviewRecurringNoteRightPart,
  NoGoodQuestion,
  NoSelfIntroduction,
  RecurringNoteHeader,
  RecurringNoteTab,
} from "./components/Helpers/RecurringNoteHelper";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ReviewNote {
  id: number;
  reviewName: string;
  satisfaction: string;
  wellDonePoints: string[];
  shortcomingPoints: string[];
  wellDoneMemo: string;
  shortcomingMemo: string;
  difficulty: string;
}

interface SelfIntroduction {
  introduceId: number;
  order: number;
  question: string;
  answer: string;
  reactionType: string | null;
}

interface InterviewAnswer {
  interviewId: number;
  order: number;
  question: string;
  answer: string;
  reactionType: string | null;
}

function RecurringNotePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const [company, setCompany] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const initialReviewNote: ReviewNote = {
    id: 0,
    reviewName: "",
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
    difficulty: "",
  };

  const [selfIntroductionData, setSelfIntroductionData] =
    useState<SelfIntroduction>({
      introduceId: 0,
      order: 0,
      question: "",
      answer: "",
      reactionType: null,
    });

  const [interviewAnswerData, setInterviewAnswerData] =
    useState<InterviewAnswer>({
      interviewId: 0,
      order: 0,
      question: "",
      answer: "",
      reactionType: null,
    });

  const [documentData, setDocumentData] =
    useState<ReviewNote>(initialReviewNote);
  const [interviewData, setInterviewData] =
    useState<ReviewNote>(initialReviewNote);
  const [etcData, setEtcData] = useState<ReviewNote>(initialReviewNote);

  const [activeTab, setActiveTab] = useState("document");

  const [documentQuestions, setDocumentQuestions] = useState<string[]>([]);
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewAnswer[]
  >([]);
  const [selectedOrder, setSelectedOrder] = useState<number>(1);

  const [selfIntroductions, setSelfIntroductions] = useState<
    SelfIntroduction[]
  >([]); // 전체 자기소개 데이터
  const [interviewAnswers, setInterviewAnswers] = useState<InterviewAnswer[]>(
    [],
  ); // 면접 질문과 답변 데이터

  const [goodQuestions, setGoodQuestions] = useState<string[]>([]); // 질문 리스트 상태

  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/recruitments/${recruitmentId}`,
        );
        const { companyName, task } = response.data.data;
        setCompany(companyName);
        setTask(task);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recruitment details:", error);
        setLoading(false);
      }
    };

    if (recruitmentId) {
      fetchRecruitmentDetails();
    }
  }, [recruitmentId]);

  useEffect(() => {
    const fetchSelfIntroductions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/introduces?recruitmentId=${recruitmentId}`,
        );
        const data = response.data.data;

        const questions = data.map((intro: any) => intro.question);
        setDocumentQuestions(questions);

        setSelfIntroductions(data);

        // 기본 질문 및 답변 설정
        if (data.length > 0) {
          const firstIntroduction = data[0];
          setSelfIntroductionData({
            introduceId: firstIntroduction.introduceId,
            order: firstIntroduction.order,
            question: firstIntroduction.question,
            answer: firstIntroduction.answer,
            reactionType: firstIntroduction.type || null,
          });
        }
      } catch (error) {
        console.error("Error fetching self introductions", error);
      }
    };

    fetchSelfIntroductions();
  }, [recruitmentId]);

  // 면접 질문과 답변을 받아오는 API 호출
  useEffect(() => {
    const fetchInterviewAnswers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/interviews?recruitmentId=${recruitmentId}`,
        );
        const data = response.data.data;
        setInterviewQuestions(data);

        // 첫 번째 질문을 기본값으로 설정
        if (data.length > 0) {
          const firstInterview = data[0];
          setInterviewAnswerData(firstInterview);
        }
      } catch (error) {
        console.error("Error fetching interview answers", error);
      }
    };

    fetchInterviewAnswers();
  }, [recruitmentId]);

  // 리액션 저장
  const handleReactionSave = async (id: number, reactionType: string) => {
    try {
      if (activeTab === "document") {
        await axios.patch(`${BASE_URL}/introduces/${id}/reaction`, {
          reaction: reactionType,
        });
        setSelfIntroductionData((prevData) => ({
            ...prevData,
            reactionType: reactionType,
          }));
    } else if (activeTab === "interview") {
        await axios.patch(`${BASE_URL}/interviews/${id}/reaction`, {
          reaction: reactionType,
        });

        setInterviewAnswerData((prevData) => ({
            ...prevData,
            reactionType: reactionType,
          }));
        }

    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };


  const handleQuestionClick = (index: number) => {
    const selectedIntroduction = selfIntroductions[index];

    // 선택된 질문이 있는지 확인
    if (!selectedIntroduction) {
      console.error("선택된 질문이 없습니다.");
      return;
    }

    setSelfIntroductionData({
      introduceId: selectedIntroduction.introduceId,
      order: selectedIntroduction.order,
      question: selectedIntroduction.question,
      answer: selectedIntroduction.answer,
      reactionType: selectedIntroduction.reactionType || null,
    });
  };

  const handleInterviewQuestionClick = (index: number) => {
    const selectedInterview = interviewAnswers[index];

    if (!selectedInterview) {
      console.error("선택된 면접 질문이 없습니다.");
      return; // 질문이 없으면 함수 실행을 멈춤
    }

    setInterviewAnswerData({
      interviewId: selectedInterview.interviewId,
      order: selectedInterview.order,
      question: selectedInterview.question,
      answer: selectedInterview.answer,
      reactionType: selectedInterview.reactionType || null,
    });
  };

  const fetchDataForTab = async (tab: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/reviews/recruitment?recruitmentId=${recruitmentId}`,
      );
      const data = response.data.data;

      if (tab === "document") {
        setDocumentData(data.document);
      } else if (tab === "interview") {
        setInterviewData(data.interview);
      } else if (tab === "etc") {
        setEtcData(data.etc[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [activeTab]);

  const handleSave = async () => {
    if (activeTab === "document") {
      await handleDocumentSave();
    } else if (activeTab === "interview") {
      await handleInterviewSave();
    } else if (activeTab === "etc") {
      await handleEtcSave();
    }
  };

  const handleDocumentSave = async () => {
    try {
      const requestBody = {
        document: documentData,
        interview: {},
        etc: [],
      };
      const response = await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
      alert(response.status === 200 ? "서류 저장 완료" : "저장 중 오류 발생");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // interview 저장 로직
  const handleInterviewSave = async () => {
    try {
      const requestBody = {
        document: {},
        interview: interviewData,
        etc: [],
      };
      const response = await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
      alert(response.status === 200 ? "면접 저장 완료" : "저장 중 오류 발생");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // etc 저장 로직
  const handleEtcSave = async () => {
    try {
      const requestBody = {
        document: {},
        interview: {},
        etc: [etcData],
      };
      const response = await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 새로운 useEffect로 interviewQuestions가 업데이트될 때 selectedOrder로 선택된 질문 반영
  useEffect(() => {
    if (interviewQuestions.length > 0) {
      const selectedQuestion = interviewQuestions.find(
        (q) => q.order === selectedOrder,
      );
      if (selectedQuestion) {
        setInterviewAnswerData(selectedQuestion);
      }
    }
  }, [interviewQuestions, selectedOrder]);

  // 면접 질문 리스트 가져오기
  useEffect(() => {
    const fetchInterviewAnswers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/interviews?recruitmentId=${recruitmentId}`,
        );
        const data = response.data.data;
        setInterviewQuestions(data);

        // 첫 번째 질문을 기본값으로 설정
        if (data.length > 0) {
          setInterviewAnswerData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching interview answers", error);
      }
    };
    fetchInterviewAnswers();
  }, [recruitmentId]);

  // 질문 번호 선택 시 선택된 질문으로 상태 업데이트
  const handleQuestionSelect = (order: number) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    const fetchGoodQuestions = async (endpoint: string) => {
      try {
        const response = await axios.get(
          `${BASE_URL}${endpoint}?recruitmentId=${recruitmentId}`,
        );
        const questionData = response.data.data;
        if (questionData.length > 0) {
          setGoodQuestions(questionData.map((q: any) => q.question)); // 질문 리스트 저장
        }
      } catch (error) {
        console.error("Error fetching good questions:", error);
        setGoodQuestions([]);
      }
    };

    if (activeTab === "document") {
      fetchGoodQuestions("/introduces/additional");
    } else if (activeTab === "interview") {
      fetchGoodQuestions("/interviews/additional");
    }
  }, [activeTab]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-[48px] mb-[100px] mt-[40px] w-[1128px]">
      <RecurringNoteHeader company={company} task={task} />
      <div className="flex flex-col items-start gap-[20px]">
        <div className="mt-[40px] flex w-full flex-col items-start gap-[20px]">
          <RecurringNoteTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSave={handleSave}
          />
        </div>
        <div className="flex w-1/2 w-full items-start gap-[20px]">
          {activeTab === "document" && (
            <>
              <DocumentRecurringNoteLeftPart
                documentData={documentData}
                setDocumentData={setDocumentData}
              />
              {selfIntroductionData.question ? (
                <div className="flex w-1/2 flex-col items-start">
                  <DocumentRecurringNoteRightPart
                    question={selfIntroductionData.question || ""}
                    answer={selfIntroductionData.answer || ""}
                    goodQuestion="한 번 더 보면 좋을 질문"
                    reactionType={selfIntroductionData.reactionType || ""}
                    introduceId={selfIntroductionData.introduceId || 0}
                    questions={documentQuestions}
                    onQuestionClick={handleQuestionClick}
                    onReactionSave={handleReactionSave}
                  />
                  {goodQuestions.length > 0 ? (
                    <AgainQuestion goodQuestions={goodQuestions} />
                  ) : (
                    <NoGoodQuestion />
                  )}
                </div>
              ) : (
                <NoSelfIntroduction
                  onClick={() => {
                    console.log("NoSelfIntroduction clicked");
                  }}
                />
              )}
            </>
          )}

          {activeTab === "interview" && (
            <>
              <InterviewRecurringNoteLeftPart
                interviewData={interviewData}
                setInterviewData={setInterviewData}
              />
              <div className="flex h-full w-1/2 flex-col items-start gap-[20px]">
                <InterviewRecurringNoteRightPart
                  question={interviewAnswerData.question || ""}
                  answer={interviewAnswerData.answer || ""}
                  reactionType={interviewAnswerData.reactionType || ""}
                  interviewId={interviewAnswerData.interviewId || 0}
                  questions={interviewQuestions.map((q) => ({
                    question: q.question,
                    answer: q.answer,   // 'answer'를 포함하여 매핑
                    interviewId: q.interviewId,  // 'interviewId'를 포함하여 매핑
                  }))}
                  onQuestionClick={(index) => handleQuestionSelect(index + 1)} // 질문 선택 처리
                  onReactionSave={handleReactionSave}
                />
                {goodQuestions.length > 0 ? (
                  <AgainQuestion goodQuestions={goodQuestions} />
                ) : (
                  <NoGoodQuestion />
                )}
              </div>
            </>
          )}

          {activeTab === "etc" && (
            <EtcRecurringNotePart etcData={etcData} setEtcData={setEtcData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RecurringNotePage;
