export const PrepareDocumentChip = () => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-secondary-10 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-secondary">
        서류 준비중
      </div>
    </div>
  );
};

export const PassDocumentChip = () => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-neutral-95 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-secondary">
        서류 합격
      </div>
    </div>
  );
};

export const PrepareInterviewChip = () => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
        면접 준비중
      </div>
    </div>
  );
};

export const PassInterviewChip = () => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-neutral-95 px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
        면접 합격
      </div>
    </div>
  );
};

interface OtherStatusChipProps {
  contents: string;
}

export const OtherStatusChip = ({ contents }: OtherStatusChipProps) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-center rounded-sm bg-teritory-light px-[12px] py-[8px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-teritory-normal">
        {contents}
      </div>
    </div>
  );
};
