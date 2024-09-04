import { useState } from "react";

interface ExperienceProps {
  experience: string;
}

export const SelectExperienceButton: React.FC<ExperienceProps> = ({
  experience,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <SelectExperienceLightButton experience={experience} />
      ) : (
        <SelectExperienceBlackButton experience={experience} />
      )}
    </div>
  );
};

export const SelectExperienceBlackButton = ({
  experience,
}: ExperienceProps) => {
  return (
    <button className="mb-[12px] block w-[315px] items-center rounded-sm bg-neutral-95 px-[12px] py-[10px]">
      <div className="flex-shrink-0 whitespace-normal text-left text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {experience}
      </div>
    </button>
  );
};

export const SelectExperienceLightButton = ({
  experience,
}: ExperienceProps) => {
  return (
    <button className="mb-[12px] block w-[315px] items-center rounded-sm border border-primary bg-primary-0 px-[12px] py-[10px]">
      <div className="flex-shrink-0 text-left text-xsmall16 font-medium tracking-[-0.096px] text-primary">
        {experience}
      </div>
    </button>
  );
};

export const SelectExperienceDeepButton = ({ experience }: ExperienceProps) => {
  return (
    <button className="mb-[12px] block w-[315px] rounded-sm border border-primary bg-primary-10 px-[12px] py-[10px]">
      <div className="flex-shrink-0 text-left text-xsmall16 font-medium tracking-[-0.096px] text-primary">
        {experience}
      </div>
    </button>
  );
};

export const SelfIntroduceTemporarySaveButton = () => {
  return (
    <button className="flex h-[36px] w-[123px] items-center justify-center rounded-sm border border-neutral-80 bg-static-100 px-[32px] py-[6px]">
      <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        임시저장
      </div>
    </button>
  );
};

export const SelfIntroduceSaveButton = () => {
  return (
    <button className="flex h-[36px] w-[123px] items-center justify-center rounded-sm bg-primary px-[32px] py-[6px]">
      <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
        저장하기
      </div>
    </button>
  );
};

export const WriteExperienceButton = () => {
  return (
    <button className="flex h-[52px] w-[225px] items-center justify-center rounded-md bg-primary px-[20px] py-[12px]">
      <div className="text-center text-small18 font-medium tracking-[-0.022px] text-static-100">
        필살기 경험 작성하러 가기
      </div>
    </button>
  );
};

export const ChangeLetterNumberButton = () => {
  return (
    <button className="flex h-[30px] w-[76px] items-center justify-center rounded-xxs border border-neutral-80 bg-static-100 px-[10px] py-[6px]">
      <div className="text-xxsmall12 font-semibold tracking-[-0.3px] text-neutral-45">
        글자수 변경
      </div>
    </button>
  );
};
