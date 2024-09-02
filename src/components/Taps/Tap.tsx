interface TapProps {
  tapType: string;
}

export const BasicTap = ({ tapType }: TapProps) => {
  return (
    <div className="inline-flex h-[32px] items-center justify-center rounded-sm px-[12px] py-[6px]">
      <div className="text-xsmall14 leading-20 text-center font-semibold tracking-[-0.21px] text-neutral-45">
        {tapType}
      </div>
    </div>
  );
};

export const ColoredTap = ({ tapType }: TapProps) => {
  return (
    <div className="inline-flex h-[32px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[6px]">
      <div className="text-xsmall14 text-primary leading-20 text-center font-semibold tracking-[-0.21px]">
        {tapType}
      </div>
    </div>
  );
};
