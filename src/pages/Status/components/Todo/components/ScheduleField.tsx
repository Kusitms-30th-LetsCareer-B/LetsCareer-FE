import { useState } from "react";

// 아이콘 파일
import todoCheckedIcon from "../../../../../shared/assets/todo-check.png";
import todoBlankedIcon from "../../../../../shared/assets/todo-no-check.png";
import routineCheckedIcon from "../../../../../shared/assets/todo-check.png";
import modifyIcon from "../../../../../shared/assets/routine-setting.png"
import routineIcon from "../../../../../shared/assets/routine.png"
import deleteIcon from "../../../../../shared/assets/routine-delete.png"

interface TodoCheckBoxProps {
    checked: boolean;
    content: string;  // 투두/루틴 내용 표시를 위한 prop
    onCheckChange: () => void;  // 체크 상태 여부 변경 이벤트
    onOpenSettings: () => void; // 부모로부터 받는 설정창 열기 이벤트
    onDelete: () => void; // 삭제 이벤트를 위한 함수
}

export const TodoCheckBox = ({checked, content, onCheckChange, onOpenSettings, onDelete}: TodoCheckBoxProps) => {

    return (
        <div className="flex justify-between py-2">
            {/** 좌측 */}
            <div className="flex jusify-start items-center space-x-3">
                {/** 체크 박스: 완료 여부 */}
                <label className="custom-checkbox flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onCheckChange}
                        className="hidden"
                    />
                    {checked ? <img src={todoCheckedIcon} className="w-[20px] h-[20px]"/> : <img src={todoBlankedIcon} className="w-[20px] h-[20px]" />}
                </label>

                {/** 투두/루틴 내용 추가 */}
                <span className="text-small18 text-neutral-30">{content}</span>
            </div>

            
            {/** 우측 */}
            <div className="flex jusify-end gap-3 px-2">
                {/** 설정 버튼(수정 모달 창 띄우기 버튼) */}
                <button onClick={onOpenSettings} className="w-[20px] h-[20px]">
                    {/*⚙️*/}
                    <img src={modifyIcon} className="w-[20px] h-[20px] "/>
                </button>

                {/** 삭제 버튼 */}
                <button onClick={onDelete} className="w-[20px] h-[20px] ">
                    <img src={deleteIcon} className="w-[15px] h-[15px] "/>
                </button>
            </div>
        </div>
    );
}

export const RoutineCheckBox = ({checked, content, onCheckChange, onOpenSettings, onDelete}: TodoCheckBoxProps) => {
    
    return (
        <div className="flex justify-between py-2">
            {/** 좌측 */}
            <div className="flex jusify-start items-center space-x-3">
                {/** 체크 박스: 완료 여부 */}
                <label className="custom-checkbox flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onCheckChange}
                        className="hidden"
                    />
                    {checked ? <img src={routineCheckedIcon} className="w-[20px] h-[20px]"/> : <img src={todoBlankedIcon} className="w-[20px] h-[20px]"/>}
                </label>
                
                {/** 투두/루틴 내용 추가 */}
                <span className="text-small18 text-neutral-30">{content}</span>
            </div>


            {/** 우측 */}
            <div className="flex jusify-end gap-3 px-2">
                {/** 루틴 내용 */}
                <div className="flex justify-center items-center text-center text-secondary-100 text-xsmall16 gap-10">
                    매일
                </div>

                {/** 루틴 아이콘 */}
                <img src={routineIcon} className="w-[25px] h-[25px] "/>

                {/** 설정 버튼(수정 모달 창 띄우기 버튼) */}
                <button onClick={onOpenSettings} className="w-[20px] h-[20px]">
                    {/*⚙️*/}
                    <img src={modifyIcon} className="w-[20px] h-[20px] "/>
                </button>
                
                {/** 삭제 버튼 */}
                <button onClick={onDelete} className="w-[20px] h-[20px]">
                    <img src={deleteIcon} className="w-[15px] h-[15px] "/>
                </button>
            </div>
        </div>
    );
}