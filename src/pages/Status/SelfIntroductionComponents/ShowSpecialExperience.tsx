import {
  ColoredExperienceChip,
  ExperienceBlackChip,
} from "../components/Chips/SelfIntroductionChip";
import { AboutExperience } from "../components/Helpers/SelfIntroduceHelper.tsx";

export const NewExperience = () => {
  return (
    <div className="flex h-[319px] w-[747px] items-center justify-center self-stretch rounded-md border border-neutral-80 bg-static-100">
      <div className="flex flex-col items-center justify-center">
        <span className="tracking=[-0.096px] mb-[20px] self-stretch text-center text-xsmall16 font-semibold text-neutral-45">
          자소서 내용이 고민된다면?
          <br />
          저장된 필살기 경험을 불러올 수 있어요!
        </span>
        <button className="flex h-[52px] w-[225px] items-center justify-center rounded-md bg-primary px-[20px] py-[12px]">
          <div className="text-center text-small18 font-medium tracking-[-0.022px] text-static-100">
            필살기 경험 작성하러 가기
          </div>
        </button>
      </div>
    </div>
  );
};

export const BringExperience = () => {
  return (
    <div className="flex h-[319px] w-[747px] flex-col items-center justify-center self-stretch rounded-md border border-neutral-80 bg-static-100">
      <span className="tracking=[-0.096px] text-center text-xsmall16 font-semibold text-neutral-45">
        우측 상단에서 참고하고 싶은
        <br />
        필살기 경험을 선택해 불러오세요!
      </span>
    </div>
  );
};

interface ShowExperienceProps {
  tabType: string;
  title: string;
  content: string;
}

export const ShowExperience = ({
  tabType,
  title,
  content,
}: ShowExperienceProps) => {
  return (
    <div className="flex w-[747px] flex-col items-start self-stretch rounded-md border border-neutral-80 bg-static-100 p-[24px]">
      <div className="mb-[16px] flex justify-between">
        <div className="flex-shirink-0 mr-[12px] flex h-[44px] items-center rounded-sm bg-primary-10 px-[12px] py-[10px]">
          <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-primary">
            {tabType}
          </div>
        </div>
        <div className="flex h-[44px] flex-grow items-center rounded-sm bg-neutral-95 px-[12px] py-[10px]">
          <div className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
            {title}
          </div>
        </div>
      </div>
      <div className="">
        <div className="self-stretch">
          <span className="text-xsmall16 font-normal tracking-[-0.096px] text-neutral-45">
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};
