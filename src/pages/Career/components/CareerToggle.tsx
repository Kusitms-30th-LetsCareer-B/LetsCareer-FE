import axios from "axios";
import { useEffect, useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface HideAnswerToggleProps {
  title: string;
  onToggle: () => void; 
}

export const HideAnswerToggle = ({ title, onToggle }: HideAnswerToggleProps) => {
  return (
    <div className="flex h-[56px] w-full items-center gap-[12px] rounded-sm border border-neutral-80 px-[20px] py-[14px]">
      <svg
        onClick={onToggle} 
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


interface ShowAnswerToggleProps {
  title: string;
  content: string;
  skillId: string; 
  onToggle: () => void;  
  onUpdate: () => void;  
  onDeleteSuccess: () => void; 
}

export const ShowAnswerToggle = ({ title, content, skillId, onToggle, onUpdate, onDeleteSuccess }: ShowAnswerToggleProps) => {
    const handleDelete = async () => {
        try {
          await axios.delete(`${BASE_URL}/careers/special-skills?skillId=${skillId}`);
          alert("필살기 경험이 성공적으로 삭제되었습니다.");
          onDeleteSuccess(); // 삭제 성공 후 콜백 호출 (데이터 갱신)
        } catch (error) {
          console.error("삭제 중 오류가 발생했습니다.", error);
          alert("삭제 중 오류가 발생했습니다.");
        }
      };
  
    return (
    <div className="flex w-full flex-col rounded-b-md bg-neutral-100">
      <div className="flex h-[56px] items-center gap-[12px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
        <svg
          onClick={onToggle}
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
          <button onClick={handleDelete} className="flex w-1/2 items-center justify-center gap-[8px] rounded-md bg-neutral-90 px-[20px] py-[12px]">
            <span className="text-small18 font-medium tracking-[-0.022px] text-neutral-45">
              삭제하기
            </span>
          </button>
          <button
            onClick={onUpdate} 
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

interface UpdateAnswerToggleProps {
  title: string;
  content: string;
  onSave: (newTitle: string, newContent: string) => void;
}

interface UpdateAnswerToggleProps {
    title: string;
    content: string;
    onSave: (newTitle: string, newContent: string) => void;
  }
  
export const UpdateAnswerToggle = ({ title, content, onSave }: UpdateAnswerToggleProps) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
  
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
  
    const handleSave = () => {
      onSave(newTitle, newContent);
    };
  
    // 텍스트 입력 시 높이 자동 조정 함수
    const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
  
    useEffect(() => {
      // 각 textarea 높이를 조정
      autoResizeTextarea(titleRef.current);
      autoResizeTextarea(contentRef.current);
    }, []);
  
    return (
      <div className="flex w-full flex-col items-start rounded-b-md bg-neutral-100">
        <div className="flex w-full h-[56px] items-center gap-[12px] rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
            <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301997 1.66667 1.26425 0 2.80385 0L13.1962 0C14.7358 0 15.698 1.66667 14.9282 3L9.73205 12Z" fill="#757BFF" />
          </svg>
          <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
            {newTitle}
          </span>
        </div>
        <div className="flex flex-col w-full items-start gap-[20px] p-[20px]">
          <div className="flex flex-col w-full items-start gap-[16px]">
            <textarea
              ref={titleRef}
              rows={1}
              className="w-full resize-none px-[20px] py-[14px] rounded-sm border border-neutral-80 overflow-hidden text-xsmall16 font-regular tracking-[-0.096px] text-neutral-40"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                autoResizeTextarea(e.target);
              }}
            />
            <textarea
              ref={contentRef}
              className="w-full resize-none px-[20px] py-[14px] rounded-sm border border-neutral-80 overflow-hidden text-xsmall14 font-regular tracking-[-0.21px] text-neutral-40"
              value={newContent}
              onChange={(e) => {
                setNewContent(e.target.value);
                autoResizeTextarea(e.target);
              }}
            />
          </div>
          <button onClick={handleSave} className="w-full rounded-md bg-primary px-[20px] py-[12px] text-white">
            수정완료
          </button>
        </div>
      </div>
    );
  }