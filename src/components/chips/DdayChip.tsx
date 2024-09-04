interface DdayChipProps {
  day: number;
  schedule: string;
}

interface Ddayh32ChipProps {
  day: number;
}

export const DdayChip = ({ schedule, day }: DdayChipProps) => {
  return (
    <div className="inline-flex h-[28px] items-center justify-center gap-[10px] rounded-sm bg-primary px-[12px] py-[4px]">
      <div className="whitespace-nowrap text-center text-xsmall14 font-bold tracking-[-0.21px] text-static-100">
        {schedule && <span>{schedule}&nbsp;</span>}
        D-{day}
      </div>
    </div>
  );
};

export const Ddayh32Chip = ({ day }: Ddayh32ChipProps) => {
  return (
    <div className="flex h-[32px] items-center justify-center gap-[10px] rounded-sm bg-primary px-[12px] py-[4px]">
      <div className="text-center text-xsmall16 font-semibold tracking-[-0.096px] text-static-100">
        D-{day}
      </div>
    </div>
  );
};

export const FinishChip = () => {
  return (
    <div className="inline-flex h-[28px] w-[68px] items-center justify-center gap-[10px] rounded-sm bg-neutral-60 px-[6px] py-[4px]">
      <div className="text-center text-xsmall14 font-bold tracking-[-0.21px] text-static-100">
        마감
      </div>
    </div>
  );
};

export const Finishh32Chip = () => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-sm bg-neutral-60 px-[12px] py-[4px]">
      <div className="text-small16 text-center font-medium tracking-[-0.096px] text-static-100">
        종료
      </div>
    </div>
  );
};
