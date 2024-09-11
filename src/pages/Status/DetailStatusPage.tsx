import { useEffect, useState } from "react";
import { GoBackButton } from "../../components/Buttons/Button";
import {
  AddCard,
  CreateTodo,
  DetailFailedStatus,
  DetailOnGoingStatus,
  DetailSuccessStatus,
  ExistArchiving,
  FailedCard,
  FinalSuccessStatus,
  ProgressCard,
  SuccessCard,
} from "./components/Helpers/DetailStatusHelper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RecruitmentDeleteButton } from "./components/Buttons/StatusButton";
import { AddTypeModal } from "./components/Buttons/DetailStatusButton";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function DetailStatusPage() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const [company, setCompany] = useState<string>("");
  const [announcementUrl, setAnnouncementUrl] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [stages, setStages] = useState<any[]>([]);
  const [stageName, setStageName] = useState<string>("");
  const [today, setToday] = useState(new Date());
  const [daysUntilEnd, setDaysUntilEnd] = useState<number>(0);
  const [status, setStatus] = useState<string>("PROGRESS");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 모달 상태
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const isFinalStagePresent = stages.some((stage) => stage.isFinal);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeletePopupOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/recruitments/${recruitmentId}`,
        );
        const { companyName, task, announcementUrl, daysUntilEnd, stages, status, stageName} =
          response.data.data;
        setCompany(companyName);
        setTask(task);
        setAnnouncementUrl(announcementUrl);
        setStages(stages);
        setStageName(stageName)
        setLoading(false);
        setDaysUntilEnd(daysUntilEnd);
        setStatus(status);
      } catch (error) {
        console.error("Error fetching recruitment details:", error);
        setLoading(false);
      }
    };

    if (recruitmentId) {
      fetchRecruitmentDetails();
    }
  }, [recruitmentId, stages]);

  const formatDate = (date: Date) => {
    return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const getTopStage = () => {
    if (stages.length === 0) return null;
    const topStage = stages[stages.length - 1];
    return topStage;
  };

  const topStage = getTopStage();

  const handlePrevDay = () => {
    const prevDay = new Date(today);
    prevDay.setDate(today.getDate() - 1);
    setToday(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    setToday(nextDay);
  };

  let StatusComponent;
    switch (status) {
      case "PROGRESS":
        StatusComponent = (
          <DetailOnGoingStatus
            name={stageName}
            day={daysUntilEnd}
            company={company}
            department={task}
            announcementUrl={announcementUrl}
          />
        );
        break;
      case "PASSED":
        if (topStage?.isFinal) {
          StatusComponent = (
            <FinalSuccessStatus
              name={stageName}
              department={task}
              company={company}
              announcementUrl={announcementUrl}
            />
          );
        } else {
          StatusComponent = (
            <DetailSuccessStatus
              name={stageName}
              department={task}
              company={company}
              announcementUrl={announcementUrl}
            />
          );
        }
        break;
      case "FAILED":
        StatusComponent = (
          <DetailFailedStatus
            name={stageName}
            department={task}
            company={company}
            announcementUrl={announcementUrl}
          />
        );
        break;
      default:
        StatusComponent = null;
    }

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleClick = () => {
    navigate(`/status/${recruitmentId}/archivings`);
  };

  // const handleClick = async () => {
  //   try {
  //     // 새로운 아카이브 ID를 백엔드에서 생성하고 가져옴
  //     const response = await axios.post(`${BASE_URL}/archivings`);
  //     const newArchiveId = response.data.archiveId;
  //     // 생성된 ID로 새로운 경로로 이동
  //     navigate(`/status/${recruitmentId}/archiving/${newArchiveId}`);
  //   } catch (error) {
  //     console.error('Error creating new archive:', error);
  //   }
  // };

  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <div className="flex items-start justify-between">
        <GoBackButton text="기업별 진행현황" />
        <button
          onClick={handleDeleteClick}
          className="flex flex-shrink-0 items-center justify-center rounded-sm border border-neutral-80 bg-neutral-100"
        >
          <span className="text-xsmall px-[28px] py-[10px] font-medium tracking-[-0.096px] text-neutral-45">
            삭제하기
          </span>
        </button>
      </div>

      {StatusComponent && <div className="flex">{StatusComponent}</div>}

      <div className="mb-[20px] flex items-center rounded-md bg-neutral-100">
        <div className="inline-flex items-center overflow-x-auto whitespace-nowrap">
          {stages.map((stage) => {
            const endDateFormatted = formatDate(new Date(stage.endDate));
            if (stage.status === "PROGRESS") {
              return (
                <ProgressCard
                  key={stage.stageId}
                  stageId={stage.stageId}
                  name={stage.stageName}
                  endDate={endDateFormatted}
                />
              );
            } else if (stage.status === "PASSED") {
              return (
                <SuccessCard
                  key={stage.stageId}
                  stageId={stage.stageId}
                  name={stage.stageName}
                  endDate={endDateFormatted}
                />
              );
            } else if (stage.status === "FAILED") {
              return (
                <FailedCard
                  key={stage.stageId}
                  stageId={stage.stageId}
                  name={stage.stageName}
                  endDate={endDateFormatted}
                />
              );
            } else {
              return null;
            }
          })}
          {!isFinalStagePresent && <AddCard onAddClick={handleAddClick} />}
        </div>
      </div>
      <div className="flex items-center gap-[20px] self-stretch">
        <div className="flex w-full flex-col items-start rounded-md border border-neutral-80 p-[24px]">
          <div className="mb-[16px] flex items-center justify-between self-stretch">
            <div className="flex items-center gap-[6px]">
              <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                오늘의
              </span>
              <span className="text-small18 font-semibold tracking-[-0.022px] text-primary">
                {company}
              </span>
              <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                Todo
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <button onClick={handlePrevDay}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#4C4F56"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-[4px]">
                <span className="text-small18 font-semibold tracking-[-0.096px] text-neutral-35">
                  {formatDate(today)}
                </span>
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M9.44355 12.6151C8.80197 13.5723 7.19803 13.5723 6.55645 12.6151L2.2258 6.15352C1.58423 5.19626 2.3862 3.99967 3.66935 3.99968L12.3306 3.99968C13.6138 3.99968 14.4158 5.19626 13.7742 6.15352L9.44355 12.6151Z"
                      fill="#757BFF"
                    />
                  </svg>
                </button>
              </div>
              <button onClick={handleNextDay}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#4C4F56"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <CreateTodo companyName={company} />
        </div>
        <div className="flex flex-col items-start rounded-md border border-neutral-80 p-[24px]">
          <div className="mb-[18px] flex items-center justify-between self-stretch">
            <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
              아카이빙
            </span>
            <button
              onClick={handleClick}
              className="flex items-center justify-center rounded-full bg-primary-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M5.75 11H11M11 11H16.25M11 11V16.25M11 11V5.75"
                  stroke="#4D55F5"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="h-full">
            <ExistArchiving />
          </div>
        </div>
      </div>
      {isDeletePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <RecruitmentDeleteButton
            companyName={company}
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        </div>
      )}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <AddTypeModal
            onClose={handleModalClose}
            recruitmentId={recruitmentId!}
          />
        </div>
      )}
    </div>
  );
}

export default DetailStatusPage;
