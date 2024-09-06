import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "../../../../components/DatePicker";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ArchiveButtonProps {
  title: string;
  onDelete: () => void;
  archiveLink: string;
}

export const ArchiveButton = ({
  title,
  onDelete,
  archiveLink,
}: ArchiveButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="mt-[12px] flex items-center gap-[16px] rounded-sm bg-neutral-95 px-[16px] py-[12px]"
      onClick={() => navigate(archiveLink)}
    >
      <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {title}
      </span>
      <button
        className=""
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M14.1673 5.83301L5.83398 14.1663M5.83398 5.83301L14.1673 14.1663"
            stroke="#989BA2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </button>
  );
};

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const AnnouncementButton = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="border-1-neutral-85 inline-flex h-[38px] w-[101px] items-center justify-center gap-[10px] rounded-sm border bg-static-100 px-[20px] py-[6px]"
    >
      <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {text}
      </div>
    </button>
  );
};

interface AddTypeModalProps {
  onClose: () => void;
  recruitmentId: string;
}

export const AddTypeModal = ({ onClose, recruitmentId }: AddTypeModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null); // 선택된 전형명 상태
  const [selectedStatus, setSelectedStatus] = useState<string>("진행중"); // 선택된 상태 (진행중, 합격, 불합격)
  const [isFinalStage, setIsFinalStage] = useState(false); // 최종 단계 체크박스 상태
  const [inputValue, setInputValue] = useState<string>(""); // 기타 항목 입력 값
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // DatePicker 열림 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [apiDate, setApiDate] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // 전형명 입력 필드 포커스 상태

  const handleFinalStageChange = () => {
    setIsFinalStage(!isFinalStage);
  };

  const handleDateSelect = (date: Date) => {
    const formattedDisplayDate = `${date.getFullYear() % 100}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
    const formattedApiDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식

    setSelectedDate(formattedDisplayDate);
    setApiDate(formattedApiDate);
    setIsDatePickerOpen(false);
  };

  const handleSubmit = async () => {
    const requestBody = {
      stageName: selectedType === "기타" ? inputValue : selectedType,
      endDate: apiDate,
      isFinal: isFinalStage,
    };

    console.log("Sending request to API with data:", requestBody);

    try {
      await axios.post(
        `${BASE_URL}/stages?recruitmentId=${recruitmentId}`,
        requestBody,
        {
          params: { recruitmentId: recruitmentId },
        },
      );

      console.log("Stage successfully submitted");

      onClose();
    } catch (error) {
      console.error("Error submitting stage:", error);
    }
  };

  return (
    <div className="flex w-[294px] flex-col items-end rounded-sm border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[16px] shadow-sm">
      <button onClick={onClose} className="mb-[16px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="#4C4F56"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex w-full flex-col items-start gap-[24px] self-stretch">
        <div className="flex w-full flex-col items-start gap-[20px] self-stretch">
          <div className="flex items-start gap-[10px] self-stretch">
            {/* 전형명 버튼 클릭 시 스타일 변경 */}
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "서류"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("서류")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                서류
              </span>
            </button>
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "면접"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("면접")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                면접
              </span>
            </button>
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "기타"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("기타")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                기타
              </span>
            </button>
          </div>

          {/* 기타 클릭 시 나타나는 입력 칸 */}
          {selectedType === "기타" && (
            <input
              type="text"
              className={`w-full rounded-sm border px-[20px] py-[14px] ${isFocused ? "border-primary" : "border-neutral-80"}`}
              placeholder="전형명을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}

          <button
            className="flex w-full justify-between gap-[23px] rounded-sm border border-neutral-80 px-[20px] py-[14px]"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <span
              className={`font-regular text-xsmall16 tracking-[-0.096px] ${selectedDate ? "text-neutral-30" : "text-neutral-45"}`}
            >
              {selectedDate ? selectedDate : "날짜 선택"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"
                stroke="#989BA2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDatePickerOpen && (
            <div className="absolute z-50 mt-2 -translate-x-1/2">
              <DatePicker
                onCancel={() => setIsDatePickerOpen(false)}
                onSelect={handleDateSelect}
                message="날짜를 선택해주세요"
              />
            </div>
          )}

          <div className="flex items-center gap-[20px] self-stretch">
            <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
              상태
            </span>
            <div className="flex items-center gap-[8px]">
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "진행중"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("진행중")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  진행중
                </span>
              </button>
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "합격"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("합격")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  합격
                </span>
              </button>
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "불합격"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("불합격")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  불합격
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-[8px] self-stretch">
            {/* 체크박스 클릭 시 SVG 변경 */}
            <button onClick={handleFinalStageChange}>
              {isFinalStage ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
                    fill="#4D55F5"
                    stroke="#4D55F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12L11 15L17 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
                    fill="white"
                    stroke="#989BA2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
              최종 단계
            </span>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center self-stretch rounded-sm bg-neutral-90 px-[28px] py-[10px] text-neutral-45 hover:bg-primary-120 hover:text-static-100 focus:bg-primary focus:text-static-100"
        >
          <span className="text-xsmall16 font-medium tracking-[-0.096px]">
            완료
          </span>
        </button>
      </div>
    </div>
  );
};

interface UpdateTypeModalProps {
  onClose: () => void;
  stageId: string;
}

export const UpdateTypeModal = ({ onClose, stageId }: UpdateTypeModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null); // 선택된 전형명 상태
  const [selectedStatus, setSelectedStatus] = useState<string | null>(""); // 선택된 상태 (진행중, 합격, 불합격)
  const [isFinalStage, setIsFinalStage] = useState(false); // 최종 단계 체크박스 상태
  const [inputValue, setInputValue] = useState<string>(""); // 기타 항목 입력 값
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // DatePicker 열림 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [apiDate, setApiDate] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // 전형명 입력 필드 포커스 상태

  const handleFinalStageChange = () => {
    setIsFinalStage(!isFinalStage);
  };

  const handleDateSelect = (date: Date) => {
    const formattedDisplayDate = `${date.getFullYear() % 100}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
    const formattedApiDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식

    setSelectedDate(formattedDisplayDate); // 화면에 표시할 yy.mm.dd 형식
    setApiDate(formattedApiDate); // API에 보낼 yyyy-mm-dd 형식
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/stages?stageId=${stageId}`,
        );
        const stageData = response.data.data;

        setSelectedType(stageData.stageName);
        setSelectedStatus(mapStatusToDisplay(stageData.status));
        setIsFinalStage(stageData.isFinal);

        if (stageData.stageName !== "서류" || stageData.stageName !== "면접") {
          setInputValue(stageData.stageName);
        }
        const formattedDate = formatDateForDisplay(stageData.endDate);
        setSelectedDate(formattedDate);
        setApiDate(stageData.endDate); // API에 보낼 원본 날짜는 유지
      } catch (error) {
        console.error("Error fetching stage data:", error);
      }
    };

    if (stageId) {
      fetchStageData(); // stageId가 있을 때만 데이터 fetch
    }
  }, [stageId]);

  const mapStatusToDisplay = (status: string) => {
    switch (status) {
      case "PROGRESS":
        return "진행중";
      case "PASSED":
        return "합격";
      case "FAILED":
        return "불합격";
      default:
        return "";
    }
  };

  // 상태를 '진행중', '합격', '불합격'에서 API에 맞는 'PROGRESS', 'PASSED', 'FAILED'로 변환
  const mapStatusToApi = (status: string) => {
    switch (status) {
      case "준비중":
        return "PROGRESS";
      case "합격":
        return "PASSED";
      case "불합격":
        return "FAILED";
      default:
        return "";
    }
  };

  // API로 날짜를 보낼 때는 yyyy-mm-dd 형식으로 변환
  const formatDateForDisplay = (apiDate: string) => {
    const date = new Date(apiDate);
    return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleUpdate = async () => {
    const requestBody = {
      stageName: selectedType === "기타" ? inputValue : selectedType,
      endDate: apiDate,
      status: selectedStatus,
    };

    try {
      await axios.put(`${BASE_URL}/stages?stageId=${stageId}`, requestBody);
      onClose();
    } catch (error) {
      console.error("Error updating stage:", error);
    }
  };

  // 삭제 API 호출
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/stages?stageId=${stageId}`);
      onClose();
    } catch (error) {
      console.error("Error deleting stage:", error);
    }
  };

  return (
    <div className="relative flex w-[294px] flex-col items-end rounded-sm border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[16px] shadow-sm">
      <button onClick={onClose} className="mb-[16px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="#4C4F56"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex w-full flex-col items-start gap-[24px] self-stretch">
        <div className="flex w-full flex-col items-start gap-[20px] self-stretch">
          <div className="flex items-start gap-[10px] self-stretch">
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "서류"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("서류")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                서류
              </span>
            </button>
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "면접"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("면접")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                면접
              </span>
            </button>
            <button
              className={`flex w-[75px] items-center justify-center border px-[10px] py-[8px] ${
                selectedType === "기타"
                  ? "border-primary bg-primary-10 text-primary"
                  : "border-neutral-80 bg-neutral-100 text-neutral-45"
              } rounded-sm`}
              onClick={() => setSelectedType("기타")}
            >
              <span className="text-center text-xsmall16 font-medium tracking-[-0.096px]">
                기타
              </span>
            </button>
          </div>

          {/* 기타 클릭 시 나타나는 입력 칸 */}
          {selectedType === "기타" && (
            <input
              type="text"
              className={`w-full rounded-sm border border-neutral-80 px-[20px] py-[14px] ${isFocused ? "border-primary" : "border-neutral-80"}`}
              placeholder="전형명을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}

          <button
            className="flex w-full justify-between gap-[23px] rounded-sm border border-neutral-80 px-[20px] py-[14px]"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <span
              className={`font-regular text-xsmall16 tracking-[-0.096px] ${selectedDate ? "text-neutral-30" : "text-neutral-45"}`}
            >
              {selectedDate ? selectedDate : "날짜 선택"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"
                stroke="#989BA2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDatePickerOpen && (
            <div className="absolute z-50 mt-2 -translate-x-1/2">
              <DatePicker
                onCancel={() => setIsDatePickerOpen(false)}
                onSelect={handleDateSelect}
                message="날짜를 선택해주세요"
              />
            </div>
          )}

          <div className="flex items-center gap-[20px] self-stretch">
            <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
              상태
            </span>
            <div className="flex items-center gap-[8px]">
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "진행중"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("진행중")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  진행중
                </span>
              </button>
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "합격"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("합격")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  합격
                </span>
              </button>
              <button
                className={`flex w-[60px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${
                  selectedStatus === "불합격"
                    ? "border-primary bg-primary-10 text-primary"
                    : "border-neutral-80 text-neutral-45"
                }`}
                onClick={() => setSelectedStatus("불합격")}
              >
                <span className="text-xsmall14 font-medium tracking-[-0.21px]">
                  불합격
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-[8px] self-stretch">
            {/* 체크박스 클릭 시 SVG 변경 */}
            <button onClick={handleFinalStageChange}>
              {isFinalStage ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
                    fill="#4D55F5"
                    stroke="#4D55F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12L11 15L17 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
                    fill="white"
                    stroke="#989BA2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
              최종 단계
            </span>
          </div>
        </div>
        <div className="flex w-full items-start gap-[12px] self-stretch">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center rounded-sm bg-neutral-90 px-[28px] py-[10px] hover:bg-neutral-80"
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-system-error">
              삭제
            </span>
          </button>
          <button
            onClick={handleUpdate}
            className="flex w-3/5 items-center justify-center self-stretch rounded-sm bg-primary px-[28px] py-[10px] text-neutral-45 text-static-100 hover:bg-primary-120"
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px]">
              완료
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
