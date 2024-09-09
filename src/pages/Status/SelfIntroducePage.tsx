import { useEffect, useState } from "react";
import { GoBackButton } from "../../components/Buttons/Button";
import { GetExperience } from "./SelfIntroductionComponents/GetSpecialExperience";
import { WriteSelfIntroduction } from "./SelfIntroductionComponents/WriteSelfIntroduction";
import { ShowExperience } from "./SelfIntroductionComponents/ShowSpecialExperience";
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
  const [experienceData, setExperienceData] = useState<ApiResponse | null>(null); // GetExperience 데이터를 담을 상태
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null); // 선택된 경험
  const [hasExperience, setHasExperience] = useState(false); 

  useEffect(() => {
    axios
      .get(`${BASE_URL}/careers/special-skills?userId=1`)
      .then((response) => {
        setExperienceData(response.data);
        if (response.data.success.length > 0 || response.data.job.length > 0 || response.data.collaboration.length > 0) {
          setHasExperience(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching experience data:", error);
      });
  }, []);

  const handleSelectExperience = (experience: ExperienceData) => {
    setSelectedExperience(experience);
  };

  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <GoBackButton text="자기 소개서 작성하기" />
      <div className="flex">
        <div className="flex flex-col">
          <WriteSelfIntroduction />
          <ShowExperience tabType="성공/도전 경험" title="ㅋㅋ" content="ㅋㅋ" />
        </div>
        <GetExperience />
      </div>
    </div>
  );
}

export default SelfIntroducePage;
