import { Dispatch, SetStateAction } from "react";
import { useDropdown } from "../../../../shared/hooks/useDropdown";

interface StatusDeleteButtonProps {
  toggleDeleteMode: () => void;
}

interface DeleteIconProps {
  onClick: () => void;
}

export const StatusDeleteButton: React.FC<StatusDeleteButtonProps> = ({
  toggleDeleteMode,
}) => {
  return (
    <button
      className="flex h-[36px] cursor-pointer items-center justify-center gap-[10px] rounded-sm border border-neutral-80 bg-neutral-100 px-[20px] py-[12px]"
      onClick={toggleDeleteMode}
    >
      <span className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        목록 삭제
      </span>
    </button>
  );
};

export const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => {
  return (
    <div className="ml-[8px] flex flex-shrink-0 items-center justify-center rounded-full bg-primary-10">
      <button onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M15.375 6.625L6.625 15.375M6.625 6.625L15.375 15.375"
            stroke="#4D55F5"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

interface StatusDropdownProps {
  setSelectedStage: Dispatch<SetStateAction<string>>;
}

export const StatusDropdown = ({ setSelectedStage }: StatusDropdownProps) => {
  const { isOpen, selectedItem, toggleDropdown, selectItem, dropdownRef } =
    useDropdown();

  return (
    <div
      ref={dropdownRef}
      className="relative mr-[12px] inline-block text-left"
    >
      <button
        onClick={toggleDropdown}
        className="inline-flex h-[36px] items-center justify-center rounded-sm border border-neutral-80 bg-neutral-100 px-[16px] py-[6px] text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30 shadow-sm"
      >
        {selectedItem}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#989BA2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full rounded-md bg-static-100 py-[16px] shadow-lg">
          <div className="py-1">
            <a
              onClick={() => {
                selectItem("전체");
                setSelectedStage("전체");
              }}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              전체
            </a>
            <a
              onClick={() => {
                selectItem("서류");
                setSelectedStage("서류");
              }}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              서류
            </a>
            <a
              onClick={() => {
                selectItem("면접");
                setSelectedStage("면접");
              }}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              면접
            </a>
            <a
              onClick={() => {
                selectItem("기타");
                setSelectedStage("기타");
              }}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              기타
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const TodoDropdown = () => {
  const { isOpen, toggleDropdown, selectItem, dropdownRef } = useDropdown();

  return (
    <div ref={dropdownRef} className="flex-shrink-0">
      <button onClick={toggleDropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill="#5C5F66"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            fill="#5C5F66"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            fill="#5C5F66"
          />
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute -translate-x-2/3 transform rounded-md bg-static-100 py-[16px] shadow-lg">
          <div className="py-1">
            <a
              onClick={() => selectItem("서류")}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              일정 삭제
            </a>
            <a
              onClick={() => selectItem("면접")}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              내일 하기
            </a>
            <a
              onClick={() => selectItem("기타")}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              날짜 변경
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const RoutineDropdown = () => {
  const { isOpen, toggleDropdown, selectItem, dropdownRef } = useDropdown();

  return (
    <div ref={dropdownRef} className="flex-shrink-0">
      <button onClick={toggleDropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill="#5C5F66"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            fill="#5C5F66"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            fill="#5C5F66"
          />
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#5C5F66"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute -translate-x-2/3 transform rounded-md bg-static-100 py-[16px] shadow-lg">
          <div className="">
            <a
              onClick={() => selectItem("전체")}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              루틴 수정
            </a>
            <a
              onClick={() => selectItem("서류")}
              className="flex cursor-pointer px-[16px] py-[10px] text-xsmall14 font-medium text-neutral-30"
            >
              루틴 삭제
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

interface RecurringNoteProps {
  text: string;
  onClick: () => void;
}

export const WriteRecurringNoteButton = ({
  text,
  onClick,
}: RecurringNoteProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-sm border border-neutral-80 bg-static-100 px-[20px] py-[6px]"
    >
      <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {text}
      </span>
    </button>
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

interface RecruitmentDeleteButtonProps {
  companyName: string;
  onDelete: () => void;
  onCancel: () => void;
}

export const RecruitmentDeleteButton = ({
  companyName,
  onDelete,
  onCancel,
}: RecruitmentDeleteButtonProps) => {
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
          {companyName}에 대한 일정을 삭제하시겠습니까?
          <br />
          관련한 모든 내용이 삭제되고 한 번 삭제된 자료는 복구할 수 없습니다
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
