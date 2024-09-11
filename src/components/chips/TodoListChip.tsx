import selectionButtonIcon from "../../shared/assets/caretDownMD.png";

import { getSplittedText } from "../../shared/hooks/useText";

interface CompanyNameProps {
  companyName: string;
}
interface CompanyStatusProps {
  companyName: string;
  status: string;
}
interface CompanyContentsProps {
  companyName: string;
  contents: string;
}
interface PersonalChipProps {
  contents: string;
  //onDelete: () => void; // 부모로부터 전달받는 삭제 핸들러
}

export const CompanyNameChip = ({ companyName }: CompanyNameProps) => {
  return (
    <div className="inline-flex h-[28px] items-center justify-center rounded-xxs bg-primary-10 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary-100">
        {companyName}
      </div>
    </div>
  );
};

export const CompanyNameSelectionChip = () => {
  return (
    <div className="inline-flex h-[28px] items-center justify-center rounded-xxs bg-primary-10 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary-100">
        기업을 선택해주세요
      </div>
      <img src={selectionButtonIcon} className="px-2" />
    </div>
  );
};

// 서류 스케줄
// status: 시작 or 마감
export const DocumentScheduleChip = ({
  companyName,
  status,
}: CompanyStatusProps) => {
  return (
    <div className="inline-flex h-[40px] items-center justify-center">
      {/* 왼쪽 영역 */}
      {/* 줄무늬 */}
      <div className="flex h-full w-[6px] items-center justify-center rounded-l-xs bg-secondary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start rounded-r-xs bg-secondary-10 px-[10px]">
        {/* 내용 */}
        <div className="mr-[12px] flex items-center justify-center text-xsmall14 font-semibold tracking-[-0.21px] text-secondary-100">
          {companyName} 서류 {status}
        </div>
      </div>
    </div>
  );
};

// 면접 스케줄
export const InterviewScheduleChip = ({ companyName }: CompanyNameProps) => {
  return (
    <div className="inline-flex h-[40px] items-center justify-center">
      {/* 왼쪽 영역 */}
      {/* 줄무늬 */}
      <div className="flex h-full w-[6px] items-center justify-center rounded-l-xs bg-primary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start rounded-r-xs bg-primary-10 px-[10px]">
        {/* 내용 */}
        <div className="mr-[12px] flex items-center justify-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary-100">
          {companyName} 면접
        </div>
      </div>
    </div>
  );
};

// 기타 스케줄
// contents: 직무테스트, 인적성, ...
export const OtherScheduleChip = ({
  companyName,
  contents,
}: CompanyContentsProps) => {
  return (
    <div className="inline-flex h-[40px] items-center justify-center">
      {/* 왼쪽 영역 */}
      {/* 줄무늬 */}
      <div className="flex h-full w-[6px] items-center justify-center rounded-l-xs bg-teritory-normal" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start rounded-r-xs bg-teritory-light px-[10px]">
        {/* 내용 */}
        <div className="mr-[12px] flex items-center justify-center text-xsmall14 font-semibold tracking-[-0.21px] text-teritory-normal">
          {companyName} {contents == "" ? "기타" : contents}
        </div>
      </div>
    </div>
  );
};

// 개인 스케줄
export const PersonalScheduleChip = ({
  contents
}: PersonalChipProps) => {
  return (
    <div className="inline-flex h-[40px] items-center justify-start rounded-xs bg-neutral-90">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-start px-[16px]">
        {/* 동그라미 무늬 */}
        <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-neutral-45" />

        {/* 개인일정 내용 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap px-[2px] text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-45">
          <span>{contents}</span>
        </div>
      </div>
    </div>
  );
};
/*
export const PersonalScheduleChip = ({
  contents
}: PersonalChipProps) => {
  return (
    <div className="inline-flex h-[40px] items-center justify-start rounded-xs bg-neutral-90">
      {/* 왼쪽 영역 *
      <div className="flex items-center justify-start px-[16px]">
        {/* 동그라미 무늬 *
        <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-neutral-45" />

        {/* 개인일정 내용 *
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap px-[2px] text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-45">
          <span>{contents}</span>
        </div>
      </div>

      {/* 오른쪽 영역 *
      <div className="flex items-center justify-start">
        {/* 마이너스 버튼 *
        <img
          src={deletionButtonIcon}
          //onClick={onDelete}
          alt="Delete"
          className="cursor-pointer px-[10px]"
        />
      </div>
    </div>
  );
};
*/


/////////////////////////////////////////////////////////////////////////////
// 수정 가능한 개인 스케줄 칩
import React, { useState } from 'react';
import { updatePersonalSchedule, deletePersonalSchedule } from '../../pages/Calendar/api/personalScheduleApiService'; // API 함수들 가져오기


// 삭제 버튼 이미지
//import deletionButtonIcon from "../../shared/assets/removeMinus.png";
import deletionButtonIcon from '../../shared/assets/personal-todo-delete.png';

interface PersonalChipEditableProps {
  personalScheduleId: number;
  contents: string;
  onScheduleUpdated: () => void; // 스케줄 업데이트 후 호출될 함수
  onScheduleDeleted: () => void; // 스케줄 삭제 후 호출될 함수
}

export const PersonalScheduleChipEditable: React.FC<PersonalChipEditableProps> = ({
  personalScheduleId,
  contents,
  onScheduleUpdated,
  onScheduleDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(contents);
  
  // 수정 버튼(앞에 동그라미) 클릭 시 호출되는 함수
  const handleEditClick = () => {
    // 수정 모드에서 저장하려는 경우 handleSaveClick 호출
    if (isEditing) {
      handleSaveClick(); // 수정 내용 저장
    }

    setIsEditing(!isEditing); // 토글 기능
  };

  // 수정 완료 시 호출되는 함수
  const handleSaveClick = async () => {
    // 만약 개인일정 내용이 빈 칸이면 띄우는 내용
    if (newContent.trim() === '') {
      alert('개인 일정을 입력하세요');
      return;
    }

    try {
      // 수정 API 호출 
      await updatePersonalSchedule({ personalScheduleId, content: newContent });
      setIsEditing(false);
      onScheduleUpdated(); // 부모 컴포넌트에서 스케줄을 다시 불러오도록 호출

    } catch (error) {
      console.error('개인일정 수정 중 오류 발생:', error);
    }
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteClick = async () => {
    try {
      // 삭제 API 호출 
      await deletePersonalSchedule({ personalScheduleId });
      onScheduleDeleted(); // 부모 컴포넌트에서 스케줄을 다시 불러오도록 호출
    } catch (error) {
      console.error('개인일정 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div key={personalScheduleId} className="flex justify-between h-[40px] min-w-[210px] items-center justify-start rounded-xs bg-neutral-90">
      {/** 우측 컴포넌트 */}
      <div className="ml-[10px] flex items-center justify-start">
        {/* 앞에 동그라미 토글버튼 */}
        {/* 동그라미 버튼 클릭 시 수정 모드 전환 */}
        <div
          className={`mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full cursor-pointer ${
            isEditing ? 'bg-secondary-100' : 'bg-neutral-45'
          }`}
          onClick={handleEditClick}
        />

        {/* 개인 일정 텍스트 */}
        <div className="flex items-center justify-center whitespace-nowrap px-[2px] text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-45">
          {isEditing ? (
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="border py-1 w-[120px]"
              placeholder="개인 일정을 입력하세요"
            />
          ) : (
            /** contents가 9자 이상일 때 앞의 9자만 보여주고 나머지는 "..."으로 출력 */
            <span>
              {getSplittedText(contents, 9)}
            </span>
          )}
        </div>
      </div>

      
      
      {/** 좌측 컴포넌트 */}
      <div className="flex items-center justify-center text-center h-[30px] w-[30px] px-[10px] mr-[12px]">
        {/** 저장 버튼 -> 앞에 토글 녀석이 해당 기능을 해주기로 함 */}
        {/*
        {isEditing ? (
          <button onClick={handleSaveClick} className="cursor-pointer px-[10px]">
            저장
          </button>
        ) : null}
        */}

        {/** 삭제 버튼 -> 이미지 */}
        <img
            src={deletionButtonIcon}
            onClick={handleDeleteClick}
            alt="Delete"
            className="cursor-pointer h-full w-full object-contain"
          />{/*이미지 크기를 부모에 고정해서 화면 비율애 따라 크기가 달라지지않도록 함*/}
        </div>
    </div>
  );
};
