import save from "../../shared/assets/save.png";

export const SaveButton = () => {
  return (
    <div className="bg-primary flex h-[52px] w-[251px] items-center justify-center rounded-md px-[20px] py-[12px]">
      <img className="mr-[8px] flex-shrink-0" src={save} alt="저장" />
      <div className="text-small18 leading-26 text-center font-medium tracking-[-0.022px] text-static-100">
        저장하기
      </div>
    </div>
  );
};

export const EditListButton = () => {
  return (
    <div className="border-1-neutral-85 inline-flex h-[38px] w-[101px] items-center justify-center gap-[10px] rounded-sm border bg-static-100 px-[20px] py-[6px]">
      <div className="leading-24 text-center text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        목록 편집
      </div>
    </div>
  );
};
