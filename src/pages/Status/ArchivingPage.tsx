import { useEffect, useState } from "react";
import { GoBackButton } from "../../components/Buttons/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("파일 업로드 실패");
        }
        return response.text(); // JSON이 아닌 텍스트로 받아보기
      })
      .then((data) => {
        console.log("파일 업로드 성공:", data);
        onClose(); // 업로드 후 모달 닫기
      })
      .catch((error) => {
        console.error("파일 업로드 오류:", error);
      });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 shadow-lg ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex h-[244px] w-[575px] flex-col items-start rounded-lg bg-static-100">
        <div className="flex justify-between self-stretch p-[24px]">
          <span className="h-[24px] w-[24px]"></span>
          <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-10">
            파일 업로드하기
          </span>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 7L7 17M7 7L17 17"
                stroke="#2A2D34"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-start gap-[10px] self-stretch px-[24px]">
          <div className="flex flex-col items-start gap-[12px] self-stretch">
            <span className="font-regualr self-stretch text-xsmall14 tracking-[-0.21px] text-neutral-45">
              PDF, JPEG, PNG, CSV 파일 형식을 지원하고, 10MB까지 업로드
              가능합니다.
            </span>
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex w-[431px] items-center gap-[10px] rounded-sm border border-neutral-80 px-[20px] py-[10px]">
                <input
                  placeholder="파일을 업로드하세요"
                  value={selectedFile ? selectedFile.name : ""}
                  readOnly
                  className="font-regular w-full text-xsmall14 tracking-[-0.21px] text-neutral-30"
                ></input>
              </div>
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-[10px] rounded-sm bg-primary-10 px-[20px] py-[10px] text-xsmall14 font-medium tracking-[-0.21px] text-primary"
              >
                찾아보기
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf, .jpeg, .jpg, .png, .csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[16px] self-stretch p-[24px]">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-[10px] rounded-sm bg-neutral-90 px-[28px] py-[10px]"
          >
            <span className="w-[140px] text-xsmall16 font-medium tracking-[-0.096px] text-neutral-45">
              취소
            </span>
          </button>
          <button
            onClick={handleUpload}
            className={`flex items-center justify-center gap-[10px] rounded-sm bg-primary px-[28px] py-[10px] ${!selectedFile ? "cursor-not-allowed" : ""}`}
            disabled={!selectedFile}
          >
            <span className="w-[140px] text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
              등록
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ArchiveData {
  title: string;
  content: string;
  fileName: string;
}

function ArchivingPage() {
  const { archiveId } = useParams<{ archiveId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archiveData, setArchiveData] = useState<ArchiveData | null>(null); // API로부터 받은 데이터를 저장하는 상태

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArchiveData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/archivings/detail?archivingId=${archiveId}`,
        );
        setArchiveData(response.data);
      } catch (error) {
        console.error("Error fetching archive data:", error);
      }
    };

    if (archiveId) {
      fetchArchiveData();
    }
  }, [archiveId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mb-[100px] w-[1128px] px-[48px] pt-[40px]">
      <GoBackButton text="서류 아카이빙" />
      <div className="flex w-full flex-col items-end gap-[24px]">
        <button className="flex flex-shrink-0 justify-center gap-[10px] rounded-sm bg-primary px-[28px] py-[10px]">
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
            저장하기
          </span>
        </button>
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch rounded-md bg-neutral-100 p-[20px]">
          <div className="flex flex-col items-end gap-[16px] self-stretch">
            <input
              value={archiveData?.title || ""}
              placeholder="제목을 입력해주세요"
              className="font-regular flex h-[56px] w-full items-center justify-between rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
              readOnly
            />
          </div>
          <div className="flex items-start gap-[16px] self-stretch">
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-[8px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[16px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7Z"
                  stroke="#4C4F56"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                파일 추가
              </span>
            </button>
            <div className="font-regular flex h-[56px] w-[840px] items-center justify-between rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45">
              {archiveData?.fileName || "파일이 없습니다."}
            </div>
          </div>
          <div className="flex items-start gap-[10px] self-stretch rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
            <textarea
              placeholder="내용을 입력해주세요"
              value={archiveData?.content || ""}
              className="font-regular min-h-[282px] w-full resize-none text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
              readOnly
            />
          </div>
        </div>
      </div>
      <FileUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default ArchivingPage;
