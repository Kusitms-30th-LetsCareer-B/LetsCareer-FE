import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ButtonGroupProps {
  introduceId: number;
  reactionType: string;  // 초기 reactionType을 props로 전달
  onReactionSave: (introduceId: number, reactionType: string) => Promise<void>;
}

export const ButtonGroup = ({
  introduceId,
  reactionType,
  onReactionSave,
}: ButtonGroupProps) => {
  const handleReactionClick = async (reaction: string) => {
    try {
      await onReactionSave(introduceId, reaction);
    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <GoodButton
        isSelected={reactionType === "잘했어요"}
        onClick={() => handleReactionClick("잘했어요")}
      />
      <BadButton
        isSelected={reactionType === "아쉬워요"}
        onClick={() => handleReactionClick("아쉬워요")}
      />
    </div>
  );
};

interface ButtonGroupProps2 {
  interviewId: number;
  reactionType: string;  // 초기 reactionType을 props로 전달
  onReactionSave: (interviewId: number, reactionType: string) => Promise<void>;
}

export const ButtonGroup2 = ({
  interviewId,
  reactionType,
  onReactionSave,
}: ButtonGroupProps2) => {
  const handleReactionClick = async (reaction: string) => {
    try {
      await onReactionSave(interviewId, reaction);
    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <GoodButton
        isSelected={reactionType === "잘했어요"}
        onClick={() => handleReactionClick("잘했어요")}
      />
      <BadButton
        isSelected={reactionType === "아쉬워요"}
        onClick={() => handleReactionClick("아쉬워요")}
      />
    </div>
  );
};

interface GoodButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

const GoodButton = ({ isSelected, onClick }: GoodButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`mr-[6px] flex w-[92px] items-center rounded-sm border border-neutral-80 bg-neutral-100 px-[10px] py-[6px] ${isSelected ? "border-primary bg-primary-10 text-primary" : "bg-neutral-90 text-neutral-45"}`}
    >
      <div className="mr-[6px] flex items-center justify-center">
        {isSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_1342_2199)">
              <path
                d="M4.66732 14.6673V7.33398M1.33398 8.66732V13.334C1.33398 14.0704 1.93094 14.6673 2.66732 14.6673H11.6181C12.6053 14.6673 13.4448 13.9471 13.5949 12.9714L14.3128 8.30477C14.4992 7.09325 13.5619 6.00065 12.3361 6.00065H10.0007C9.63246 6.00065 9.33398 5.70217 9.33398 5.33398V2.97788C9.33398 2.06998 8.59799 1.33398 7.69009 1.33398C7.47354 1.33398 7.2773 1.46151 7.18936 1.6594L4.84328 6.93808C4.73628 7.17883 4.49753 7.33398 4.23407 7.33398H2.66732C1.93094 7.33398 1.33398 7.93094 1.33398 8.66732Z"
                stroke="#4D55F5"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1342_2199">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_1342_13293)">
              <path
                d="M4.66732 14.6673V7.33398M1.33398 8.66732V13.334C1.33398 14.0704 1.93094 14.6673 2.66732 14.6673H11.6181C12.6053 14.6673 13.4448 13.9471 13.5949 12.9714L14.3128 8.30477C14.4992 7.09325 13.5619 6.00065 12.3361 6.00065H10.0007C9.63246 6.00065 9.33398 5.70217 9.33398 5.33398V2.97788C9.33398 2.06998 8.59799 1.33398 7.69009 1.33398C7.47354 1.33398 7.2773 1.46151 7.18936 1.6594L4.84328 6.93808C4.73628 7.17883 4.49753 7.33398 4.23407 7.33398H2.66732C1.93094 7.33398 1.33398 7.93094 1.33398 8.66732Z"
                stroke="#989BA2"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1342_13293">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
      <span className="text-xsmall14 font-medium tracking-[-0.21px]">
        잘했어요
      </span>
    </button>
  );
};

interface BadButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

const BadButton = ({ isSelected, onClick }: BadButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`mr-[6px] flex w-[92px] items-center rounded-sm border border-neutral-80 bg-neutral-100 px-[10px] py-[6px] ${isSelected ? "border-primary bg-primary-10 text-primary" : "bg-neutral-90 text-neutral-45"}`}
    >
      <div className="mr-[6px] flex items-center justify-center">
        {isSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.334 1.33398V8.66732M14.6674 6.53398V3.46732C14.6674 2.72058 14.6674 2.34721 14.522 2.062C14.3942 1.81111 14.1902 1.60714 13.9393 1.47931C13.6541 1.33398 13.2808 1.33398 12.534 1.33398H5.41269C4.43837 1.33398 3.95121 1.33398 3.55774 1.51227C3.21095 1.66941 2.91622 1.92227 2.70818 2.24113C2.47213 2.60291 2.39806 3.08441 2.2499 4.0474L1.90119 6.31407C1.70578 7.58419 1.60808 8.21926 1.79656 8.7134C1.96198 9.14711 2.27312 9.50978 2.67663 9.73923C3.13637 10.0007 3.77891 10.0007 5.06398 10.0007H5.60069C5.97405 10.0007 6.16074 10.0007 6.30335 10.0733C6.42879 10.1372 6.53078 10.2392 6.59469 10.3647C6.66735 10.5073 6.66735 10.6939 6.66735 11.0673V13.0234C6.66735 13.9313 7.40335 14.6673 8.31125 14.6673C8.5278 14.6673 8.72403 14.5398 8.81198 14.3419L11.0525 9.30077C11.1544 9.07148 11.2053 8.95684 11.2859 8.87278C11.3571 8.79847 11.4445 8.74165 11.5413 8.70678C11.6508 8.66732 11.7763 8.66732 12.0272 8.66732H12.534C13.2808 8.66732 13.6541 8.66732 13.9393 8.52199C14.1902 8.39416 14.3942 8.19019 14.522 7.93931C14.6674 7.65409 14.6674 7.28072 14.6674 6.53398Z"
              stroke="#4D55F5"
              stroke-width="1.33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.334 1.33398V8.66732M14.6674 6.53398V3.46732C14.6674 2.72058 14.6674 2.34721 14.522 2.062C14.3942 1.81111 14.1902 1.60714 13.9393 1.47931C13.6541 1.33398 13.2808 1.33398 12.534 1.33398H5.41269C4.43837 1.33398 3.95121 1.33398 3.55774 1.51227C3.21095 1.66941 2.91622 1.92227 2.70818 2.24113C2.47213 2.60291 2.39806 3.08441 2.2499 4.0474L1.90119 6.31407C1.70578 7.58419 1.60808 8.21926 1.79656 8.7134C1.96198 9.14711 2.27312 9.50978 2.67663 9.73923C3.13637 10.0007 3.77891 10.0007 5.06398 10.0007H5.60069C5.97405 10.0007 6.16074 10.0007 6.30335 10.0733C6.42879 10.1372 6.53078 10.2392 6.59469 10.3647C6.66735 10.5073 6.66735 10.6939 6.66735 11.0673V13.0234C6.66735 13.9313 7.40335 14.6673 8.31125 14.6673C8.5278 14.6673 8.72403 14.5398 8.81198 14.3419L11.0525 9.30077C11.1544 9.07148 11.2053 8.95684 11.2859 8.87278C11.3571 8.79847 11.4445 8.74165 11.5413 8.70678C11.6508 8.66732 11.7763 8.66732 12.0272 8.66732H12.534C13.2808 8.66732 13.6541 8.66732 13.9393 8.52199C14.1902 8.39416 14.3942 8.19019 14.522 7.93931C14.6674 7.65409 14.6674 7.28072 14.6674 6.53398Z"
              stroke="#989BA2"
              stroke-width="1.33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-xsmall14 font-medium tracking-[-0.21px]">
        아쉬워요
      </span>
    </button>
  );
};

interface InterviewDeleteButtonProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const InterviewDeleteButton = ({
  onDelete,
  onCancel,
}: InterviewDeleteButtonProps) => {
  return (
    <div className="flex h-auto w-[418px] flex-col rounded-lg bg-static-100 shadow-lg">
      <div className="flex items-center justify-between px-[24px] pb-[16px] pt-[24px]">
        <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-10">
          삭제 확인
        </span>
        <button onClick={onCancel}>
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
      <div className="px-[24px]">
        <span className="font-regular font-regular text-xsmall14 tracking-[-0.21px] text-neutral-45">
          질문을 삭제하시겠습니까?
        </span>
      </div>
      <div className="flex justify-end gap-[16px] p-[24px]">
        <button
          onClick={onCancel}
          className="flex rounded-sm bg-neutral-90 px-[28px] py-[10px] text-neutral-45"
        >
          취소
        </button>
        <button
          onClick={onDelete}
          className="rounded-sm bg-system-error px-[28px] py-[10px] text-static-100"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
