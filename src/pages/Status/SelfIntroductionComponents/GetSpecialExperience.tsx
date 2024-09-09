import { useEffect, useState } from "react";
import { ColoredTap } from "../../../components/Tabs/Tab";
import { SelectExperienceBlackButton, SelectExperienceDeepButton, SelectExperienceLightButton } from "../components/Buttons/SelfIntroduceButton";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface TabProps {
    tabType: string;
    onClick: () => void;
  }
  
  export const BasicTab = ({ tabType, onClick }: TabProps) => {
    return (
      <button 
      onClick={onClick}
      className="inline-flex h-[32px] items-center justify-center rounded-sm px-[12px] py-[6px]"
      >
        <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-neutral-45">
          {tabType}
        </div>
      </button>
    );
  };
  
export const ColoredTab = ({ tabType, onClick }: TabProps) => {
    return (
      <button 
      onClick={onClick}
      className="inline-flex h-[32px] items-center justify-center rounded-sm bg-primary-10 px-[12px] py-[6px]"
      >
        <div className="text-center text-xsmall14 font-semibold tracking-[-0.21px] text-primary">
          {tabType}
        </div>
      </button>
    );
};


interface ExperienceProps {
    experience: string;
    isSelected: boolean;
    onClick: () => void;
  }
  
  export const SelectExperienceButton: React.FC<ExperienceProps> = ({
    experience,
    isSelected,
    onClick,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="text-xsmall font-medium tracking-[-0.096px] text-neutral-30">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick} 
            >
                {isSelected ? (
                    <SelectExperienceDeepButton experience={experience} />
                ) : isHovered ? (
                    <SelectExperienceLightButton experience={experience} />
                ) : (
                    <SelectExperienceBlackButton experience={experience} />
                )}
            </div>
        </div>
    );
  };
  

interface ExperienceData {
      id: number;
      title: string;
      content: string;
}
  
  interface ApiResponse {
    data: {
        success?: ExperienceData[]; 
        job?: ExperienceData[];     
        collaboration?: ExperienceData[]; 
    };
}

export const GetExperience = () => {
      const [selectedTab, setSelectedTab] = useState<string>("성공/도전 경험");
      const [experienceData, setExperienceData] = useState<ApiResponse | null>(null);
      const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);

      useEffect(() => {
          axios
              .get(`${BASE_URL}/careers/special-skills?userId=1`)
              .then((response) => {
                  setExperienceData(response.data);
              })
              .catch((error) => {
                  console.error("Error fetching data:", error);
              });
      }, []);
  
      const handleTabClick = (tab: string) => {
          setSelectedTab(tab);
          setSelectedExperienceId(null);
      };

      const handleExperienceClick = (id: number) => {
        setSelectedExperienceId(id);
      };
  
      const getTabData = () => {
          if (!experienceData) return [];
  
          if (selectedTab === "성공/도전 경험") {
            return experienceData?.data.success || [];
        } else if (selectedTab === "직무 경험") {
            return experienceData?.data.job || [];
        } else if (selectedTab === "협업 경험") {
            return experienceData?.data.collaboration || [];
        }
          return [];
      };
  
      const tabData = getTabData();
  
      return (
          <div className="ml-[20px] flex w-[363px] flex-col items-start rounded-md border border-neutral-80 bg-static-100 p-[24px]">
              <span className="mb-[20px] flex text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                  내 필살기 경험
              </span>
              <div className="flex flex-col items-start self-stretch">
                  <div className="flex items-center mb-[16px]">
                      {selectedTab === "성공/도전 경험" ? (
                          <ColoredTab
                              tabType="성공/도전 경험"
                              onClick={() => handleTabClick("성공/도전 경험")}
                          />
                      ) : (
                          <BasicTab
                              tabType="성공/도전 경험"
                              onClick={() => handleTabClick("성공/도전 경험")}
                          />
                      )}
  
                      {selectedTab === "직무 경험" ? (
                          <ColoredTab
                              tabType="직무 경험"
                              onClick={() => handleTabClick("직무 경험")}
                          />
                      ) : (
                          <BasicTab
                              tabType="직무 경험"
                              onClick={() => handleTabClick("직무 경험")}
                          />
                      )}
  
                      {selectedTab === "협업 경험" ? (
                          <ColoredTab
                              tabType="협업 경험"
                              onClick={() => handleTabClick("협업 경험")}
                          />
                      ) : (
                          <BasicTab
                              tabType="협업 경험"
                              onClick={() => handleTabClick("협업 경험")}
                          />
                      )}
                  </div>
                    {tabData.length > 0 ? (
                        tabData.map((experience) => (
                            <div className="flex flex-col gap-[12px]">
                                <SelectExperienceButton
                                    experience={experience.title}
                                    isSelected={selectedExperienceId === experience.id}
                                    onClick={() => handleExperienceClick(experience.id)}
                                />                     
                            </div>
                        ))
                    ) : (
                        <span className="mt-[48px] self-stretch text-center text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">
                            아직 저장된 내용이 없어요!
                        </span>
                    )}
                </div>
            </div>
      );
  };