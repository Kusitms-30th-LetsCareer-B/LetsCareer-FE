import { useState } from "react";

// 아이콘 파일
import todoCheckedIcon from "../../../../../shared/assets/todo-check.png";
import todoBlankedIcon from "../../../../../shared/assets/todo-no-check.png";
import routineCheckedIcon from "../../../../../shared/assets/todo-check.png";
import modifyIcon from "../../../../../shared/assets/routine-setting.png"
import routineIcon from "../../../../../shared/assets/routine.png"

interface TodoCheckBoxProps {
    checked: boolean;
    content: string;  // 투두/루틴 내용 표시를 위한 prop
    onChange: () => void;
    onOpenSettings: () => void; // 부모로부터 받는 설정창 열기 이벤트
    onDelete: () => void; // 삭제 이벤트를 위한 함수
}

export const TodoCheckBox = ({checked, content, onChange, onOpenSettings, onDelete}: TodoCheckBoxProps) => {
    // 수정/삭제 모달을 위한 상태
    const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
    const openOptionModal = () => {
        setIsOptionModalOpen(true);
    };
    const closeOptionModal = () => {
        setIsOptionModalOpen(false);
    };

    return (
        <div className="flex justify-between">
            <div className="flex jusify-start items-center space-x-2">
                {/** 체크 박스: 완료 여부 */}
                <label className="custom-checkbox flex cursor-pointer items-center py-[3px]">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="hidden"
                    />
                    {checked ? <img src={todoCheckedIcon} className="w-[20px] h-[20px]"/> : <img src={todoBlankedIcon} className="w-[20px] h-[20px]" />}
                </label>

                {/** 투두/루틴 내용 추가 */}
                <span>{content}</span>
            </div>

            
            {/** 설정 버튼 */}
            <div className="flex jusify-end px-2">
                <button onClick={onOpenSettings} className="w-[20px] h-[20px] text-blue-500 hover:text-blue-700">
                    {/*⚙️*/}
                    <img src={modifyIcon} className="w-[20px] h-[20px] "/>
                </button>
            </div>
        </div>
    );
}

export const RoutineCheckBox = ({checked, content, onChange, onOpenSettings, onDelete}: TodoCheckBoxProps) => {
    // 수정/삭제 모달을 위한 상태
    const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
    const openOptionModal = () => {
        setIsOptionModalOpen(true);
    };
    const closeOptionModal = () => {
        setIsOptionModalOpen(false);
    };
    
    return (
        <div className="flex justify-between">
            <div className="flex jusify-start items-center space-x-2">
                {/** 체크 박스: 완료 여부 */}
                <label className="custom-checkbox flex cursor-pointer items-center py-[3px]">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="hidden"
                    />
                    {checked ? <img src={routineCheckedIcon} className="w-[20px] h-[20px]"/> : <img src={todoBlankedIcon} className="w-[20px] h-[20px]"/>}
                </label>
                
                {/** 투두/루틴 내용 추가 */}
                <span>{content}</span>
            </div>

            {/** 설정 버튼 */}
            <div className="flex jusify-end gap-3 px-2">
                <img src={routineIcon} className="w-[25px] h-[25px] "/>
                <button onClick={onOpenSettings} className="w-[20px] h-[20px] text-blue-500 hover:text-blue-700">
                    {/*⚙️*/}
                    <img src={modifyIcon} className="w-[20px] h-[20px] "/>
                </button>
            </div>
        </div>
    );
}