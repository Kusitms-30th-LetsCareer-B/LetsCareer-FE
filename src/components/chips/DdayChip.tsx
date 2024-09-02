interface DdayChipProps {
  day: number;
  schedule: string;
}

export const DdayChip = ({ schedule, day }: DdayChipProps) => {
  return (
    <div className="inline-flex h-[28px] items-center justify-center gap-[10px] rounded-sm bg-primary px-[12px] py-[4px]">
      <div className="whitespace-nowrap text-center text-xsmall14 font-bold tracking-[-0.21px] text-static-100">
        {schedule && (
          <span>
            {schedule}&nbsp;
        </span>
        )}
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
