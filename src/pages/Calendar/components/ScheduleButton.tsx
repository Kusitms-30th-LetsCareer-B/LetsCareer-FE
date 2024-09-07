import addIcon from "../../../shared/assets/add-neutral-40.png"

interface ScheduleButtonProbs {
  contents: string;
}

export const ScheduleButton = ({contents} : ScheduleButtonProbs) => {
  return (
    <div className="inline-flex h-[24px] min-w-[131px] items-center justify-center">
      {/* 왼쪽 영역 */}
      <div className="px-2">
        {/* 동그라미 박스 */}
        <div className="flex items-center justify-center text-center w-[18px] h-[18px] bg-neutral-80 rounded-full font-semibold text-neutral-40 leading-none">
          <img src={addIcon}/>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center justify-start font-medium text-xsmall14 text-neutral-40 h-full">
        {contents}
      </div>
    </div>
  );
};
