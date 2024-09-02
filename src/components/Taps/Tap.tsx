interface TapProps {
  tapType: string;
}

export const BasicTap = ({ tapType }: TapProps) => {
  return (
    <button className="inline-flex h-[32px] items-center justify-center rounded-sm px-[12px] py-[6px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-45">
        {tapType}
      </div>
    </button>
  );
};

export const ColoredTap = ({ tapType }: TapProps) => {
  return (
    <button className="inline-flex h-[32px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[6px]">
      <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
        {tapType}
      </div>
    </button>
  );
};
