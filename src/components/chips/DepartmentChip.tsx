interface DepartmentChipProps {
  department: string;
}

export const DepartmentMediumChip = ({ department }: DepartmentChipProps) => {
  return (
    <div className="inline-flex h-[32px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[4px]">
      <div className="text-xsmall14 text-primary leading-20 text-center font-medium tracking-[-0.21px]">
        {department}
      </div>
    </div>
  );
};

export const DepartmentLargeChip = ({ department }: DepartmentChipProps) => {
  return (
    <div className="inline-flex h-[32px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[8px]">
      <div className="text-primary leading-20 text-center text-xsmall16 font-medium tracking-[-0.21px]">
        {department}
      </div>
    </div>
  );
};
