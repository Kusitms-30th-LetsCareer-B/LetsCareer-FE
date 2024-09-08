import { CareerHeader } from "./CareerHeader";
import { CareerAnswer, CareerQuestion } from "./CareerQuestion";
import { HideAnswerToggle, ShowAnswerToggle } from "./CareerToggle";

function SpecialExperience() {
  return (
    <div className="mb-[70px] ml-[48px] mt-[40px] flex w-full flex-col gap-[40px]">
      <div className="flex flex-col items-start gap-[6px]">
        <CareerHeader name="오민지" />
        <span className="self-stretch text-xsmall16 font-medium tracking-[-0.096px] text-neutral-50">
          필살기 경험을 정리해보세요! 저장된 내용은 기업별 자기소개서 작성 시
          불러올 수 있어요
        </span>
      </div>
      <div className="inline-flex flex-col items-start gap-[60px]">
        <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
          <div className="flex w-full flex-col items-start gap-[24px]">
            <CareerQuestion
              title="성공/도전 경험"
              firstName="민지"
              content="님이 이룬 가장 큰 성취/도전 경험이나 실패 경험에 대해 작성해보세요."
              guide="무엇을 달성하기 위해, 구체적으로 어떻게 노력을 했으며, 성공/실패 경험이 자신에게 어떤 영향을 주었는지 구체적으로 적어주세요."
            />
            <CareerAnswer />
          </div>
        </div>
        <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
          <div className="flex w-full flex-col items-start gap-[24px]">
            <CareerQuestion
              title="직무 경험"
              firstName="민지"
              content="님이 지원할 직무/분야에 대한 핵심역량을 위해 한 노력과 열정에 대하여 작성해보세요."
              guide="지원 분야를 위해 노력한 점(전공, 직무 관련 경험)과 이를 통해 확보된 역량을 프로젝트명, 담당 업무, 기간, 역할등을 포함해 구체적으로 적어보세요. "
            />
            <CareerAnswer />
          </div>
        </div>
        <div className="inline-flex w-[1128px] flex-col items-start gap-[60px]">
          <div className="flex w-full flex-col items-start gap-[24px]">
            <CareerQuestion
              title="협업 경험"
              firstName="민지"
              content="민지님이 공동의 목표를 달성하기 위해 다른 사람들과 힘을 합쳐 노력했던 경험에 대해 작성해보세요."
              guide="팀 내에서 자신이 수행한 역할,어떤 점을 배웠는지, 협업 과정 중 갈등 상황, 소통 방법등 기억에 남는 에피소드를 중심으로 구체적으로 작성해보세요."
            />
            <CareerAnswer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialExperience;
