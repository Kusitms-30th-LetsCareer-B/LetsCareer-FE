import { GoBackButton } from "../../components/Buttons/Button";

function ArchivingPage() {

  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <GoBackButton text="서류 아카이빙" />
      <div className="flex flex-col items-end gap-[24px]">
        <button
          className="flex flex-shrink-0 justify-center gap-[10px] rounded-sm bg-primary px-[28px] py-[10px]">
          <span className="text-xsmall16 font-medium tracking-[-0.096px] text-static-100">
            저장하기
          </span>
        </button>
        
      </div>
    </div>
  );
}

export default ArchivingPage;
