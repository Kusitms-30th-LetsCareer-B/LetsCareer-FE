import addIcon from "../../../shared/assets/add-neutral-40.png";

interface ScheduleAddButtonProbs {
  contents: string;
}

export const ScheduleAddButton = ({ contents }: ScheduleAddButtonProbs) => {
  return (
    <div className="inline-flex h-[24px] min-w-[131px] items-center justify-center">
      {/* 왼쪽 영역 */}
      <div className="px-2">
        {/* 동그라미 박스 */}
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-neutral-80 text-center font-semibold leading-none text-neutral-40">
          <img src={addIcon} />
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex h-full items-center justify-start text-xsmall14 font-medium text-neutral-40 hover:text-primary-100">
        {contents}
      </div>
    </div>
  );
};
