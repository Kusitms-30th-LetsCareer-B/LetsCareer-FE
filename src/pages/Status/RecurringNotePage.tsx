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
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // 현재 선택된 질문의 인덱스
  const [interviewAnswers, setInterviewAnswers] = useState<InterviewAnswer[]>(
    [],
  );
  const [activeEtcId, setActiveEtcId] = useState<number | null>(null); // 현재 활성화된 기타 항목 ID
  const [isNewEtcOpen, setIsNewEtcOpen] = useState<boolean>(false); // 새로운 기타 항목 열림 여부
  const [inputReviewName, setInputReviewName] = useState(""); // 전형명 입력을 저장할 상태
  const [shouldSaveEtc, setShouldSaveEtc] = useState(false); // 새 항목 생성 여부

  const [goodQuestions, setGoodQuestions] = useState<string[]>([]); // 한번 더 보면 좋을 질문들

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/reviews/recruitment?recruitmentId=${recruitmentId}`,
        );
        const { document, interview, etc, companyName, task } =
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
        setSelfIntroductions(data); // 질문 배열을 설정

        // 기본 질문 및 답변 설정
        if (data.length > 0) {
          const firstIntroduction = data[0];
          setSelfIntroductionData({
            introduceId: firstIntroduction.introduceId,
            order: firstIntroduction.order,
            question: firstIntroduction.question,
            answer: firstIntroduction.answer,
            type: firstIntroduction.reactionType || null, // 초기 reactionType 설정
          });
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

  const handleReactionSave = async (introduceId: number, type: string) => {
    try {
      await axios.patch(`${BASE_URL}/introduces/${introduceId}/reaction`, {
        reaction: type,
      });

      setSelfIntroductions((prevIntroductions) =>
        prevIntroductions.map((intro, index) =>
          index === selectedQuestionIndex
            ? { ...intro, type } // 선택된 질문의 reactionType만 업데이트
            : intro,
        ),
      );
      if (type === "아쉬워요") {
        // '아쉬워요'가 선택된 경우, 중복된 질문이 없을 때만 추가
        if (!goodQuestions.includes(selfIntroductionData.question)) {
          setGoodQuestions((prevQuestions) => [
            ...prevQuestions,
            selfIntroductionData.question,
          ]);
        }
      } else if (type === "잘했어요") {
        // '잘했어요'가 선택된 경우, 해당 질문을 "한 번 더 보면 좋을 질문" 리스트에서 제거
        setGoodQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q !== selfIntroductionData.question),
        );
      }
    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };

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
      type: selectedInterview.type || null,
    });
  };

  const [newEtcNote, setNewEtcNote] = useState<ReviewNote>({
    id: etcData.length + 1,
    reviewName: "",
    satisfaction: "",
    difficulty: "",
    wellDoneMemo: "",
    shortcomingMemo: "",
    wellDonePoints: [],
    shortcomingPoints: [],
  });

  const [selectedEtcId, setSelectedEtcId] = useState<number | null>(null); // 선택된 기타 항목 ID

  // 저장 버튼 클릭 시 새로운 기타 항목 저장 로직 추가
  const handleSave = async () => {
    if (newEtcData) {
      const updatedEtcData = [
        ...etcData,
        { ...newEtcData, id: etcData.length + 1 },
      ];
      setEtcData(updatedEtcData); // 새로 추가된 기타 데이터 저장
      setNewEtcData(null); // 템플릿 초기화
      setActiveEtcId(updatedEtcData.length); // 새 항목 선택
    }

    // 추가적인 API 호출로 저장
    try {
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

  // 기존 기타 자료 탭 클릭 시 데이터 조회
  const handleEtcTabClick = (id: number) => {
    const selectedEtc = etcData.find((etc) => etc.id === id);
    if (selectedEtc) {
      setNewEtcNote(selectedEtc); // 선택된 항목의 데이터를 조회하여 입력 폼에 반영
      setSelectedEtcId(id); // 선택된 ID 설정
    }
  };

  const handleEtcInputChange = (field: string, value: string) => {
    setNewEtcNote((prev) => ({ ...prev, [field]: value }));
  };

  // 기타 탭 클릭 시 새로운 항목 작성
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "etc") {
      // 기타 탭을 눌렀을 때 새로운 항목을 작성할 수 있게 함
      setIsNewEtcOpen(true); // 새로운 항목 열림 상태
      setActiveEtcId(null); // 기존 항목에서 벗어나도록
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

  const handleAddNewEtc = () => {
    const newEtc = {
      id: etcData.length + 1,
      reviewName: "",
      satisfaction: "",
      difficulty: "",
      wellDoneMemo: "",
      shortcomingMemo: "",
      wellDonePoints: [], // 빈 배열로 초기화
      shortcomingPoints: [], // 빈 배열로 초기화
    };

    setEtcData([...etcData, newEtc]);
    setActiveEtcId(newEtc.id);
  };

  const handleEtcDataChange = (index: number, updatedEtc: ReviewNote) => {
    const updatedEtcData = [...etcData];
    updatedEtcData[index] = updatedEtc;
    setEtcData(updatedEtcData);
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
                    reactionType={selfIntroductionData.type || ""}
                    introduceId={selfIntroductionData.introduceId || 0}
                    questions={documentQuestions}
                    onQuestionClick={handleQuestionClick}
                    onReactionSave={handleReactionSave}
                  />
                  {goodQuestions.length > 0 ? (
                    <AgainQuestion badQuestions={goodQuestions} />
                  ) : (
                    <NoGoodQuestion />
                  )}
                </div>
              ) : (
                <div className="flex w-1/2 flex-col">
                  <NoSelfIntroduction
                    onClick={() => {
                      console.log("NoSelfIntroduction clicked");
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
                  reactionType={interviewAnswerData.type || ""}
                  interviewId={interviewAnswerData.interviewId || 0}
                  questions={interviewQuestions.map((q) => ({
                    interviewId: q.interviewId ?? null,
                    question: q.question,
                    answer: q.answer,
                    order: q.order, // 추가된 order 필드
                    type: q.type, // 추가된 type 필드
                  }))}
                  onQuestionClick={(index) => handleQuestionSelect(index + 1)} // 질문 선택 처리
                  onReactionSave={handleReactionSave}
                />
                {goodQuestions.length > 0 ? (
                  <AgainQuestion badQuestions={goodQuestions} />
                ) : (
                  <NoGoodQuestion />
                )}
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
