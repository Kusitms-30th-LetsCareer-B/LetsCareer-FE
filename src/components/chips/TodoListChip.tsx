import selectionButtonIcon from "../../shared/assets/caretDownMD.png";
import deletionButtonIcon from "../../shared/assets/removeMinus.png";

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
    <div className="inline-flex h-[40px] items-center justify-center ">
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
          {companyName} {contents==""? "기타" : contents}
        </div>
      </div>
    </div>
  );
};

// 개인 스케줄
export const PersonalScheduleChip = ({
  contents,
  //onDelete,
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

      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start">
        {/* 마이너스 버튼 */}
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
