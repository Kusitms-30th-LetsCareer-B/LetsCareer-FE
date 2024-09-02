interface DdayChipProps {
  day: number;
}

export const DdayChip = ({ day }: DdayChipProps) => {
  return (
    <div className="bg-primary inline-flex h-[28px] w-[68px] items-center justify-center gap-[10px] rounded-sm px-[12px] py-[4px]">
      <div className="text-xsmall14 leading-20 text-center font-bold tracking-[-0.21px] text-static-100">
        D-{day}
      </div>
    </div>
  );
};

export const FinishChip = () => {
  return (
    <div className="inline-flex h-[28px] w-[68px] items-center justify-center gap-[10px] rounded-sm bg-neutral-60 px-[6px] py-[4px]">
      <div className="text-xsmall14 leading-20 text-center font-bold tracking-[-0.21px] text-static-100">
        마감
      </div>
    </div>
  );
};
