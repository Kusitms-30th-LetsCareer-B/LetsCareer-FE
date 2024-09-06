import { useEffect, useState } from "react";
import {
  DocumentRecurringNoteLeftPart,
  DocumentRecurringNoteRightPart,
  EtcRecurringNotePart,
  InterviewRecurringNoteLeftPart,
  InterviewRecurringNoteRightPart,
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
  introduceId: number;
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
      introduceId: 0,
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
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);

  const [selfIntroductions, setSelfIntroductions] = useState<
    SelfIntroduction[]
  >([]); // 전체 자기소개 데이터

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

  const handleReactionSave = async (
    introduceId: number,
    reactionType: string,
  ) => {
    try {
      // API 호출을 통해 저장 로직
      await axios.put(`${BASE_URL}/introduces/${introduceId}/reaction`, {
        reactionType,
      });
      alert("반응이 저장되었습니다.");
    } catch (error) {
      console.error("Error saving reaction:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const handleQuestionClick = (index: number) => {
    const selectedIntroduction = selfIntroductions[index]; // 선택한 질문 데이터
    setSelfIntroductionData({
      introduceId: selectedIntroduction.introduceId,
      order: selectedIntroduction.order,
      question: selectedIntroduction.question,
      answer: selectedIntroduction.answer, // 선택한 질문에 대한 답변
      reactionType: selectedIntroduction.reactionType || null,
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
    const requestBody = {
      document: documentData,
      interview: interviewData,
      etc: [etcData],
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
      alert(
        response.status === 200
          ? "저장이 완료되었습니다."
          : "저장 중 오류가 발생했습니다.",
      );
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    }
  };

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
        <div className="flex w-full items-start gap-[20px]">
          {activeTab === "document" && (
            <>
              <DocumentRecurringNoteLeftPart
                documentData={documentData}
                setDocumentData={setDocumentData}
              />
              {selfIntroductionData.question ? (
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
              <InterviewRecurringNoteRightPart
                question={interviewAnswerData.question || ""}
                answer={interviewAnswerData.answer || ""}
                goodQuestion="한 번 더 보면 좋을 질문"
                reactionType={interviewAnswerData.reactionType || ""}
                introduceId={interviewAnswerData.introduceId || 0}
                questions={interviewQuestions}
                onQuestionClick={handleQuestionClick}
                onReactionSave={handleReactionSave}
              />
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
