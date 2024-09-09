import { useState } from "react";

// HideAnswerToggle 컴포넌트
interface HideAnswerToggleProps {
  title: string;
  onToggle: () => void;  // 상태를 변경할 콜백 함수
}

export const HideAnswerToggle = ({ title, onToggle }: HideAnswerToggleProps) => {
  return (
    <div className="flex h-[56px] w-full items-center gap-[12px] rounded-sm border border-neutral-80 px-[20px] py-[14px]">
      <svg
        onClick={onToggle}  // 클릭하면 onToggle 호출
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        className="cursor-pointer"
      >
        <path
          d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301997 1.66667 1.26425 -1.46309e-06 2.80385 -1.32849e-06L13.1962 -4.19966e-07C14.7358 -2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z"
          fill="#757BFF"
        />
      </svg>
      <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
        {title}
      </span>
    </div>
  );
};

// ShowAnswerToggle 컴포넌트
interface ShowAnswerToggleProps {
  title: string;
  content: string;
  onToggle: () => void;  // 상태를 변경할 콜백 함수
  onUpdate: () => void;  // 수정하기 버튼을 누를 때 호출되는 콜백 함수
}

export const ShowAnswerToggle = ({ title, content, onToggle, onUpdate }: ShowAnswerToggleProps) => {
  return (
    <div className="flex w-full flex-col rounded-b-md bg-neutral-100">
      <div className="flex h-[56px] items-center gap-[12px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
        <svg
          onClick={onToggle}  // 클릭하면 onToggle 호출
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          className="cursor-pointer"
        >
          <path
            d="M6.26795 1C7.03775 -0.333332 8.96225 -0.333334 9.73205 0.999999L14.9282 10C15.698 11.3333 14.7358 13 13.1962 13L2.80385 13C1.26425 13 0.301996 11.3333 1.0718 10L6.26795 1Z"
            fill="#757BFF"
          />
        </svg>
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          {title}
        </span>
      </div>
      <div className="flex flex-col items-start gap-[10px] p-[20px]">
        <div className="flex w-full flex-col items-start gap-[10px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
          <span className="text-xsmall14 font-bold tracking-[-0.21px] text-neutral-30">
            {title}
          </span>
          <span className="font-regular text-xsmall14 tracking-[-0.21px] text-neutral-40">
            {content}
          </span>
        </div>
        <div className="flex items-center gap-[13px] self-stretch">
          <button className="flex w-1/2 items-center justify-center gap-[8px] rounded-md bg-neutral-90 px-[20px] py-[12px]">
            <span className="text-small18 font-medium tracking-[-0.022px] text-neutral-45">
              삭제하기
            </span>
          </button>
          <button
            onClick={onUpdate}  // 클릭하면 UpdateAnswerToggle로 전환
            className="flex w-1/2 items-center justify-center gap-[8px] rounded-md bg-primary px-[20px] py-[12px]"
          >
            <span className="w-1/2 text-small18 font-medium tracking-[-0.022px] text-static-100">
              수정하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// UpdateAnswerToggle 컴포넌트
interface UpdateAnswerToggleProps {
  title: string;
  content: string;
}

export const UpdateAnswerToggle = ({ title, content }: UpdateAnswerToggleProps) => {
  return (
    <div className="flex w-full flex-col items-start rounded-b-md bg-neutral-100 rounded-b-md">
      <div className="flex w-full h-[56px] items-center gap-[12px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301997 1.66667 1.26425 -1.46309e-06 2.80385 -1.32849e-06L13.1962 -4.19966e-07C14.7358 -2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z" fill="#757BFF"/>
        </svg>
        <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
          {title}
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-[20px] p-[20px]">
        <div className="flex flex-col w-full items-start gap-[16px] self-stretch">
          <textarea className="flex justify-between w-full resize-none px-[20px] py-[14px] items-center rounded-sm border border-neutral-80 text-xsmall16 font-regular tracking-[-0.096px] text-neutral-40" rows={1}>
            {title}
          </textarea>
          <textarea className="flex px-[20px] py-[14px] w-full resize-none items-start gap-[10px] self-stretch border border-neutral-80 rounded-sm text-xsmall14 font-regular tracking-[-0.21px] text-neutral-40">
            {content}
          </textarea>
        </div>
        <button className="flex w-full px-[20px] py-[12px] rounded-md items-center gap-[8px] justify-center bg-primary">
          <span className="text-static-100 text-small18 font-medium tracking-[-0.022px]">
            수정완료
          </span>            
        </button>
      </div>
    </div>
  );
};