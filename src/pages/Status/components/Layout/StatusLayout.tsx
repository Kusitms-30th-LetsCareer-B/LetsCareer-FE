import { Ddayh32Chip } from "../../../../components/Chips/DdayChip";
import { useScrap } from "../../../../shared/hooks/useScrap";
import { useStatusTab } from "../../../../shared/hooks/useStatusTab";
import { DeleteIcon } from "../Buttons/StatusButton";
import { Departmenth32Chip } from "../Chips/SelfIntroductionChip";
import { OnGoingStatus } from "../Helpers/StatusHelper";
import { StatusTab } from "../Tabs/StatusTab";

interface ApplyStatusProps {
  company: string;
  day: number;
  department: string;
  status: string;
  endDate: string;
  deleteMode?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

export const ClickStatusTab = () => {
  const { activeTab, tabClick } = useStatusTab();

  return (
    <div className="flex flex-shrink-0 items-center">
      <StatusTab
        name="준비 현황"
        isActive={activeTab === "prepare"}
        onClick={() => tabClick("prepare")}
      />

      <StatusTab
        name="지원 결과"
        isActive={activeTab === "result"}
        onClick={() => tabClick("result")}
      />
    </div>
  );
};

export const ApplyStatus: React.FC<ApplyStatusProps> = ({
  company,
  department,
  day,
  status,
  endDate,
  deleteMode = false,
  onDelete,
  onClick,
}) => {
  const { scrap, scrapImage } = useScrap();

  return (
    <button
      className="mt-[20px] flex flex-shrink-0 flex-col items-start"
      onClick={onClick}
    >
      <div className="flex flex-col items-start self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-static-100 p-[20px]">
        <div className="mb-[16px] flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="mr-[8px]">
              <Ddayh32Chip day={day} />
            </div>
            <Departmenth32Chip department={department} />
          </div>
          <div className="flex-end flex flex-shrink-0 items-center">
            <div className="cursor-pointer" onClick={scrapImage}>
              {scrap}
            </div>
            {deleteMode && onDelete && (
              <div className="cursor-pointer">
                <DeleteIcon onClick={onDelete} />
              </div>
            )}
          </div>
        </div>
        <span className="text-small20 font-bold tracking-[-0.4px] text-neutral-0">
          {company}
        </span>
      </div>
      <OnGoingStatus name={status} endDate={endDate} />
    </button>
  );
};
