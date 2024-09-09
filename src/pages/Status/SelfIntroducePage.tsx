import { useEffect, useState } from "react";
import { GoBackButton } from "../../components/Buttons/Button";
import { GetExperience } from "./SelfIntroductionComponents/GetSpecialExperience";
import { WriteSelfIntroduction } from "./SelfIntroductionComponents/WriteSelfIntroduction";
import { BringExperience, NewExperience, ShowExperience } from "./SelfIntroductionComponents/ShowSpecialExperience";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ExperienceData {
  id: number;
  title: string;
  content: string;
}

interface ApiResponse {
  success: ExperienceData[];
  job: ExperienceData[];
  collaboration: ExperienceData[];
}

function SelfIntroducePage() {
  const [experienceData, setExperienceData] = useState<ApiResponse | null>(null); 
  const [selectedTab, setSelectedTab] = useState<string>("성공/도전 경험"); 
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null); 

  useEffect(() => {
    axios
      .get(`${BASE_URL}/careers/special-skills?userId=1`)
      .then((response) => {
        setExperienceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching experience data:", error);
      });
  }, []);

  const handleSelectExperience = (experience: ExperienceData) => {
    setSelectedExperience(experience);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <GoBackButton text="자기 소개서 작성하기" />
      <div className="flex">
        <div className="flex flex-col">
          <WriteSelfIntroduction />
            {selectedExperience ? (
              <ShowExperience
              tabType={selectedTab}
              title={selectedExperience.title}
              content={selectedExperience.content}
            />
          ) : (
            <BringExperience />
          )}         
        </div>
        <GetExperience onSelectExperience={handleSelectExperience}  onTabChange={handleTabChange}/>
      </div>
    </div>
  );
}

export default SelfIntroducePage;
