import { useNavigate, useParams } from "react-router-dom";
import { WhiteButton } from "../../../../components/Buttons/Button";
import {
  Ddayh32Chip,
  Finishh32Chip,
} from "../../../../components/chips/DdayChip";
import { useScrap } from "../../../../shared/hooks/useScrap";
import {
  TodoDropdown,
  WriteRecurringNoteButton,
} from "../Buttons/StatusButton";
import { Departmenth32Chip } from "../Chips/SelfIntroductionChip";
import { FailedChip, ProgressChip, SuccessChip } from "../Chips/StatusChip";
import { useState } from "react";

export interface NameProps {
  name: string;
}

interface RecurringNoteProps {
  name: string;
  recruitmentId: number;
}

interface RecurringNoteProps2 {
  recruitmentId: number;
}

interface ProgressProps {
  name: string;
  endDate: string;
}

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

export const WelcomeMessage = ({ name }: NameProps) => {
  return (
    <span className="text-center text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
      {name}님, 오늘도 커리어를 차곡차곡 쌓아볼까요?
    </span>
  );
};

export const OnGoingStatus = ({ name, endDate }: ProgressProps) => {
  return (
    <div className="flex h-[60px] w-[554px] items-center rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-primary-10 px-[20px]">
      <div className="flex w-full items-center justify-between">
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
        <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-40">
          {name} 마감 : {endDate}
        </span>
      </div>
    </div>
  );
};

export const FailedStatus = ({ name, recruitmentId }: RecurringNoteProps) => {
  const navigate = useNavigate();

  const handleRecurringNote = () => {
    if (recruitmentId) {
      navigate(`/status/${recruitmentId}/recurring-note`);
    } else {
      alert("recruitmentId가 없습니다.");
    }
  };
  return (
    <div className="flex h-[60px] w-[554px] items-center rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-teritory-light px-[20px]">
      <div className="flex w-full items-center justify-between">
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
          <span className="ml-[6px] text-small20 font-semibold tracking-[-0.4px] text-teritory-normal">
            {name} 불합격
          </span>
        </div>
        <WriteRecurringNoteButton
          onClick={handleRecurringNote}
          text="복기노트 작성"
        />
      </div>
    </div>
  );
};

export const SuccessStatus = ({ recruitmentId }: RecurringNoteProps2) => {
  const navigate = useNavigate();

  const handleRecurringNote = () => {
    if (recruitmentId) {
      navigate(`/status/${recruitmentId}/recurring-note`);
    }
  };

  return (
    <div className="flex h-[60px] w-[554px] items-center rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 bg-secondary-10 px-[20px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
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
            최종 합격
          </span>
        </div>
        <WriteRecurringNoteButton
          onClick={handleRecurringNote}
          text="복기노트 작성"
        />
      </div>
    </div>
  );
};

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
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const navigate = useNavigate();

  const handleRecurringNote = () => {
    if (recruitmentId) {
      navigate(`/status/${recruitmentId}/recurring-note`);
    }
  };

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
            <WriteRecurringNoteButton onClick={handleRecurringNote} text="복기노트 작성하기" />
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
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const navigate = useNavigate();

  const handleRecurringNote = () => {
    if (recruitmentId) {
      navigate(`/status/${recruitmentId}/recurring-note`);
    }
  };

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
            <WriteRecurringNoteButton onClick={handleRecurringNote} text="복기노트 작성하기" />
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/status/self-introduce");
  };

  return (
    <div className="">
      <div className="mb-[12px] flex items-center self-stretch rounded-sm bg-primary-10">
        <div className="flex justify-between px-[16px] py-[12px]">
          <div className="w-[534px] flex-shrink-0 flex-grow basis-0">
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-primary-100">
              자기소개서 작성하기
            </span>
          </div>
          <button onClick={handleClick}>
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
          </button>
        </div>
      </div>
      <div className="flex h-[314px] flex-col justify-center self-stretch">
        <span className="text-center text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
          취업을 위한 자료와 정보들을 업로드해보세요
        </span>
      </div>
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

interface TodoItem {
  text: string;
  checked: boolean;
}

export const CreateTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isFocused, setIsFocused] = useState<boolean[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const handleTextChange = (index: number, newText: string) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { text: "", checked: false }]);
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

  return (
    <div className="flex h-[380px] w-[410px] flex-col items-start self-stretch">
      <div className="mb-[24px] flex h-[312px] flex-col items-center justify-center self-stretch">
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="mb-[4px] flex items-center gap-[20px] self-stretch py-[6px]"
            >
              <div className="flex w-[366px] items-center">
                <TodoCheckbox
                  checked={todo.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <div className="ml-[12px] flex-1 flex-shrink-0 flex-grow-0">
                  <input
                    type="text"
                    value={todo.text}
                    placeholder="일정을 입력해주세요"
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                    className={`w-[330px] pb-[2px] text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30 ${todo.text && !isFocused[index] ? "border-none" : ""} border-b-2 border-primary placeholder:text-neutral-45 focus:outline-none`}
                  />
                </div>
              </div>
              <TodoDropdown />
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
          onClick={() => {}}
          className="flex w-full items-center justify-center rounded-sm bg-secondary-10 px-[28px] py-[10px]"
        >
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-secondary">
            루틴 추가
          </span>
        </button>
      </div>
    </div>
  );
};

export const CreateRoutine = ({ onClose }: { onClose: () => void }) => {
  const [routineName, setRoutineName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedDay, setSelectedDay] = useState<string[]>([]);

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
    const routineData = {
      name: routineName,
      startDate,
      endDate,
      frequency,
      selectedDay,
    };
    onClose();
  };

  return (
    <div className="flex w-[294px] flex-col items-end gap-[16px] rounded-sm border border-neutral-80 px-[24px] pb-[24px] pt-[16px] shadow-sm">
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
          <div className="flex cursor-pointer items-center justify-between rounded-sm border border-neutral-80 px-[20px] py-[14px]">
            <span className="font-regular text-xsmall16 tracking-[-0.096px] text-neutral-45">
              {startDate || "시작 날짜"}
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
          <div className="flex cursor-pointer items-center justify-between rounded-sm border border-neutral-80 px-[20px] py-[14px]">
            <span className="font-regular text-xsmall16 tracking-[-0.096px] text-neutral-45">
              {endDate || "종료 날짜"}
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
        </div>
        <button
          className="flex items-center justify-center self-stretch rounded-sm bg-neutral-90 px-[28px] py-[10px]"
          onClick={handleComplete}
        >
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-45">
            완료
          </span>
        </button>
      </div>
    </div>
  );
};

export const ExistRoutine = () => {
  const [routine, setRoutine] = useState<string[]>([""]);

  return (
    <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45"></span>
  );
};

export const ExistArchiving = () => {
  return (
    <span className="text-center text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
      취업을 위한 자료와 정보들을 업로드해보세요
    </span>
  );
};
