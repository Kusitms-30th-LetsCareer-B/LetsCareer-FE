import { useEffect, useState } from "react";
import {
  DocumentRecurringNoteLeftPart,
  DocumentRecurringNoteRightPart,
  NoSelfIntroduction,
  RecurringNoteHeader,
  RecurringNoteTab,
} from "./components/Helpers/RecurringNoteHelper";
import axios from "axios";
import { useParams } from "react-router-dom";

interface ReviewNote {
  id: number;
  satisfaction: string;
  wellDonePoints: string[];
  shortcomingPoints: string[];
  wellDoneMemo: string;
  shortcomingMemo: string;
}

interface SelfIntroduction {
    introduceId: number | null;
    question: string;
    answer: string;
    reactionType: string | null;
}
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function RecurringNotePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const [company, setCompany] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [documentData, setDocumentData] = useState<ReviewNote>({
    id: 0,
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
  });

  const [selfIntroductions, setSelfIntroductions] = useState<SelfIntroduction[] | null>(null);
  const [currentIntroduction, setCurrentIntroduction] = useState<SelfIntroduction | null>(null);
  const [isSelfIntroductionFetched, setIsSelfIntroductionFetched] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState("document");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const fetchSelfIntroductionData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/introduces?recruitmentId=${recruitmentId}`);
      const introductions = response.data.data;
      setSelfIntroductions(introductions.length > 0 ? introductions : null);
      if (introductions.length > 0) {
        setCurrentIntroduction(introductions[0]); 
        setIsSelfIntroductionFetched(true); 
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching self introduction data:", error);
      setLoading(false);
    }
  };

  const handleReactionSave = async (introduceId: number | null, reactionType: string) => {
    try {
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
    if (selfIntroductions && selfIntroductions[index]) {
      setCurrentIntroduction(selfIntroductions[index]); 
    }
  };

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
    const fetchRecurringNoteData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/reviews/recruitment?recruitmentId=${recruitmentId}`,
        );
        console.log("API Response:", response.data);
        setDocumentData(
          response.data.data.document || {
            id: 0,
            satisfaction: "",
            wellDonePoints: [],
            shortcomingPoints: [],
            wellDoneMemo: "",
            shortcomingMemo: "",
          },
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recurring note data", error);
        setLoading(false);
      }
    };
    if (recruitmentId) {
      fetchRecurringNoteData();
    }
  }, [recruitmentId]);

  const handleSave = async () => {
    const requestBody = {
      document: {
        id: documentData.id || null, // 복기 문서 ID (이미 존재하는 경우)
        recruitmentId: recruitmentId,
        satisfaction: documentData.satisfaction, // 만족도 정보
        wellDonePoints: documentData.wellDonePoints, // 잘한 점
        shortcomingPoints: documentData.shortcomingPoints, // 아쉬운 점
        wellDoneMemo: documentData.wellDoneMemo, // 잘한 점 설명
        shortcomingMemo: documentData.shortcomingMemo, // 개선할 점 설명
      },
      interview: {},
      etc: [],
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/reviews/save?recruitmentId=${recruitmentId}`,
        requestBody,
      );
      if (response.status === 200) {
        alert("저장이 완료되었습니다.");
      } else {
        alert("저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중 상태
  }

  return (
    <div className="mx-[48px] mb-[100px] mt-[40px] w-[1128px]">
      <RecurringNoteHeader company={company} task={task} />
      <div className="flex flex-col items-start gap-[20px]">
        <div className="mt-[40px] flex w-full flex-col items-start gap-[20px]">
            <RecurringNoteTab onTabChange={handleTabChange} onSave={handleSave} />
        </div>
        <div className="flex items-start gap-[20px]">
            <DocumentRecurringNoteLeftPart
            documentData={documentData}
            setDocumentData={setDocumentData}
            />
            {!isSelfIntroductionFetched ? (
            <NoSelfIntroduction onClick={fetchSelfIntroductionData} />
            ) : (
            <DocumentRecurringNoteRightPart
            question={currentIntroduction?.question || ""}
            answer={currentIntroduction?.answer || ""}
            goodQuestion="한 번 더 보면 좋을 질문"
            questions={selfIntroductions.map((intro) => intro.question)}
            reactionType={currentIntroduction?.reactionType || ""}
            onReactionSave={handleReactionSave}
            introduceId={currentIntroduction?.introduceId || null}
            onQuestionClick={handleQuestionClick}
            />
            )}
        </div>
      </div>
    </div>
  );
}

export default RecurringNotePage;
