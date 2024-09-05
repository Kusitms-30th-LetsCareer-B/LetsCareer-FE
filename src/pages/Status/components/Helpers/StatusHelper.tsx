import {
  WriteRecurringNoteButton,
} from "../Buttons/StatusButton";

export interface NameProps {
  name: string;
}

interface ProgressProps {
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

export const FailedStatus = ({ name }: NameProps) => {
  return (
    <div className="bg-tertiary-light flex h-[60px] w-[554px] items-center rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none border-b border-l border-r border-neutral-80 px-[20px]">
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
          <span className="text-tertiary ml-[6px] text-small20 font-semibold tracking-[-0.4px]">
            {name} 불합격
          </span>
        </div>
        <WriteRecurringNoteButton text="복기노트 작성" />
      </div>
    </div>
  );
};

export const SuccessStatus = () => {
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
        <WriteRecurringNoteButton text="복기노트 작성" />
      </div>
    </div>
  );
};
