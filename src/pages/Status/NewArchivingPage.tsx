import { useEffect, useState } from "react";
import { GoBackButton } from "../../components/Buttons/Button";
import { FileUploadModal } from "./ArchivingPage";

function NewArchivingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
              placeholder="제목을 입력해주세요"
              className="font-regular flex h-[56px] w-full items-center justify-between rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
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
              {/* {file} */}
            </div>
          </div>
          <div className="flex items-start gap-[10px] self-stretch rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
            <textarea
              placeholder="내용을 입력해주세요"
              className="font-regular min-h-[282px] w-full resize-none text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <FileUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default NewArchivingPage;
