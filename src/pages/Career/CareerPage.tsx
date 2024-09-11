import { useState } from "react";
import {
  NoGoodQuestion,
  NoSelfIntroduction,
} from "../Status/components/Helpers/RecurringNoteHelper";
import { CareerHeader } from "./components/CareerHeader";
import SpecialExperience from "./components/SpecialExperience";

function CareerPage() {

  return (
    <div className="mb-[70px] p-[48px] flex w-full flex-col gap-[40px]">
      <div className="flex flex-col items-start gap-[6px]">
        <CareerHeader
          name="오민지"
        />
        <span className="self-stretch text-xsmall16 font-medium tracking-[-0.096px] text-neutral-50">
          필살기 경험을 정리해보세요! 저장된 내용은 기업별 자기소개서 작성 시
          불러올 수 있어요
        </span>
      </div>
      <SpecialExperience />
    </div>
  );
}

export default CareerPage;
