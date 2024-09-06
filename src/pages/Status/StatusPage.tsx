import { useEffect, useState } from "react";
import { useStatusPagination } from "../../shared/hooks/useStatusPagination";
import { UserStatusChip } from "./components/Chips/StatusChip";
import { WelcomeMessage } from "./components/Helpers/StatusHelper";
import {
  ApplyStatus,
  ConsequenceFailedStatus,
  ConsequenceSuccessStatus,
} from "./components/Layout/StatusLayout";
import StatusPagination from "./components/Pagination/StatusPagination";
import {
  RecruitmentDeleteButton,
  StatusDeleteButton,
  StatusDropdown,
} from "./components/Buttons/StatusButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStatusTab } from "../../shared/hooks/useStatusTab";
import { StatusTab } from "./components/Tabs/StatusTab";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface Recruitment {
  recruitmentId: number;
  companyName: string;
  task: string;
  status: string;
  stageName: string;
  isFavorite: boolean;
  endDate: string;
  daysUntilEnd: number;
}

function StatusPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  // const { userId } = useParams<{ userId: string }>(); URL에서 userId 받아오기
  const itemsPerPage = 6;
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    progress: 0,
    passed: 0,
    failed: 0,
  });

  const { activeTab, tabClick } = useStatusTab();

  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [selectedStage, setSelectedStage] = useState("전체");

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<Recruitment | null>(null);

  const filteredRecruitments = recruitments.filter((recruitment) => {
    if (selectedStage === "전체") return true;
    if (selectedStage === "서류") return recruitment.stageName === "서류";
    if (selectedStage === "면접") return recruitment.stageName === "면접";
    return recruitment.stageName !== "서류" && recruitment.stageName !== "면접";
  });

  const fetchRecruitments = async (type: "progress" | "consequence") => {
    try {
      const response = await axios.get(
        `${BASE_URL}/recruitments/status?type=${type}&userId=1`,
      );
      setRecruitments(response.data.data.recruitments);
    } catch (error) {
      console.error("Error fetching recruitments", error);
    }
  };

  useEffect(() => {
    const type = activeTab === "prepare" ? "progress" : "consequence";
    fetchRecruitments(type);
  }, [activeTab]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/statuses?userId=1`);
        const { total, progress, passed, failed } = response.data.data;
        setStatusCounts({ total, progress, passed, failed });
      } catch (error) {
        console.error("Error fetching status counts", error);
      }
    };

    fetchStatusCounts();
  }, [recruitments]);

  const handleDeleteClick = (recruitment: Recruitment) => {
    setSelectedRecruitment(recruitment);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRecruitment) {
      try {
        await axios.delete(`${BASE_URL}/recruitments`, {
          params: {
            recruitmentId: selectedRecruitment.recruitmentId,
          },
        });
        setRecruitments(
          recruitments.filter(
            (rec) => rec.recruitmentId !== selectedRecruitment.recruitmentId,
          ),
        );
        setIsDeletePopupOpen(false);
      } catch (error) {
        console.error("Error deleting recruitment", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false);
  };

  return (
    <div className="flex flex-col p-[48px]">
      <div className="inline-flex items-center justify-between gap-[186px]">
        <WelcomeMessage name="오민지" />
        <div className="flex gap-[12px]">
          <UserStatusChip classification="전체" num={statusCounts.total} />
          <UserStatusChip
            classification="진행 중"
            num={statusCounts.progress}
          />
          <UserStatusChip classification="합격" num={statusCounts.passed} />
          <UserStatusChip classification="불합격" num={statusCounts.failed} />
        </div>
      </div>
      <div className="mb-[4px] mt-[32px] flex items-center justify-between">
        <div className="flex flex-shrink-0 items-center">
          <StatusTab
            name="준비 현황"
            isActive={activeTab === "prepare"}
            onClick={() => tabClick("prepare")}
          />
          <StatusTab
            name="지원 결과"
            isActive={activeTab === "result"}
            onClick={() => tabClick("result")}
          />
        </div>
        <div className="flex flex-shrink-0 items-center bg-static-100">
          <StatusDropdown setSelectedStage={setSelectedStage} />
          <StatusDeleteButton
            toggleDeleteMode={() => setDeleteMode(!deleteMode)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px]">
        {filteredRecruitments
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((recruitment: Recruitment) => {
            let StatusComponent;

            // status에 따른 컴포넌트 분기 처리
            switch (recruitment.status) {
              case "PROGRESS":
                StatusComponent = (
                  <ApplyStatus
                    company={recruitment.companyName}
                    day={recruitment.daysUntilEnd}
                    department={recruitment.task}
                    stageName={recruitment.stageName}
                    endDate={recruitment.endDate}
                    deleteMode={deleteMode}
                    onDelete={() => handleDeleteClick(recruitment)}
                    onClick={() =>
                      navigate(`/status/${recruitment.recruitmentId}`)
                    }
                  />
                );
                break;
              case "PASSED":
                StatusComponent = (
                  <ConsequenceSuccessStatus
                    company={recruitment.companyName}
                    department={recruitment.task}
                    deleteMode={deleteMode}
                    recruitmentId={recruitment.recruitmentId}
                    onDelete={() => handleDeleteClick(recruitment)}
                    onClick={() =>
                      navigate(`/status/${recruitment.recruitmentId}`)
                    }
                  />
                );
                break;
              case "FAILED":
                StatusComponent = (
                  <ConsequenceFailedStatus
                    company={recruitment.companyName}
                    department={recruitment.task}
                    stageName={recruitment.stageName}
                    deleteMode={deleteMode}
                    recruitmentId={recruitment.recruitmentId}
                    onDelete={() => handleDeleteClick(recruitment)}
                    onClick={() =>
                      navigate(`/status/${recruitment.recruitmentId}`)
                    }
                  />
                );
                break;
              default:
                StatusComponent = null;
            }

            return (
              <div key={recruitment.recruitmentId} className="relative">
                {StatusComponent}
              </div>
            );
          })}
      </div>
      {/* 삭제 팝업 */}
      {isDeletePopupOpen && selectedRecruitment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <RecruitmentDeleteButton
            companyName={selectedRecruitment.companyName}
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        </div>
      )}

      <div className="mt-4 flex justify-center">
        {/* <StatusPagination
          totalItems={recruitments.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
      </div>
    </div>
  );
}

export default StatusPage;
