interface DepartmentChipProps {
  department: string;
}

interface TapProps {
  tapType: string;
}

interface ExperienceProps {
  experience: string;
}

export const DepartmentChip = ({ department }: DepartmentChipProps) => {
  return (
    <div className="inline-flex h-[28px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[4px]">
      <div className="leading-20 text-center text-xsmall14 font-medium tracking-[-0.21px] text-primary">
        {department}
      </div>
    </div>
  );
};

export const ColoredExperienceChip = ({ tapType }: TapProps) => {
  return (
    <div className="flex-shirink-0 mr-[12px] flex h-[44px] items-center rounded-sm bg-primary-10 px-[12px] py-[10px]">
      <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-primary">
        {tapType}
      </div>
    </div>
  );
};

export const ExperienceBlackChip = ({ experience }: ExperienceProps) => {
  return (
    <div className="flex h-[44px] flex-grow items-center rounded-sm bg-neutral-95 px-[12px] py-[10px]">
      <div className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {experience}
      </div>
    </div>
  );
};
