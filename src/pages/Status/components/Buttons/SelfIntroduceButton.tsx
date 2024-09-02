import { useState } from "react";

interface ExperienceProps {
    experience: string;
  }

  
export const SelectExperienceButton: React.FC<ExperienceProps> = ({ experience }) => {
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

  
export const SelectExperienceBlackButton = ({ experience } : ExperienceProps ) => {
    return (
      <button className="bg-neutral-95 block w-[315px] items-center rounded-sm px-[12px] py-[10px] mb-[12px]">
        <div className="flex-shrink-0 text-neutral-30 text-left text-xsmall16 font-medium tracking-[-0.096px] whitespace-normal">
            {experience}
        </div>
      </button>
    );
};

export const SelectExperienceLightButton = ({ experience } : ExperienceProps ) => {
    return (
        <button className="bg-primary-0 block w-[315px] items-center border border-primary rounded-sm px-[12px] py-[10px] mb-[12px]">
            <div className="flex-shrink-0 text-primary text-left text-xsmall16 font-medium tracking-[-0.096px]">
                {experience}
            </div>
        </button>
    );
};

export const SelectExperienceDeepButton = ({ experience } : ExperienceProps ) => {
    return (
        <button className="bg-primary-10 block w-[315px] border border-primary rounded-sm px-[12px] py-[10px] mb-[12px]">
            <div className="flex-shrink-0 text-primary text-left text-xsmall16 font-medium tracking-[-0.096px]">
                {experience}
            </div>
        </button>
    );
};

export const SelfIntroduceTemporarySaveButton = () => {
    return (
        <button className="bg-static-100 flex h-[36px] w-[123px] items-center justify-center border border-neutral-80 rounded-sm px-[32px] py-[6px]">
            <div className="text-xsmall16 text-center font-medium tracking-[-0.096px] text-neutral-30">
                임시저장
            </div>
        </button>
    );
};

export const SelfIntroduceSaveButton = () => {
    return (
        <button className="bg-primary flex h-[36px] w-[123px] items-center justify-center rounded-sm px-[32px] py-[6px]">
            <div className="text-xsmall16 text-center font-medium tracking-[-0.096px] text-static-100">
                저장하기
            </div>
        </button>
    );
};

export const WriteExperienceButton = () => {
    return (
        <button className="bg-primary flex h-[52px] w-[225px] items-center justify-center rounded-md px-[20px] py-[12px]">
            <div className="text-small18 text-center font-medium tracking-[-0.022px] text-static-100">
                필살기 경험 작성하러 가기
            </div>
        </button>
    );
};

export const ChangeLetterNumberButton = () => {
    return (
        <button className="bg-static-100 flex h-[30px] w-[76px] items-center justify-center border border-neutral-80 rounded-xxs px-[10px] py-[6px]">
            <div className="text-neutral-45 text-xxsmall12 font-semibold tracking-[-0.3px]">
                글자수 변경
            </div>
        </button>
    );
};