import { useState } from "react";

interface RecurringNoteChipProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

interface RecurringNoteChip2Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export const RecurringNoteChip = ({
  text,
  isSelected,
  onClick,
}: RecurringNoteChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-[97px] items-center justify-center rounded-sm border px-[10px] py-[8px] ${isSelected ? "border-primary bg-primary-10 text-primary" : "border-neutral-80 bg-neutral-100 text-neutral-45"}`}
    >
      <span className="text-xsmall16 font-medium tracking-[-0.096px]">
        {text}
      </span>
    </button>
  );
};

export const RecurringNoteChipGroup = ({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (satisfaction: string | null) => void;
}) => {
  return (
    <div className="flex gap-[10px]">
      <RecurringNoteChip
        text="만족"
        isSelected={selected === "만족"}
        onClick={() => setSelected("만족")}
      />
      <RecurringNoteChip
        text="보통"
        isSelected={selected === "보통"}
        onClick={() => setSelected("보통")}
      />
      <RecurringNoteChip
        text="불만족"
        isSelected={selected === "불만족"}
        onClick={() => setSelected("불만족")}
      />
    </div>
  );
};

export const RecurringNoteChip2 = ({
  text,
  isSelected,
  onClick,
}: RecurringNoteChip2Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-[97px] items-center justify-center rounded-sm bg-neutral-90 px-[12px] py-[8px] ${isSelected ? "bg-primary-10 text-primary" : "bg-neutral-90 text-neutral-45"}`}
    >
      <span className="text-xsmall14 font-semibold tracking-[-0.21px]">
        {text}
      </span>
    </button>
  );
};

export const RecurringNoteChipGroup2 = ({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (difficulty: string | null) => void;
}) => {
  return (
    <div className="flex gap-[10px]">
      <RecurringNoteChip
        text="상"
        isSelected={selected === "상"}
        onClick={() => setSelected("상")}
      />
      <RecurringNoteChip
        text="중"
        isSelected={selected === "중"}
        onClick={() => setSelected("중")}
      />
      <RecurringNoteChip
        text="하"
        isSelected={selected === "하"}
        onClick={() => setSelected("하")}
      />
    </div>
  );
};
