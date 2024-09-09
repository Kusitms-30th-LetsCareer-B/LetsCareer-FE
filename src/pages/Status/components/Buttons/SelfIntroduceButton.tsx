import { useState } from "react";

interface ExperienceProps {
  experience: string;
}

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


export const ChangeLetterNumberButton = () => {
  return (
    <button className="flex h-[30px] w-[76px] items-center justify-center rounded-xxs border border-neutral-80 bg-static-100 px-[10px] py-[6px]">
      <div className="text-xxsmall12 font-semibold tracking-[-0.3px] text-neutral-45">
        글자수 변경
      </div>
    </button>
  );
};
