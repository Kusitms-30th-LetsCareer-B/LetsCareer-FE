/*** 칩스 매뉴얼
 * -----------------------------------------------------
 *** 채용 일정 칩스 종류
 *
 * 종류:
 * enum('START','FINISH','WRITTEN','INTERVIEW','OTHER')
 * 시작, 끝, 서류, 면접, 기타
 *
 * 실제 들어오는 Response 값:
 * 시, 끝, 서, 면, 기
 *
 * 각각 Default, Clicked, Hovered 상태별로 필요
 * 총 5*3 = 15개 칩스
 *
 * -----------------------------------------------------
 *** 기타 일정 칩스는 1종
 *
 * 각각 Default, Clicked, Hovered 상태별로 필요
 * 총 1*3 = 3개 칩스
 */
export const filterState = {
  START: "시",
  FINISH: "끝",
  WRITTEN: "서",
  INTERVIEW: "면",
  OTHER: "기",
};

interface CompanyDocumentChipProps {
  companyName: string;
  filter: string; // 서류, 시작, 종료 총 3가지 상태
  onClick?: () => void; // onClick을 선택적 속성으로 추가
}

interface CompanyChipProps {
  companyName: string;
  onClick?: () => void; // onClick을 선택적 속성으로 추가
}

interface PersonalChipProps {
  personalSchedule: string;
  onClick?: () => void; // onClick을 선택적 속성으로 추가
}

// 긴 일정의 경우 ... 처리를 위한 함수
import { getSplittedText } from "../../shared/hooks/useText";
const limit = 7;   // 글자수 제한 (7글자 넘으면 ... 처리)
const buttonWidth = 105; // 버튼 길이 일관


/* 재사용: 네모 박스 컴포넌트 */
// 기본/호버 상태 : bg-secondary-0, text-secondary-100
// 클릭 상태      : bg-secondary-100, text-secondary-0
const SquareBox = ({ filter, bg, txtColor }) => (
  //<div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs  text-xxsmall11 font-semibold text-secondary-0">
  <div
    className={`mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs text-xxsmall11 font-semibold ${bg} ${txtColor}`}
  >
    {filter}
  </div>
);

/* 제사용: 기업명 컴포넌트 */
// 기본/호버 상태 : text-secondary-100
// 클릭 상태      : text-secondary-0
const CompanyBox = ({ companyName, txtColor }) => (
  <div className={`flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7px] ${txtColor}`}>
    <span>
      {getSplittedText(companyName, limit)}
    </span>
  </div>
);


/** 시작 & 종료 & 서류 칩스 */
export const DefaultDocumentChip = ({
  companyName,
  filter, onClick
}: CompanyDocumentChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full">
        {filter !== filterState.FINISH ? (    
          // 시작 칩, 서류 칩      
          <div className="flex h-full items-center justify-start gap-[4px] bg-secondary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
            {/* 기업명 */}
            <CompanyBox
              companyName={companyName}
              txtColor="text-secondary-100"
            />
          </div>
          
        ) : (
          // 종료 칩의 경우 두 컴포의 위치가 바뀜, '끝' 네모 박스가 맨 뒤로 오게
          <div className="flex h-full items-center justify-between gap-[4px] bg-secondary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 기업명 */}
            <CompanyBox
              companyName={companyName}
              txtColor="text-secondary-100"
            />
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const HoveredDocumentChip = ({
  companyName,
  filter, onClick
}: CompanyDocumentChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-secondary-100"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full">
        {filter !== filterState.FINISH ? (
          <div className="flex h-full items-center justify-start gap-[4px] bg-secondary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
            {/* 기업명 */}
            <CompanyBox
              companyName={companyName}
              txtColor="text-secondary-100"
            />
          </div>
        ) : (
          // 종료 칩의 경우 두 컴포의 위치가 바뀜, '끝' 네모 박스가 맨 뒤로 오게
          <div className="flex h-full items-center justify-between gap-[4px] bg-secondary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 기업명 */}
            <CompanyBox
              companyName={companyName}
              txtColor="text-secondary-100"
            />
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const ClickedDocumentChip = ({
  companyName,
  filter,
  onClick,
}: CompanyDocumentChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-secondary-30" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full">
        {filter !== filterState.FINISH ? (
          <div className="flex h-full items-center justify-start gap-[4px] bg-secondary-100 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
            {/* 기업명 */}
            <CompanyBox companyName={companyName} txtColor="text-secondary-0" />
          </div>

        ) : (
          // 종료 칩의 경우 두 컴포의 위치가 바뀜, '끝' 네모 박스가 맨 뒤로 오게
          <div className="flex h-full items-center justify-between gap-[4px] bg-secondary-100 px-[6px]" style={{ width: `${buttonWidth}px` }}>
            {/* 기업명 */}
            <CompanyBox companyName={companyName} txtColor="text-secondary-0" />
            {/* 네모 박스 */}
            <SquareBox
              filter={filter}
              bg="bg-secondary-0"
              txtColor="text-secondary-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

/** 면접 칩스 */
export const DefaultInterviewChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-primary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-primary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-100 text-xxsmall11 font-semibold text-primary-0">
          면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold text-primary-100">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HoveredInterviewChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-primary-100"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="px flex h-full w-[4px] items-center justify-center bg-primary-100" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-primary-10 px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-100 text-xxsmall11 font-semibold text-primary-0">
          면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-100">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ClickedInterviewChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-primary-30" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-primary-100 px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-primary-0 text-xxsmall11 font-semibold text-primary-100">
          면
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-primary-0">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

/** 기타 칩스 */
export const DefaultOtherChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-normal" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-teritory-light px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-normal text-xxsmall11 font-semibold text-teritory-0">
          기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HoveredOtherChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs border-2 border-teritory-normal"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-normal" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-teritory-light px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-normal text-xxsmall11 font-semibold text-teritory-0">
          기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-normal">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ClickedOtherChip = ({ companyName, onClick }: CompanyChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-center overflow-hidden rounded-xxs"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 왼쪽 영역 */}
      <div className="flex h-full w-[4px] items-center justify-center bg-teritory-light" />

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start gap-[4px] bg-teritory-normal px-[6px]" style={{ width: `${buttonWidth}px` }}>
        {/* 네모 박스 */}
        <div className="mr-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-xxs bg-teritory-0 text-xxsmall11 font-semibold text-teritory-normal">
          기
        </div>
        {/* 기업명 */}
        <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-teritory-0">
          <span>
            {getSplittedText(companyName, limit)}
          </span>
        </div>
      </div>
    </div>
  );
};

/** 개인 일정 Chip */
export const DefaultPersonalChip = ({
  personalSchedule, onClick
}: PersonalChipProps) => {
  return (
    <div className="flex h-[24px] items-center justify-start rounded-xxs bg-neutral-90 px-[4px]" style={{ width: `${buttonWidth}px` }}
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-neutral-45" />

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45">
        <span>
            {getSplittedText(personalSchedule, limit)}
        </span>
      </div>
    </div>
  );
};

export const HoveredPersonalChip = ({
  personalSchedule, onClick
}: PersonalChipProps) => {
  return (
    /* border 추가 */
    <div className="inline-flex h-[24px] items-center justify-start rounded-xxs border-2 border-neutral-45 bg-neutral-90 px-[4px]" style={{ width: `${buttonWidth}px` }}
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-neutral-45" />

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-neutral-45">
        <span>
          {getSplittedText(personalSchedule, limit)}
        </span>
      </div>
    </div>
  );
};

export const ClickedPersonalChip = ({
  personalSchedule, onClick
}: PersonalChipProps) => {
  return (
    <div className="inline-flex h-[24px] items-center justify-start rounded-xxs bg-neutral-45 px-[4px]" style={{ width: `${buttonWidth}px` }}
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}
    >
      {/* 동그라미 박스 */}
      <div className="mr-[4px] flex h-[8px] w-[8px] items-center justify-start rounded-full bg-static-100" />

      {/* 개인일정 내용 */}
      <div className="flex items-center justify-center whitespace-nowrap text-xxsmall11 font-semibold tracking-[-0.7`px] text-static-100">
        <span>
          {getSplittedText(personalSchedule, limit)}
        </span>
      </div>
    </div>
  );
};
