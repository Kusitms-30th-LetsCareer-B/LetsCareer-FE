import { useEffect, useState } from "react";
import {
  DocumentRecurringNoteLeftPart,
  DocumentRecurringNoteRightPart,
  EtcRecurringNotePart,
  InterviewRecurringNoteLeftPart,
  InterviewRecurringNoteRightPart,
  InterviewsAgainQuestion,
  IntroductionsAgainQuestion,
  NoGoodQuestion,
  NoSelfIntroduction,
  RecurringNoteHeader,
  RecurringNoteTab,
} from "./components/Helpers/RecurringNoteHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
  type: string | null;
}

interface InterviewAnswer {
  interviewId: number;
  order: number;
  question: string;
  answer: string;
  type: string | null;
}

function RecurringNotePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
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
      type: null,
    });

  const [interviewAnswerData, setInterviewAnswerData] =
    useState<InterviewAnswer>({
      interviewId: 0,
      order: 0,
      question: "",
      answer: "",
      type: null,
    });

  const [documentData, setDocumentData] =
    useState<ReviewNote>(initialReviewNote);
  const [interviewData, setInterviewData] =
    useState<ReviewNote>(initialReviewNote);
  const [etcData, setEtcData] = useState<ReviewNote[]>([]);
  const [newEtcData, setNewEtcData] = useState<ReviewNote | null>(null);
  const [activeTab, setActiveTab] = useState("document");

  const [documentQuestions, setDocumentQuestions] = useState<string[]>([]);
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewAnswer[]
  >([]);
  const [selectedOrder, setSelectedOrder] = useState<number>(1);

  const [selfIntroductions, setSelfIntroductions] = useState<
    SelfIntroduction[]
  >([]);
  const [interviews, setInterviews] = useState<InterviewAnswer[]>([]); // interviews 상태 추가
  const [activeEtcId, setActiveEtcId] = useState<number | null>(null); // 현재 활성화된 기타 항목 ID
  const [introductionsGoodQuestions, setIntroductionsGoodQuestions] = useState<string[]>([]); 
  const [interviewsGoodQuestions, setInterviewsGoodQuestions] = useState<string[]>([]); 


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/reviews/recruitment?recruitmentId=${recruitmentId}`,
        );
        const { document, interview, etc } =
          response.data.data || {};

        setDocumentData(document || {});
        setInterviewData(interview || {});
        setEtcData(etc || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [recruitmentId]);

  // 기업 정보 가져오기 - 기본 값 설정
  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/recruitments/${recruitmentId}`,
        );
        const { companyName = "", task = "" } = response.data.data || {};
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

  // 자기소개서 정보 가져오기 - 기본 값 설정
  useEffect(() => {
    const fetchSelfIntroductions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/introduces?recruitmentId=${recruitmentId}`,
        );
        const data = response.data.data || [];

        const questions = data.map((intro: any) => intro.question);
        setDocumentQuestions(questions);

        // 기본 질문 및 답변 설정
        if (data.length > 0) {
          setSelfIntroductionData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching self introductions", error);
      }
    };

    fetchSelfIntroductions();
  }, [recruitmentId]);

  // 면접 질문과 답변을 받아오는 API 호출 - 기본 값 설정
  useEffect(() => {
    const fetchInterviewAnswers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/interviews?recruitmentId=${recruitmentId}`,
        );
        const data = response.data.data || [];
        setInterviewQuestions(data);
        setInterviews(data);

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

  const handleQuestionClick = (index: number) => {
    const selectedIntroduction = selfIntroductions[index];

    setSelfIntroductionData({
      introduceId: selectedIntroduction.introduceId,
      order: selectedIntroduction.order,
      question: selectedIntroduction.question,
      answer: selectedIntroduction.answer,
      type: selectedIntroduction.type || null,
    });
  };

  // 저장 버튼 클릭 시 새로운 기타 항목 저장 로직 추가
  const handleSave = async () => {

    const missingEtcReviewName = etcData.some((etc) => !etc.reviewName);
    if (missingEtcReviewName) {
      alert("전형명을 입력해주세요");
      return; 
    }

    if (newEtcData && !newEtcData.reviewName) {
      alert("전형명을 입력해주세요");
      return; 
    }

    try {
      const updatedEtcData = newEtcData
      ? [...etcData, { ...newEtcData, id: etcData.length + 1 }]
      : etcData;

      const requestBody = {
        document: documentData,
        interview: interviewData,
        etc: etcData,
      };
      await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
      alert("저장 완료");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 기존 기타 자료를 클릭했을 때의 동작
  const handleEtcClick = (id: number) => {
    const selectedEtc = etcData.find((data) => data.id === id);
    if (selectedEtc) {
      setNewEtcData(null); // 새 입력 템플릿 해제
      setActiveEtcId(id);
    }
  };

  // 새로운 기타 항목 작성
  const handleNewEtcClick = () => {
    setNewEtcData(initialReviewNote); // 새 항목을 추가하기 위한 템플릿 설정
    setActiveEtcId(null); // 기존 항목 비활성화
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


  // 질문 번호 선택 시 선택된 질문으로 상태 업데이트
  const handleQuestionSelect = (order: number) => {
    setSelectedOrder(order);
  };

  const handleIntroductionsReactionSave = (introduceId: number, newReactionType: "잘했어요" | "아쉬워요" | null) => {
    setSelfIntroductions(prevIntroductions =>
      prevIntroductions.map(intro =>
        intro.introduceId === introduceId
          ? { ...intro, reactionType: newReactionType }
          : intro
      )
    );

    if (newReactionType === "아쉬워요") {
      // '아쉬워요'가 선택된 경우 질문을 추가
      const questionToAdd = selfIntroductions.find(intro => intro.introduceId === introduceId)?.question;
      if (questionToAdd && !introductionsGoodQuestions.includes(questionToAdd)) {
        setIntroductionsGoodQuestions(prev => [...prev, questionToAdd]);
      }
    } else {
      // '잘했어요'가 선택된 경우 질문을 제거
      setIntroductionsGoodQuestions(prev => prev.filter(question => question !== selfIntroductionData.question));
    }
  };

  const handleInterviewReactionSave = (interviewId: number, newReactionType: "잘했어요" | "아쉬워요" | null) => {
    setInterviews((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.interviewId === interviewId
          ? { ...interview, reactionType: newReactionType }
          : interview
      )
    );

    if (newReactionType === "아쉬워요") {
      const questionToAdd = interviews.find((interview) => interview.interviewId === interviewId)?.question;
      if (questionToAdd && !interviewsGoodQuestions.includes(questionToAdd)) {
        setInterviewsGoodQuestions((prev) => [...prev, questionToAdd]);
      }
    } else {
      setInterviewsGoodQuestions((prev) =>
        prev.filter((question) => question !== interviews.find((interview) => interview.interviewId === interviewId)?.question)
      );
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
            etcData={etcData} // Etc 탭일 때만 reviewName 버튼이 보이도록 조건 추가
            setActiveTabById={handleEtcClick} // 기타 탭 클릭 시 처리
            handleNewEtcClick={handleNewEtcClick} // 새로운 기타 항목 클릭시 템플릿 로드
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
                    introduceId={selfIntroductionData.introduceId || 0}
                    reactionType={selfIntroductionData.type || ""}
                    questions={documentQuestions}
                    onQuestionClick={handleQuestionClick}
                    onReactionSave={handleIntroductionsReactionSave}
                    />
                    <IntroductionsAgainQuestion recruitmentId={recruitmentId} />
                </div>
              ) : (
                <div className="flex w-1/2 flex-col">
                  <NoSelfIntroduction
                   onClick={() => {
                    navigate(`/status/${recruitmentId}/self-introduce`);
                  }}
                  />
                  <NoGoodQuestion />
                </div>
              )}
            </>
          )}

          {activeTab === "interview" && (
            <>
              <InterviewRecurringNoteLeftPart
                interviewData={interviewData || initialReviewNote} // undefined 방지
                setInterviewData={setInterviewData}
              />
              <div className="flex h-full w-1/2 flex-col items-start gap-[20px]">
                <InterviewRecurringNoteRightPart
                  question={interviewAnswerData.question || ""}
                  answer={interviewAnswerData.answer || ""}
                  interviewId={interviewAnswerData.interviewId || 0}
                  reactionType={interviewAnswerData.type || ""}
                  questions={interviewQuestions}
                  onQuestionClick={(index) => handleQuestionSelect(index + 1)} // 질문 선택 처리
                  onReactionSave={handleInterviewReactionSave}
                />
                <InterviewsAgainQuestion recruitmentId={recruitmentId} />
              </div>
            </>
          )}
          {activeTab === "etc" && (
            <>
              {/* 기존 기타 항목을 조회할 때 */}
              {activeEtcId && !newEtcData && (
                <EtcRecurringNotePart
                  etcData={
                    etcData.find(
                      (data) => data.id === activeEtcId,
                    ) as ReviewNote
                  }
                  setEtcData={(updatedEtcNote) => {
                    const updatedEtc = etcData.map((data) =>
                      data.id === activeEtcId ? updatedEtcNote : data,
                    );
                    setEtcData(updatedEtc);
                  }}
                />
              )}

              {/* 새로운 기타 항목을 입력할 때 */}
              {newEtcData && (
                <EtcRecurringNotePart
                  etcData={newEtcData}
                  setEtcData={setNewEtcData}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecurringNotePage;
