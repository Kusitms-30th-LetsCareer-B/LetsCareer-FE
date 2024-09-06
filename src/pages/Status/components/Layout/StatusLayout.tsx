import { Ddayh32Chip, Finishh32Chip } from "../../../../components/chips/DdayChip";
import { useScrap } from "../../../../shared/hooks/useScrap";
import { useStatusTab } from "../../../../shared/hooks/useStatusTab";
import { DeleteIcon } from "../Buttons/StatusButton";
import { Departmenth32Chip } from "../Chips/SelfIntroductionChip";
import {
  FailedStatus,
  OnGoingStatus,
  SuccessStatus,
} from "../Helpers/StatusHelper";
import { StatusTab } from "../Tabs/StatusTab";

interface ApplyStatusProps {
  company: string;
  day: number;
  department: string;
  stageName: string;
  endDate: string;
  deleteMode?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

interface ConsequenceSuccessProps {
  company: string;
  department: string;
  recruitmentId: number;
  deleteMode?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

interface ConsequenceFailedProps {
  company: string;
  department: string;
  stageName: string;
  recruitmentId: number;
  deleteMode?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

export const ApplyStatus: React.FC<ApplyStatusProps> = ({
  company,
  department,
  day,
  stageName,
  endDate,
  deleteMode = false,
  onDelete,
  onClick,
}) => {
  const { scrap, scrapImage } = useScrap();

  return (
    <div className="mt-[20px] flex flex-shrink-0 flex-col items-start">
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
        <span
          className="w-full text-small20 font-bold tracking-[-0.4px] text-neutral-0"
          onClick={onClick}
        >
          {company}
        </span>
      </div>
      <OnGoingStatus name={stageName} endDate={endDate} />
    </div>
  );
};

export const ConsequenceFailedStatus: React.FC<ConsequenceFailedProps> = ({
  company,
  department,
  stageName,
  recruitmentId,
  deleteMode = false,
  onDelete,
  onClick,
}) => {
  const { scrap, scrapImage } = useScrap();

  return (
    <div
      className="mt-[20px] flex flex-shrink-0 flex-col items-start"
    >
      <div className="flex flex-col items-start self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-static-100 p-[20px]">
        <div className="mb-[16px] flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="mr-[8px]">
              <Finishh32Chip />
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
        <span
          className="w-full text-small20 font-bold tracking-[-0.4px] text-neutral-0"
          onClick={onClick}
        >
        {company}
        </span>
      </div>
      <FailedStatus name={stageName} recruitmentId={recruitmentId}/>
    </div>
  );
};

export const ConsequenceSuccessStatus: React.FC<ConsequenceSuccessProps> = ({
  company,
  department,
  recruitmentId,
  deleteMode = false,
  onDelete,
  onClick,
}) => {
  const { scrap, scrapImage } = useScrap();

  return (
    <div
      className="mt-[20px] flex flex-shrink-0 flex-col items-start"
    >
      <div className="flex flex-col items-start self-stretch rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md border-l border-r border-t border-neutral-80 bg-static-100 p-[20px]">
        <div className="mb-[16px] flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="mr-[8px]">
                <Finishh32Chip />
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
        <span
          className="w-full text-small20 font-bold tracking-[-0.4px] text-neutral-0"
          onClick={onClick}
        >
          {company}
        </span>
      </div>
      <SuccessStatus recruitmentId={recruitmentId}/>
    </div>
  );
};