import { useEffect, useState } from "react";
import {
  DocumentRecurringNoteLeftPart,
  DocumentRecurringNoteRightPart,
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

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function RecurringNotePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { recruitmentId } = useParams<{ recruitmentId: string }>(); // URL에서 recruitmentId를 받아옴

  const [company, setCompany] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const question =
    "지원자가 생각하는 이 회사만의 경쟁력이 무엇이고, 향후 3년 간 사업 방향성은 어떻게 될 것 같나요?";
  const answer = "잠이 오니";
  const goodQuestion = "제가 잘하고 잇는걸까요..?";

  const questions = [
    "자기소개서 문항 1",
    "자기소개서 문항 2",
    "자기소개서 문항 3",
    "자기소개서 문항 4",
    "자기소개서 문항 5",
  ];

  const [documentData, setDocumentData] = useState<ReviewNote>({
    id: 0,
    satisfaction: "",
    wellDonePoints: [],
    shortcomingPoints: [],
    wellDoneMemo: "",
    shortcomingMemo: "",
  });

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
      fetchRecruitmentDetails(); // recruitmentId가 있을 때만 데이터 fetch
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
      fetchRecurringNoteData(); // recruitmentId가 있을 때만 데이터 fetch
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
      <div className="mb-[20px] mt-[40px] flex w-full flex-col items-start gap-[20px]">
        <RecurringNoteTab onSave={handleSave} />
      </div>
      <div className="flex items-start gap-[20px]">
        <DocumentRecurringNoteLeftPart
          documentData={documentData}
          setDocumentData={setDocumentData}
        />

        <DocumentRecurringNoteRightPart
          question={question}
          answer={answer}
          goodQuestion={goodQuestion}
          questions={questions}
        />
      </div>
    </div>
  );
}

export default RecurringNotePage;
