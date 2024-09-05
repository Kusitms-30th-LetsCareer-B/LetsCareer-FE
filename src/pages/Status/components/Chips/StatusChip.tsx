interface StatusProps {
  classification: string;
  num: number;
}

export const UserStatusChip = ({ classification, num }: StatusProps) => {
  return (
    <div className="flex items-center justify-between rounded-sm bg-neutral-95 px-[12px] py-[8px]">
      <span className="w-[44px] text-xsmall14 font-medium tracking-[-0.21px] text-neutral-30">
        {classification}
      </span>
      <div className="flex w-[32px] flex-col items-end justify-center text-xsmall16 font-bold tracking-[-0.096px] text-neutral-0">
        {num}
      </div>
    </div>
  );
};

export const ProgressChip = () => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-sm bg-primary px-[12px] py-[4px]">
        <span className="text-xsmall14 font-medium tracking-[-0.21px] text-static-100">
          진행중
        </span>
    </div>
  );
};

export const SuccessChip = () => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-sm bg-secondary px-[12px] py-[4px]">
      <span className="text-xsmall14 font-medium tracking-[-0.21px] text-static-100">
        합격
      </span>
    </div>
  );
};

export const FailedChip = () => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-sm bg-teritory-normal px-[12px] py-[4px]">
      <span className="text-xsmall14 font-medium tracking-[-0.21px] text-static-100">
        불합격
      </span>
    </div>
  );
};
