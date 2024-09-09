interface AnswerTextProps {
  input: number;
  limit: number;
}

interface ExperienceProps {
  experience: string;
}

export const TextCounter = ({ input, limit }: AnswerTextProps) => {
  return (
    <div className="flex h-[30px] items-center justify-center px-[10px] py-[6px]">
      <div className="text-center text-xsmall14 font-medium tracking-[-0.21px] text-neutral-45">
        {input}/{limit}자
      </div>
    </div>
  );
};

export const TextFilter = () => {
  return (
    <div className="flex w-[296px] flex-col items-start justify-center rounded-sm bg-static-100 p-[20px]">
      <div className="mb-[16px] flex h-[28px] w-[256px] items-center self-stretch">
        <span className="mr-[20px] text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-30">
          최대 글자 수
        </span>
        <input className="text-xsmall flex w-[140px] items-center rounded-xxs border border-neutral-80 bg-static-100 py-[4px] pl-[8px] font-medium tracking-[-0.21px] text-neutral-45" />
      </div>

      <div className="mb-[16px] flex items-center gap-[23px] self-stretch">
        <span className="text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-30">
          카운팅 기준
        </span>
        <div className="flex h-[20px] w-[157px] items-center gap-[31px]">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="mr-[6px] flex h-[16px] w-[16px] flex-shrink-0 items-center rounded-xxs border border-neutral-45 bg-static-100"
            />
            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-30">
              글자수
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="mr-[6px] flex h-[16px] w-[16px] flex-shrink-0 items-center rounded-xxs border border-neutral-45 bg-static-100"
            />
            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-30">
              바이트
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-[256px] items-center gap-[35px]">
        <span className="text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-30">
          공백 기준
        </span>
        <div className="flex h-[20px] w-[170px] flex-shrink-0 items-center">
          <div className="mr-[16px] flex items-center justify-center">
            <input
              type="checkbox"
              className="mr-[6px] flex h-[16px] w-[16px] flex-shrink-0 items-center rounded-xxs border border-neutral-45 bg-static-100"
            />
            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-30">
              공백 포함
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="mr-[6px] flex h-[16px] w-[16px] flex-shrink-0 items-center rounded-xxs border border-neutral-45 bg-static-100"
            />
            <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-30">
              공백 제외
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export const AboutExperience = ({ experience }: ExperienceProps) => {
  return (
    <div className="self-stretch">
      <span className="text-xsmall16 font-normal tracking-[-0.096px] text-neutral-45">
        {experience}
      </span>
    </div>
  );
};
