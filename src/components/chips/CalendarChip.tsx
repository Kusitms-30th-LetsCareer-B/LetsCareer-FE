interface CompanyChipProps {
  companyName:  string;
}

interface PersonalChipProps {
  personalSchedule:  string;
}

export const DefaultDocumentChip = ({companyName}: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-secondary-100"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-secondary-10 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-secondary-100 rounded-xxs text-secondary-0 text-xxsmall11 font-semibold mr-[1px]">
            서
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-100 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const DefaultInterviewChip = ({companyName}: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-primary-100"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-primary-10 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-primary-100 rounded-xxs text-primary-0 text-xxsmall11 font-semibold mr-[1px]">
            면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-100 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const DefaultOtherChip = ({companyName}: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-teritory-normal"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-teritory-light px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-teritory-normal rounded-xxs text-teritory-0 text-xxsmall11 font-semibold mr-[1px]">
            기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};


export const HoveredDocumentChip = ({companyName}: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden border-2 border-secondary-100">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-secondary-100"/>
      
      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex items-center justify-start min-w-[76px] h-full bg-secondary-10 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-secondary-100 rounded-xxs text-secondary-0 text-xxsmall11 font-semibold mr-[1px]">
            서
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-100 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HoveredInterviewChip = ({companyName}: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden border-2 border-primary-100">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-primary-100 px"/>
      
      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex items-center justify-start min-w-[76px] h-full bg-primary-10 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-primary-100 rounded-xxs text-primary-0 text-xxsmall11 font-semibold mr-[1px]">
            면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-100 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HoveredOtherChip = ({companyName}: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden border-2 border-teritory-normal">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-teritory-normal"/>
      
      {/* 오른쪽 영역, border size만큼 min-w 줄임 */}
      <div className="flex items-center justify-start min-w-[76px] h-full bg-teritory-light px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-teritory-normal rounded-xxs text-teritory-0 text-xxsmall11 font-semibold mr-[1px]">
            기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};


export const ClickedDocumentChip = ({companyName}: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-secondary-0"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-secondary-100 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-secondary-0 rounded-xxs text-secondary-100 text-xxsmall11 font-semibold mr-[1px]">
            서
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-secondary-0 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ClickedInterviewChip = ({companyName}: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-primary-0"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-primary-100 px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-primary-0 rounded-xxs text-primary-100 text-xxsmall11 font-semibold mr-[1px]">
            면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-0 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ClickedOtherChip = ({companyName}: CompanyChipProps) => {
  return (
    
    <div className="inline-flex h-[24px] items-center justify-center rounded-xxs overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex items-center justify-center w-[4px] h-full bg-teritory-0"/>
      
      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start min-w-[80px] h-full bg-teritory-normal px-[6px] gap-[4px]">
        {/* 네모 박스 */}
        <div className="flex items-center justify-center w-[16px] h-[16px] bg-teritory-0 rounded-xxs text-teritory-normal text-xxsmall11 font-semibold mr-[1px]">
            기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-0 mr-[12px]">
          <span>
              {companyName}
          </span>
        </div>
      </div>
    </div>
  );
};



/** 개인 일정 Chip */
export const DefaultPersonalChip = ({personalSchedule}: PersonalChipProps) => {
  return (
    <div className="inline-flex min-w-[84px] h-[24px] items-center justify-start rounded-xxs bg-neutral-90 px-[4px] ">
      {/* 동그라미 박스 */}
      <div className="flex items-center justify-start w-[8px] h-[8px] bg-neutral-45 rounded-full mr-[4px]"/>

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45 mr-[12px]">
        <span>
            {personalSchedule}
        </span>
      </div>
    </div>
  );
};

export const HoveredPersonalChip = ({personalSchedule}: PersonalChipProps) => {
  return (
    
    /* border 추가 */
    <div className="inline-flex min-w-[84px] h-[24px] items-center justify-start rounded-xxs bg-neutral-90 px-[4px] border-2 border-neutral-45">
      {/* 동그라미 박스 */}
      <div className="flex items-center justify-start w-[8px] h-[8px] bg-neutral-45 rounded-full mr-[4px]"/>

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45 mr-[12px]">
        <span>
            {personalSchedule}
        </span>
      </div>
    </div>
  );
};

export const ClickedPersonalChip = ({personalSchedule}: PersonalChipProps) => {
  return (
    <div className="inline-flex min-w-[84px] h-[24px] items-center justify-start rounded-xxs bg-neutral-45 px-[4px] ">
      {/* 동그라미 박스 */}
      <div className="flex items-center justify-start w-[8px] h-[8px] bg-static-100 rounded-full mr-[4px]"/>

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-static-100 mr-[12px]">
        <span>
            {personalSchedule}
        </span>
      </div>
    </div>
  );
};