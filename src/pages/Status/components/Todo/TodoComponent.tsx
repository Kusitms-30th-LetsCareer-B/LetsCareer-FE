
import { useState } from "react";

import DateNavigation from "../../../../components/DateNavigation"

import { useDropdown } from "../../../../shared/hooks/useDropdown";

interface TodoItem {
    text: string;
    checked: boolean;
}

/** 유저명, 선택한 기업정보는 부모로부터 받아오기 */
interface TodoComponentProps {
    userId: number;
    recruitmentId: number;
}
const TodoComponent = () => {
    // 기업별 투두 날짜, 초기에는 오늘 날짜로 렌더링
    const [selectedDate, setSelectedDate] = useState(new Date());

    // test....
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
        <>
        {/** 전체 보더 박스 */}
        <div className=" min-w-[500px] rounded-md border border-neutral-80 p-[24px] ">
            {/** 헤더 */}
            <div className="flex justify-between items-center text-medium24 font-semibold tracking-[-0.022px] text-neutral-30 mb-4">
                {/** 타이틀 */}
                <div className="justify-center items-center">
                    오늘의 <span className="text-primary-100">{"company"}</span> Todo
                </div>
                <div className="justify-center items-center">
                    <DateNavigation selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                </div>
            </div>
        </div>

        {/** */}
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
        </>
    );
}

export default TodoComponent;




// Design
// 버튼들 . . .
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