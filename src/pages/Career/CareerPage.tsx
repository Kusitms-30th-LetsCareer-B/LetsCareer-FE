import { useState } from "react";
import {
  NoGoodQuestion,
  NoSelfIntroduction,
} from "../Status/components/Helpers/RecurringNoteHelper";
import { CareerHeader } from "./components/CareerHeader";
import SpecialExperience from "./components/SpecialExperience";
import Resume from "./components/Resume";


function CareerPage() {
  const [selectedTab, setSelectedTab] = useState<"resume" | "experience">("resume");

  return (
    <div className="mb-[70px] ml-[48px] mt-[40px] flex w-full flex-col gap-[40px]">
      <div className="flex flex-col items-start gap-[6px]">
        <CareerHeader name="오민지" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <span className="self-stretch text-xsmall16 font-medium tracking-[-0.096px] text-neutral-50">
          필살기 경험을 정리해보세요! 저장된 내용은 기업별 자기소개서 작성 시
          불러올 수 있어요
        </span>
      </div>
      {selectedTab === "resume" ? (
        <Resume />  // 기본 이력서 컴포넌트
      ) : (
        <SpecialExperience />
      )}
    </div>
  );
}

export default CareerPage;
