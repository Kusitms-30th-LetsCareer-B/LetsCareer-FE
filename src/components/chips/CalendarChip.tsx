interface CompanyChipProps {
  companyName: string;
}

interface PersonalChipProps {
  personalSchedule: string;
}

export const DefaultDocumentChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-secondary-10 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-secondary-100 text-xxsmall11 font-semibold text-secondary-0">
          서
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-100">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const DefaultInterviewChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-primary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-primary-10 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-100 text-xxsmall11 font-semibold text-primary-0">
          면
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-100">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const DefaultOtherChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-normal" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-teritory-light px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-normal text-xxsmall11 font-semibold text-teritory-0">
          기
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const HoveredDocumentChip = ({ companyName }: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-secondary-100">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-100" />

      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex h-full min-w-[76px] items-center justify-start gap-[4px] bg-secondary-10 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-secondary-100 text-xxsmall11 font-semibold text-secondary-0">
          서
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-100">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const HoveredInterviewChip = ({ companyName }: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-primary-100">
      {/* 왼쪽 영역 */}
      <div className="px flex h-full w-[4px] items-center justify-center bg-primary-100" />

      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex h-full min-w-[76px] items-center justify-start gap-[4px] bg-primary-10 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-100 text-xxsmall11 font-semibold text-primary-0">
          면
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-100">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const HoveredOtherChip = ({ companyName }: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-teritory-normal">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-normal" />

      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex h-full min-w-[76px] items-center justify-start gap-[4px] bg-teritory-light px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-normal text-xxsmall11 font-semibold text-teritory-0">
          기
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const ClickedDocumentChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-0" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-secondary-100 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-secondary-0 text-xxsmall11 font-semibold text-secondary-100">
          서
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-0">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const ClickedInterviewChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-primary-0" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-primary-100 px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-0 text-xxsmall11 font-semibold text-primary-100">
          면
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-0">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export const ClickedOtherChip = ({ companyName }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs">
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-0" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full min-w-[80px] items-center justify-start gap-[4px] bg-teritory-normal px-[6px]">
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-0 text-xxsmall11 font-semibold text-teritory-normal">
          기
        </div>
        {/* 기업명 */}
        <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-0">
          <span>{companyName}</span>
        </div>
      </div>
    </div>
  );
};

/** 개인 일정 Chip */
export const DefaultPersonalChip = ({
  personalSchedule,
}: PersonalChipProps) => {
  return (
    <div className="inline-flex h-[24px] min-w-[84px] items-center justify-start rounded-xxs bg-neutral-90 px-[4px]">
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-secondary-light" />

      {/* 개인일정 내용 */}
      <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45">
        <span>{personalSchedule}</span>
      </div>
    </div>
  );
};

export const HoveredPersonalChip = ({
  personalSchedule,
}: PersonalChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] min-w-[84px] items-center justify-start rounded-xxs border-2 border-neutral-45 bg-neutral-90 px-[4px]">
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-secondary-light" />

      {/* 개인일정 내용 */}
      <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45">
        <span>{personalSchedule}</span>
      </div>
    </div>
  );
};

export const ClickedPersonalChip = ({
  personalSchedule,
}: PersonalChipProps) => {
  return (
    <div className="inline-flex h-[24px] min-w-[84px] items-center justify-start rounded-xxs bg-neutral-45 px-[4px]">
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-secondary-light" />

      {/* 개인일정 내용 */}
      <div className="mr-[12px] flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-static-100">
        <span>{personalSchedule}</span>
      </div>
    </div>
  );
};
