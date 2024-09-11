import { useState } from "react";

interface UserProps {
  name: string;
}

export const CareerHeader = ({
  name,
}: UserProps) => {
  return (
    <div className="flex items-center gap-[32px]">
      <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
        {name}님의 커리어 관리
      </span>
    </div>
  );
};
