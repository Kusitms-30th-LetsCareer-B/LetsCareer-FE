interface StatusChipProp {
  onClick?: () => void; // onClick을 선택적 속성으로 추가: 관련 기업 일정 페이지로 전환 이벤트
}

export const PrepareDocumentChip = ({ onClick }: StatusChipProp) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-secondary-10 px-[12px] py-[8px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}>
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-secondary">
        서류 준비중
      </div>
    </div>
  );
};

export const PassDocumentChip = ({ onClick }: StatusChipProp) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-neutral-95 px-[12px] py-[8px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}>
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-secondary">
        서류 합격
      </div>
    </div>
  );
};

export const PrepareInterviewChip = ({ onClick }: StatusChipProp) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[8px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}>
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
        면접 준비중
      </div>
    </div>
  );
};

export const PassInterviewChip = ({ onClick }: StatusChipProp) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-neutral-95 px-[12px] py-[8px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}>
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
        면접 합격
      </div>
    </div>
  );
};

interface OtherStatusChipProps {
  contents: string;
  onClick?: () => void; // onClick을 선택적 속성으로 추가: 관련 기업 일정 페이지로 전환 이벤트
}

export const OtherStatusChip = ({ contents, onClick }: OtherStatusChipProps) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-teritory-light px-[12px] py-[8px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          onClick();
        }}>
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-teritory-normal">
        {contents}
      </div>
    </div>
  );
};
