import { useState } from "react";

interface UserProps {
  name: string;
  selectedTab: "resume" | "experience";
  setSelectedTab: (tab: "resume" | "experience") => void;
}

export const CareerHeader = ({ name, selectedTab, setSelectedTab }: UserProps) => {
  const isResumeSelected = selectedTab === "resume";
  const isExperienceSelected = selectedTab === "experience";

  return (
    <div className="flex items-center gap-[32px]">
      <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
        {name}님의 커리어 관리
      </span>
      <div className="flex items-center gap-[24px]">
        <button
          className={`text-small18 tracking-[-0.022px] ${isResumeSelected ? "font-bold text-primary" : "font-regular text-neutral-40"}`}
          onClick={() => setSelectedTab("resume")}
        >
          기본 이력서
        </button>
        <button
          className={`text-small18 tracking-[-0.022px] ${isExperienceSelected ? "font-bold text-primary" : "font-regular text-neutral-40"}`}
          onClick={() => setSelectedTab("experience")}
        >
          필살기 경험
        </button>
      </div>
    </div>
  );
};
