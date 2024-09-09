import { useParams } from "react-router-dom";
import { useScrap } from "../../../shared/hooks/useScrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DdayScheduleEndChip } from "../../../components/chips/DdayChip";
import { DepartmentChip } from "../components/Chips/SelfIntroductionChip";
import { Pagination } from "../components/Pagination/SelfIntroducePagination";
import { AnnouncementButton } from "../components/Buttons/DetailStatusButton";
import { WhiteButton } from "../../../components/Buttons/Button";
import { ChangeLetterNumberButton, SelfIntroduceSaveButton } from "../components/Buttons/SelfIntroduceButton";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const WriteSelfIntroduction = () => {
    const { scrap, scrapImage } = useScrap();
  
    const { recruitmentId } = useParams<{ recruitmentId: string }>();
  
    const [company, setCompany] = useState<string>("");
    const [announcementUrl, setAnnouncementUrl] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [stages, setStages] = useState<string>("");
    const [endDate, setEndDate] = useState<number>(0);
  
    const [loading, setLoading] = useState(true);
  
    const textarea = useRef<HTMLTextAreaElement>(null);
    
    const handleResizeHeight = () => {
      if (textarea.current) {
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
      }
    };
  
    useEffect(() => {
      const fetchRecruitmentDetails = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/recruitments/${recruitmentId}`,
          );
          const { companyName, task, announcementUrl, stages, daysUntilEnd } =
            response.data.data;
      
          setCompany(companyName);
          setTask(task);
          setAnnouncementUrl(announcementUrl);
          setEndDate(daysUntilEnd);
          setStages(stages[stages.length-1].stageName);
          setLoading(false);
  
        } catch (error) {
          console.error("Error fetching recruitment details:", error);
          setLoading(false);
        }
      };
  
      if (recruitmentId) {
        fetchRecruitmentDetails();
      }
    }, [recruitmentId, stages]);
  
    return (
      <div className="mb-[20px] flex w-[747px] flex-col items-end rounded-md border border-neutral-80 bg-static-100 p-[24px]">
        <div className="mb-[16px] flex h-[28px] items-start items-center justify-between self-stretch">
          <DdayScheduleEndChip schedule={stages} day={endDate}/>
          <div className="h-[20px] w-[20px] cursor-pointer" onClick={scrapImage}>
            {scrap}
          </div>
        </div>
        <div className="flex flex-col self-stretch">
          <div className="mb-[24px]">
            <span className="mr-[10px] text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
              {company}
            </span>
            <DepartmentChip department={task} />
          </div>
          <div className="mb-[16px] flex items-center justify-between">
            <div>
              <span className="mr-[12px] text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                문항
              </span>
              <Pagination initialTotalPages={1} />
            </div>
            <div className="flex gap-[12px]">
              <WhiteButton text="문항 삭제" />
              <AnnouncementButton
                onClick={() => {
                  if ({ announcementUrl }) {
                    window.location.href = announcementUrl; // 공고 URL로 이동
                  } else {
                    alert("공고 URL이 없습니다.");
                  }
                }}
                text="공고 이동"
              />
            </div>
          </div>
          <div className="mb-[16px] flex flex-col items-center justify-center">
            <textarea
              ref={textarea}
              placeholder="질문을 입력하세요"
              className="mb-[16px] flex w-[699px] resize-none items-center overflow-hidden rounded-sm border border-neutral-80 bg-primary-10 px-[20px] py-[14px] text-xsmall16 font-normal tracking-[-0.096px] text-neutral-30 placeholder:text-primary"
              rows={1}
              onChange={handleResizeHeight}
              />
            <div className="flex h-[362px] w-[699px] flex-col rounded-sm border border-neutral-80 bg-static-100 px-[20px] pb-[16px] pt-[14px]">
              <textarea
                  placeholder="답변을 입력하세요"
                  className="mb-[16px] w-[657px] flex-grow resize-none bg-static-100 text-xsmall16 font-normal tracking-[-0.096px] text-neutral-30 placeholder:text-neutral-45 focus:outline-none"
              />
              <div className="flex justify-end">
                  {/* <TextCounter input={input} limit={limit} /> */}
                  <ChangeLetterNumberButton />
              </div>
          </div>
          </div>
        </div>
        <div className="flex justify-end">
          <SelfIntroduceSaveButton />
        </div>
      </div>
    );
  };
  