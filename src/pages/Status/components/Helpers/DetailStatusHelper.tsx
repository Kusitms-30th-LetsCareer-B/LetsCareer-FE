import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WhiteButton } from "../../../../components/Buttons/Button";
import {
  Ddayh32Chip,
  Finishh32Chip
} from "../../../../components/chips/DdayChip";
import { useScrap } from "../../../../shared/hooks/useScrap";
import { NameProps } from "./StatusHelper";
import {
  RoutineDropdown,
  TodoDropdown,
  WriteRecurringNoteButton,
} from "../Buttons/StatusButton";
import { Departmenth32Chip } from "../Chips/SelfIntroductionChip";
import { FailedChip, ProgressChip, SuccessChip } from "../Chips/StatusChip";
import DatePicker from "../../../../components/DatePicker";
import axios from "axios";
import { ArchiveButton } from "../Buttons/DetailStatusButton";

interface DetailStatusProps {
    day: number;
    name: string;
    company: string;
    department: string;
  }
  
  interface DetailStatusProps2 {
    name: string;
    company: string;
    department: string;
  }
  
  interface CardProps {
    name: string;
    endDate: string;
  }
  

export const DetailOnGoingStatus = ({
    name,
    day,
    company,
    department,
  }: DetailStatusProps) => {
    const { scrap, scrapImage } = useScrap();
  
    return (
      <div className="mb-[20px] flex w-full flex-col items-start self-stretch">
        <div className="flex-start flex flex-col self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-primary-10 px-[24px] py-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 7H15M15 7L11 11M15 7L11 3M4 17H20M20 17L16 21M20 17L16 13"
                  stroke="#4D55F5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-[6px] text-small20 font-semibold tracking-[-0.4px] text-primary">
                {name} 진행중
              </span>
            </div>
            <WhiteButton text="공고 이동" />
          </div>
        </div>
        <div className="flex-start flex flex-col self-stretch rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-static-100 p-[24px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Ddayh32Chip day={day} />
              <span className="ml-[20px] mr-[8px] text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
                {company}
              </span>
              <Departmenth32Chip department={department} />
            </div>
            <div
              className="h-[20px] w-[20px] cursor-pointer"
              onClick={scrapImage}
            >
              {scrap}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const DetailSuccessStatus = ({
    name,
    company,
    department,
  }: DetailStatusProps2) => {
    const { scrap, scrapImage } = useScrap();
  
    return (
      <div className="mb-[20px] flex w-full flex-col items-start self-stretch">
        <div className="flex-start flex flex-col self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-primary-10 bg-secondary-10 px-[24px] py-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 12.0005L8.94975 16.9502L19.5572 6.34375"
                  stroke="#1BC47D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-[6px] text-small20 font-semibold tracking-[-0.4px] text-secondary">
                {name} 진행중
              </span>
            </div>
            <div className="flex items-center gap-[12px]">
              <WriteRecurringNoteButton text="복기노트 작성하기" />
              <WhiteButton text="공고 이동" />
            </div>
          </div>
        </div>
        <div className="flex-start flex flex-col self-stretch rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-static-100 p-[24px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Finishh32Chip />
              <span className="ml-[20px] mr-[8px] text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
                {company}
              </span>
              <Departmenth32Chip department={department} />
            </div>
            <div
              className="h-[20px] w-[20px] cursor-pointer"
              onClick={scrapImage}
            >
              {scrap}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const DetailFailedStatus = ({
    name,
    company,
    department,
  }: DetailStatusProps2) => {
    const { scrap, scrapImage } = useScrap();
  
    return (
      <div className="mb-[20px] flex w-full flex-col items-start self-stretch">
        <div className="flex-start flex flex-col self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-primary-10 bg-teritory-light px-[24px] py-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.00195 8.99902L12.0019 11.999M12.0019 11.999L15.0018 14.9989M12.0019 11.999L9.00195 14.9989M12.0019 11.999L15.0018 8.99902M12.002 20.999C7.03139 20.999 3.00195 16.9696 3.00195 11.999C3.00195 7.02846 7.03139 2.99902 12.002 2.99902C16.9725 2.99902 21.002 7.02846 21.002 11.999C21.002 16.9696 16.9725 20.999 12.002 20.999Z"
                  stroke="#CB81F2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-teritory ml-[6px] text-small20 font-semibold tracking-[-0.4px]">
                {name} 불합격
              </span>
            </div>
            <div className="flex items-center gap-[12px]">
              <WriteRecurringNoteButton text="복기노트 작성하기" />
              <WhiteButton text="공고 이동" />
            </div>
          </div>
        </div>
        <div className="flex-start flex flex-col self-stretch rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-static-100 p-[24px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Finishh32Chip />
              <span className="ml-[20px] mr-[8px] text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
                {company}
              </span>
              <Departmenth32Chip department={department} />
            </div>
            <div
              className="h-[20px] w-[20px] cursor-pointer"
              onClick={scrapImage}
            >
              {scrap}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const ProgressCard = ({ name, endDate }: CardProps) => {
    return (
      <div className="ml-[52px] flex flex-col items-center bg-neutral-100">
        <div className="mb-[12px] mt-[40px] flex flex-col items-start gap-[20px] self-stretch rounded-sm border border-neutral-80 bg-static-100">
          <div className="flex flex-col gap-[20px] p-[16px]">
            <div className="flex w-[144px] items-center justify-between">
              <ProgressChip />
              <button className="flex flex-shrink-0 items-center gap-[10px] rounded-full bg-neutral-95 p-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99935 5.33308L2.66602 10.6664V13.3331L5.33268 13.3331L10.666 7.99974M7.99935 5.33308L9.91177 3.42065L9.91292 3.41952C10.1762 3.15626 10.308 3.0244 10.46 2.97501C10.5939 2.93151 10.7382 2.93151 10.8721 2.97501C11.024 3.02436 11.1557 3.15608 11.4186 3.41896L12.5784 4.57882C12.8424 4.84283 12.9745 4.9749 13.024 5.12712C13.0675 5.26101 13.0674 5.40524 13.0239 5.53914C12.9745 5.69125 12.8427 5.82312 12.579 6.08675L12.5784 6.08732L10.666 7.99974M7.99935 5.33308L10.666 7.99974"
                    stroke="#BDBDBD"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <span className="self-stretch text-xsmall16 font-bold tracking-[-0.096px] text-neutral-0">
                {name}
              </span>
              <span className="self-stretch text-xxsmall12 font-medium tracking-[-0.3px] text-neutral-40">
                {endDate}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[36px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#4D55F5" />
          </svg>
        </div>
      </div>
    );
  };
  
  export const FailedCard = ({ name, endDate }: CardProps) => {
    return (
      <div className="ml-[52px] flex flex-col items-center bg-neutral-100">
        <div className="mb-[12px] mt-[40px] flex flex-col items-start gap-[20px] self-stretch rounded-sm border border-neutral-80 bg-static-100">
          <div className="flex flex-col gap-[20px] p-[16px]">
            <div className="flex w-[144px] items-center justify-between">
              <FailedChip />
              <button className="flex flex-shrink-0 items-center gap-[10px] rounded-full bg-neutral-95 p-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99935 5.33308L2.66602 10.6664V13.3331L5.33268 13.3331L10.666 7.99974M7.99935 5.33308L9.91177 3.42065L9.91292 3.41952C10.1762 3.15626 10.308 3.0244 10.46 2.97501C10.5939 2.93151 10.7382 2.93151 10.8721 2.97501C11.024 3.02436 11.1557 3.15608 11.4186 3.41896L12.5784 4.57882C12.8424 4.84283 12.9745 4.9749 13.024 5.12712C13.0675 5.26101 13.0674 5.40524 13.0239 5.53914C12.9745 5.69125 12.8427 5.82312 12.579 6.08675L12.5784 6.08732L10.666 7.99974M7.99935 5.33308L10.666 7.99974"
                    stroke="#BDBDBD"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <span className="self-stretch text-xsmall16 font-bold tracking-[-0.096px] text-neutral-0">
                {name}
              </span>
              <span className="self-stretch text-xxsmall12 font-medium tracking-[-0.3px] text-neutral-40">
                {endDate}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[36px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#CB81F2" />
          </svg>
        </div>
      </div>
    );
  };
  
  export const SuccessCard = ({ name, endDate }: CardProps) => {
    return (
      <div className="ml-[52px] flex flex-col items-center bg-neutral-100">
        <div className="mb-[12px] mt-[40px] flex flex-col items-start gap-[20px] self-stretch rounded-sm border border-neutral-80 bg-static-100">
          <div className="flex flex-col gap-[20px] p-[16px]">
            <div className="flex w-[144px] items-center justify-between">
              <SuccessChip />
              <button className="flex flex-shrink-0 items-center gap-[10px] rounded-full bg-neutral-95 p-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99935 5.33308L2.66602 10.6664V13.3331L5.33268 13.3331L10.666 7.99974M7.99935 5.33308L9.91177 3.42065L9.91292 3.41952C10.1762 3.15626 10.308 3.0244 10.46 2.97501C10.5939 2.93151 10.7382 2.93151 10.8721 2.97501C11.024 3.02436 11.1557 3.15608 11.4186 3.41896L12.5784 4.57882C12.8424 4.84283 12.9745 4.9749 13.024 5.12712C13.0675 5.26101 13.0674 5.40524 13.0239 5.53914C12.9745 5.69125 12.8427 5.82312 12.579 6.08675L12.5784 6.08732L10.666 7.99974M7.99935 5.33308L10.666 7.99974"
                    stroke="#BDBDBD"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <span className="self-stretch text-xsmall16 font-bold tracking-[-0.096px] text-neutral-0">
                {name}
              </span>
              <span className="self-stretch text-xxsmall12 font-medium tracking-[-0.3px] text-neutral-40">
                {endDate}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[36px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#1BC47D" />
          </svg>
        </div>
      </div>
    );
  };
  
  export const AddCard = () => {
    return (
      <div className="ml-[52px] flex w-[176px] flex-col items-center bg-neutral-100">
        <div className="mb-[12px] mt-[40px] flex h-[124px] items-center justify-center self-stretch rounded-sm border border-neutral-80 bg-static-100">
          <button className="flex items-center justify-center rounded-full border border-neutral-80 p-[4.5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M7.25 14H14M14 14H20.75M14 14V20.75M14 14V7.25"
                stroke="#989BA2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mb-[36px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
          </svg>
        </div>
      </div>
    );
  };
  
  export const NoExistTodo = ({ name }: NameProps) => {
    return (
      <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
        오늘의 {name} Todo를 추가해주세요
      </span>
    );
  };
  
  export const NoExistArchiving = () => {  
    return (
      <div className="flex h-[314px] flex-col justify-center self-stretch">
        <span className="text-center text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
          취업을 위한 자료와 정보들을 업로드해보세요
        </span>
      </div>
    );
  };

interface ArchiveItem {
  id: number;
  title: string;
}

export const ExistArchiving = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  const fetchArchives = async (page: number) => {
    try {
      const response = await axios.get(
        `http://43.203.124.122:8080/archivings/recruitment?recruitmentId=${recruitmentId}&page=${page-1}&size=5`
      );
      console.log("API response:", response.data); // 응답 데이터 출력
      const archiveData = response.data.data
      setArchives(archiveData); // API로 받은 데이터를 저장
      setTotalPages(Math.max(1, (Math.ceil(response.data.totalCount / 5) + 1))); // 페이지 수 계산
      console.log(totalPages);
    } catch (error) {
      console.error("Error fetching archives:", error);
    }
  };

  useEffect(() => {
    if (recruitmentId) {
      fetchArchives(currentPage); // 컴포넌트 마운트 시 현재 페이지에 맞는 데이터를 가져옴
    }
  }, [recruitmentId, currentPage]); // recruitmentId 또는 currentPage가 변경될 때 데이터 가져옴

  const handleDelete = (id: number) => {
    setArchives((prevArchives) =>
      prevArchives.filter((archive) => archive.id !== id)
    );
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = () => {
    navigate(`/status/${recruitmentId}/self-introduce`);
  };

  // 안전하게 처리 - archives가 undefined일 때 기본적으로 빈 배열 처리
  return (
    <div className="flex flex-col items-starat self-stretch">
      <div className="flex items-center self-stretch rounded-sm bg-primary-10">
        <div
          className="flex cursor-pointer justify-between px-[16px] py-[12px]"
          onClick={handleClick}
        >
          <div className="w-[534px] flex-shrink-0 flex-grow basis-0">
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-primary-100">
              자기소개서 작성하기
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 16L13 10L7 4"
              stroke="#4D55F5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {archives.length > 0 ? (
        <>
          {/* 아카이빙 리스트 */}
          {archives.map((archive) => (
            <ArchiveButton
              key={archive.id}
              title={archive.title}
              onDelete={() => handleDelete(archive.id)}
              archiveLink={`/status/${recruitmentId}/archive/${archive.id}`}
            />
          ))}

          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center mt-4">
            {totalPages > 1 ? (
              Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  className="mx-1 flex items-center"
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {currentPage === idx + 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="4" fill="#757BFF" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="4" fill="#E7E7E7" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="h-4"></div> // 페이지가 하나뿐일 경우 패딩 처리
            )}
          </div>
        </>
      ) : (
        <NoExistArchiving />
      )}
    </div>
  );
};

  interface TodoCheckboxProps {
    checked: boolean;
    onChange: () => void;
  }
  
  export const TodoCheckbox: React.FC<TodoCheckboxProps> = ({
    checked,
    onChange,
  }) => {
    return (
      <label className="custom-checkbox flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        {checked ? (
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
      </label>
    );
  };
  
  export const RoutineCheckbox: React.FC<TodoCheckboxProps> = ({
    checked,
    onChange,
  }) => {
    return (
      <label className="custom-checkbox flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
              fill="#1BC47D"
              stroke="#1BC47D"
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
      </label>
    );
  };
  
  interface TodoItem {
    text: string;
    checked: boolean;
    date: string;
  }
  
  interface RoutineItem {
    name: string;
    checked: boolean;
    startDate: string;
    endDate: string;
    selectedDay: string[];
    frequency: string;
    date: string;
  }
  
  export const CreateTodo = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [routines, setRoutines] = useState<RoutineItem[]>([]);
    const [isFocused, setIsFocused] = useState<boolean[]>(todos.map(() => false));
    const [showRoutinePopup, setShowRoutinePopup] = useState(false);
  
  
    const handleCheckboxChange = (index: number, type: 'todo' | 'routine') => {
      if (type === 'todo') {
        const newTodos = [...todos];
        newTodos[index].checked = !newTodos[index].checked;
        setTodos(newTodos);
      } else {
        const newRoutines = [...routines];
        newRoutines[index].checked = !newRoutines[index].checked;
        setRoutines(newRoutines);
      }
    };
  
    const handleTextChange = (index: number, newText: string) => {
      const newTodos = [...todos];
      newTodos[index].text = newText;
      setTodos(newTodos);
    };
  
    const handleFocus = (index: number) => {
      const newFocusState = [...isFocused];
      newFocusState[index] = true;
      setIsFocused(newFocusState);
    };
  
    const handleBlur = (index: number) => {
      const newFocusState = [...isFocused];
      newFocusState[index] = false;
      setIsFocused(newFocusState);
    };
  
    const handleAddTodo = () => {
      setTodos([
        ...todos,
        { text: "", checked: false, date: new Date().toISOString() },
      ]);
      setIsFocused([...isFocused, false]);
    };
  
    const handleOpenRoutinePopup = () => {
      setShowRoutinePopup(true);
    };
  
    const handleCloseRoutinePopup = () => {
      setShowRoutinePopup(false);
    };
  
    const handleAddRoutine = (newRoutine: RoutineItem) => {
      setRoutines([
        ...routines,
        { ...newRoutine, date: new Date().toISOString() },
      ]);
      handleCloseRoutinePopup();
    };
  
    const sortedItems = [...todos, ...routines].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  
    return (
      <div className="flex h-[380px] w-[410px] flex-col items-start self-stretch">
        <div className="mb-[24px] flex h-[312px] flex-col items-center justify-center self-stretch">
          <ul>
            {sortedItems.map((item, index) => (
              <li
                key={index}
                className="mb-[4px] flex w-full items-center gap-[20px] self-stretch py-[6px]"
              >
                <div className="flex w-full items-center">
                  {"text" in item ? (
                    <>
                      <TodoCheckbox
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(index, 'todo')}
                      />
                      <div className="ml-[12px] flex-1 flex-shrink-0 flex-grow-0">
                        <input
                          type="text"
                          value={item.text}
                          placeholder="일정을 입력해주세요"
                          onChange={(e) =>
                            handleTextChange(index, e.target.value)
                          }
                          onFocus={() => handleFocus(index)}
                          onBlur={() => handleBlur(index)}
                          className={`w-[330px] pb-[2px] text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30 mr-[20px] ${item.text && !isFocused[index] ? "border-none" : ""} border-b-2 border-primary placeholder:text-neutral-45 focus:outline-none`}
                        />
                      </div>
                      <TodoDropdown />
                    </>
                  ) : (
                    <div className="flex w-full justify-between items-center self-stretch">
                      <div className="flex items-center">
                        <RoutineCheckbox
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(index, 'routine')}
                        />
                        <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30 ml-[12px] mr-[12px]">
                          {item.name}
                        </span>
                      </div>
                      
                      <div className="flex flex-end justify-center items-center gap-[8px]">
                        {item.frequency === '매일' ? (
                            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-secondary">
                              {item.frequency}
                            </span>
                          ) : (
                            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-secondary">
                              {item.frequency} {item.selectedDay.join(', ')}요일
                            </span>
                          )}                      
                          <div className="flex p-[3px] rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M7.49829 12H3.74829V15.75M10.4983 6H14.2483V2.25M3.43555 6.75255C3.85606 5.71175 4.56012 4.80978 5.4677 4.14917C6.37529 3.48856 7.45093 3.09564 8.57061 3.01538C9.69028 2.93512 10.8093 3.17055 11.8019 3.69496C12.7944 4.21937 13.6192 5.0119 14.1839 5.98209M14.5615 11.2478C14.1409 12.2886 13.4369 13.1906 12.5293 13.8512C11.6217 14.5118 10.5472 14.9042 9.42749 14.9845C8.30782 15.0647 7.18784 14.8293 6.19531 14.3049C5.20279 13.7805 4.37741 12.9881 3.81274 12.0179" stroke="#1BC47D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <div className="pt-[6px]">
                            <RoutineDropdown />
                          </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-[10px] self-stretch">
          <button
            onClick={handleAddTodo}
            className="flex w-full items-center justify-center rounded-sm bg-primary-10 px-[28px] py-[10px]"
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-primary">
              Todo 추가
            </span>
          </button>
          <button
            onClick={handleOpenRoutinePopup}
            className="flex w-full items-center justify-center rounded-sm bg-secondary-10 px-[28px] py-[10px]"
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-secondary">
              루틴 추가
            </span>
          </button>
        </div>
        {showRoutinePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <CreateRoutine onClose={handleCloseRoutinePopup} onSubmit={handleAddRoutine}/>
          </div>
        )}
      </div>
    );
  };
  
  export const CreateRoutine = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (routine: RoutineItem) => void }) => {
    const [routineName, setRoutineName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [selectedDay, setSelectedDay] = useState<string[]>([]);
  
    const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
    const [EndDatePickerOpen, setEndDatePickerOpen] = useState(false);
  
    const formatDate = (date: string) => {
      if (!date) return "시작 날짜";
  
      const formattedDate = new Date(date)
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, ".");
      return formattedDate;
    };
  
    const formatDate2 = (date: string) => {
      if (!date) return "종료 날짜";
  
      const formattedDate = new Date(date)
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, ".");
      return formattedDate;
    };
  
    const handleFrequencyChange = (value: string) => {
      setFrequency(value);
      if (value === "매일") {
        setSelectedDay([]); // 매일을 선택하면 요일 선택 초기화
      }
    };
  
    const handleDayToggle = (day: string) => {
      if (selectedDay.includes(day)) {
        setSelectedDay(selectedDay.filter((d) => d !== day));
      } else {
        setSelectedDay([...selectedDay, day]);
      }
    };
  
    const handleComplete = () => {
      const routineData: RoutineItem = {
        name: routineName,
        startDate,
        endDate,
        selectedDay,
        frequency, 
        checked: false,
        date: new Date().toISOString(),
      };
      onSubmit(routineData);
      onClose(); 
    };
  
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  
    const handleOpenStartDatePicker = () => setStartDatePickerOpen(true);
    const handleCloseStartDatePicker = () => setStartDatePickerOpen(false);
  
    const handleOpenEndDatePicker = () => setEndDatePickerOpen(true);
    const handleCloseEndDatePicker = () => setEndDatePickerOpen(false);
  
    const handleStartDateSelected = (date: Date | null) => {
      if (date) {
        setStartDate(
          date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        );
      }
      handleCloseStartDatePicker();
    };
  
    const handleEndDateSelected = (date: Date | null) => {
      if (date) {
        setEndDate(
          date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        );
      }
      handleCloseEndDatePicker();
    };
  
    return (
      <div className="flex w-[294px] flex-col items-end gap-[16px] rounded-sm border border-neutral-80 bg-static-100 px-[24px] pb-[24px] pt-[16px] shadow-sm">
        <div className="flex">
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
                stroke="#4C4F56"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-[24px] self-stretch">
          <div className="flex w-[244px] flex-col justify-center gap-[20px] self-stretch">
            <input
              type="text"
              placeholder="루틴을 입력해주세요"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="font-regualr flex items-start self-stretch rounded-sm border border-neutral-80 px-[20px] py-[14px] text-xsmall16 tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45"
            />
  
            <div
              className="flex cursor-pointer items-center justify-between rounded-sm border border-neutral-80 px-[20px] py-[14px]"
              onClick={handleOpenStartDatePicker}
            >
              <span
                className={`font-regular text-xsmall16 tracking-[-0.096px] ${
                  startDate ? "text-neutral-30" : "text-neutral-45"
                }`}
              >
                {formatDate(startDate)}
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
            </div>
            {startDatePickerOpen && (
              <div className="transfrom absolute left-[235px] top-[310px] z-10 bg-static-100">
                <DatePicker
                  onCancel={handleCloseStartDatePicker}
                  onSelect={handleStartDateSelected}
                  message={"날짜를 선택해주세요"}
                />
              </div>
            )}
  
            <div
              className="flex cursor-pointer items-center justify-between rounded-sm border border-neutral-80 px-[20px] py-[14px]"
              onClick={handleOpenEndDatePicker}
            >
              <span
                className={`font-regular text-xsmall16 tracking-[-0.096px] ${
                  endDate ? "text-neutral-30" : "text-neutral-45"
                }`}
              >
                {formatDate2(endDate)}
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
            </div>
            {EndDatePickerOpen && (
              <div className="transfrom absolute left-[235px] top-[310px] z-10 bg-static-100">
                <DatePicker
                  onCancel={handleCloseEndDatePicker}
                  onSelect={handleEndDateSelected}
                  message={"날짜를 선택해주세요"}
                />
              </div>
            )}
  
            <div className="flex w-full items-center gap-[20px] self-stretch">
              <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                주기
              </span>
              <div className="flex items-center gap-[8px]">
                <button
                  className={`flex w-[94px] items-center justify-center rounded-sm border border-neutral-80 bg-neutral-100 px-[10px] py-[8px] ${
                    frequency === "매일" ? "border-primary text-primary" : ""
                  }`}
                  onClick={() => handleFrequencyChange("매일")}
                >
                  <span
                    className={`text-xsmall16 font-medium tracking-[-0.096px] ${
                      frequency === "매일" ? "text-primary" : "text-neutral-45"
                    }`}
                  >
                    매일
                  </span>
                </button>
                <button
                  className={`flex w-[94px] items-center justify-center rounded-sm border border-neutral-80 bg-neutral-100 px-[10px] py-[8px] ${
                    frequency === "매주" ? "border-primary text-primary" : ""
                  }`}
                  onClick={() => handleFrequencyChange("매주")}
                >
                  <span
                    className={`text-xsmall16 font-medium tracking-[-0.096px] ${
                      frequency === "매주" ? "text-primary" : "text-neutral-45"
                    }`}
                  >
                    매주
                  </span>
                </button>
              </div>
            </div>
            {frequency === "매주" && (
              <div className="flex items-center justify-center gap-[8px]">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`flex w-full flex-col items-center justify-center gap-[10px] rounded-xxs border border-neutral-80 bg-neutral-100 p-[4px] text-xsmall14 font-semibold tracking-[-0.21px] ${
                      selectedDay.includes(day)
                        ? "border-primary bg-primary-10 text-primary"
                        : "text-neutral-45"
                    }`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="flex items-center justify-center self-stretch rounded-sm bg-neutral-90 px-[28px] py-[10px] text-neutral-45 hover:bg-primary-120 hover:text-static-100 focus:bg-primary focus:text-static-100"
            onClick={handleComplete}
          >
            <span className="text-xsmall16 font-medium tracking-[-0.096px]">
              완료
            </span>
          </button>
        </div>
      </div>
    );
  };
  