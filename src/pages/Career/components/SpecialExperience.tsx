import { useEffect, useState } from "react";
import { CareerHeader } from "./CareerHeader";
import { CareerAnswer, CareerQuestion } from "./CareerQuestion";
import {
  HideAnswerToggle,
  ShowAnswerToggle,
  UpdateAnswerToggle,
} from "./CareerToggle";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function SpecialExperience() {
  const [experienceData, setExperienceData] = useState({
    success: [],
    job: [],
    collaboration: [],
  });
  const [loading, setLoading] = useState(true);
  const [showNewAnswer, setShowNewAnswer] = useState(false);
  const [selectedTab, setSelectedTab] = useState("experience");

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      setSelectedTab(savedTab);
    }
    fetchExperienceData();
  }, []);

  const fetchExperienceData = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/careers/special-skills?userId=1`)
      .then((response) => {
        const { success, job, collaboration } = response.data.data;
        setExperienceData({ success, job, collaboration });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSaveSuccess = () => {
    localStorage.setItem("selectedTab", selectedTab);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const handleDeleteSuccess = () => {
    localStorage.setItem("selectedTab", selectedTab);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const addNewAnswer = () => {
    setShowNewAnswer(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-[60px]">
      <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
        <div className="flex w-full flex-col items-start gap-[24px]">
          <CareerQuestion
            title="성공/도전 경험"
            firstName="민지"
            content="님이 이룬 가장 큰 성취/도전 경험이나 실패 경험에 대해 작성해보세요."
            guide="무엇을 달성하기 위해, 구체적으로 어떻게 노력을 했으며, 성공/실패 경험이 자신에게 어떤 영향을 주었는지 구체적으로 적어주세요."
            onAddNew={addNewAnswer}
          />
          <ExperienceSection
            data={experienceData.success}
            experienceType="성공"
            showNewAnswer={showNewAnswer}
            userId={1}
            onSaveSuccess={handleSaveSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>
      <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
        <div className="flex w-full flex-col items-start gap-[24px]">
          <CareerQuestion
            title="직무 경험"
            firstName="민지"
            content="님이 지원할 직무/분야에 대한 핵심역량을 위해 한 노력과 열정에 대하여 작성해보세요."
            guide="지원 분야를 위해 노력한 점(전공, 직무 관련 경험)과 이를 통해 확보된 역량을 프로젝트명, 담당 업무, 기간, 역할등을 포함해 구체적으로 적어보세요. "
            onAddNew={addNewAnswer}
          />
          <ExperienceSection
            data={experienceData.job}
            experienceType="직무"
            showNewAnswer={showNewAnswer}
            userId={1}
            onSaveSuccess={handleSaveSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>
      <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
        <div className="flex w-full flex-col items-start gap-[24px]">
          <CareerQuestion
            title="협업 경험"
            firstName="민지"
            content="님이 공동의 목표를 달성하기 위해 다른 사람들과 힘을 합쳐 노력했던 경험에 대해 작성해보세요."
            guide="팀 내에서 자신이 수행한 역할,어떤 점을 배웠는지, 협업 과정 중 갈등 상황, 소통 방법등 기억에 남는 에피소드를 중심으로 구체적으로 작성해보세요."
            onAddNew={addNewAnswer}
          />
          <ExperienceSection
            data={experienceData.collaboration}
            experienceType="협업"
            showNewAnswer={showNewAnswer}
            userId={1}
            onSaveSuccess={handleSaveSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({
    data,
    experienceType,
    showNewAnswer,
    userId,
    onSaveSuccess,
    onDeleteSuccess,
  }) {
    const [state, setState] = useState([]);
    const [localData, setLocalData] = useState(data); // 데이터를 상태로 관리하여 업데이트 반영
  
    useEffect(() => {
      setState(Array(data.length).fill("hide"));
    }, [data]);
  
    const toggleView = (index, newState) => {
      setState((prevState) =>
        prevState.map((item, i) => (i === index ? newState : item))
      );
    };
  
    const handleUpdate = async (specialSkillId, title, content, index) => {
      try {
        await axios.patch(
          `${BASE_URL}/careers/special-skills?specialSkillId=${specialSkillId}`,
          {
            experienceType,
            title,
            content,
          }
        );
  
        // 데이터가 업데이트되면 바로 로컬 상태 업데이트
        const updatedData = [...localData];
        updatedData[index] = { ...updatedData[index], title, content };
        setLocalData(updatedData); // 로컬 데이터 상태를 업데이트하여 즉시 렌더링
  
        toggleView(index, "show"); // 수정 후 'show' 상태로 전환하여 수정된 결과를 보여줌
      } catch (error) {
        console.error("Error updating special skill:", error);
      }
    };
  
    return (
      <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
        <div className="flex w-full flex-col items-start gap-[24px]">
          {localData.length > 0 ? (
            localData.map((item, index) =>
              state[index] === "hide" ? (
                <HideAnswerToggle
                  key={item.id}
                  title={item.title}
                  onToggle={() => toggleView(index, "show")}
                />
              ) : state[index] === "show" ? (
                <ShowAnswerToggle
                  key={item.id}
                  skillId={item.id}
                  title={item.title}
                  content={item.content}
                  onToggle={() => toggleView(index, "hide")}
                  onUpdate={() => toggleView(index, "update")}
                  onDeleteSuccess={onDeleteSuccess}
                />
              ) : (
                <UpdateAnswerToggle
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  onSave={(newTitle, newContent) =>
                    handleUpdate(item.id, newTitle, newContent, index)
                  }
                  onToggle={() => toggleView(index, "hide")}
                  onUpdate={() => toggleView(index, "show")}
                />
              )
            )
          ) : showNewAnswer ? null : (
            <CareerAnswer
              experienceType={experienceType}
              userId={userId}
              onSaveSuccess={onSaveSuccess}
            />
          )}
          {showNewAnswer && (
            <CareerAnswer
              experienceType={experienceType}
              userId={userId}
              onSaveSuccess={onSaveSuccess}
            />
          )}
        </div>
      </div>
    );
  }

export default SpecialExperience;