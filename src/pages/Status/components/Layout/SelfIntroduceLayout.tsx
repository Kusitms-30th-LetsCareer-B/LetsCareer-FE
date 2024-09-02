import { WhiteButton } from "../../../../components/Buttons/Button.tsx";
import { DdayChip } from "../../../../components/Chips/DdayChip.tsx";
import { BasicTap, ColoredTap } from "../../../../components/Taps/Tap.tsx";
import { useScrap } from "../../../../shared/hooks/useScrap.ts";
import { SelectExperienceButton, SelfIntroduceSaveButton, SelfIntroduceTemporarySaveButton, WriteExperienceButton } from "../Buttons/SelfIntroduceButton.tsx";
import { ColoredExperienceChip, DepartmentChip, ExperienceBlackChip } from "../Chips/SelfIntroductionChip.tsx";
import { AboutExperience, AnswerTextField, QuestionTextField } from "../Helpers/SelfIntroduceHelper.tsx.tsx";
import { Pagination } from "../Pagination/SelfIntroducePagination.tsx";

export const NoExperience = () => {
    return (
        <div className="bg-static-100 flex flex-col items-start w-[363px] border border-neutral-80 rounded-md ml-[20px] p-[24px]">
            <span className="flex text-small18 font-semibold tracking-[-0.022px] text-neutral-30 mb-[20px]">내 필살기 경험</span>
            <div className="flex flex-col items-start self-stretch gap-[64px]">
                <div className="flex items-center mb-[64px]">
                    <ColoredTap tapType="성공/도전 경험" />
                    <BasicTap tapType="직무 경험" />
                    <BasicTap tapType="협업 경험" />
                </div>
                <span className="self-stretch text-center text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-45">아직 저장된 내용이 없어요!</span>
            </div>
        </div>
    );
};

export const SelectMyExperience = () => {
    return (
        <div className="bg-static-100 flex flex-col items-start w-[363px] border border-neutral-80 rounded-md ml-[20px] p-[24px]">
            <span className="flex text-small18 font-semibold tracking-[-0.022px] text-neutral-30 mb-[20px]">내 필살기 경험</span>
            <div className="flex flex-col items-start self-stretch">
                <div className="flex items-center mb-[16px]">
                    <ColoredTap tapType="성공/도전 경험" />
                    <BasicTap tapType="직무 경험" />
                    <BasicTap tapType="협업 경험" />
                </div>
                <div className="text-xsmall font-medium tracking-[-0.096px] text-neutral-30">
                    <SelectExperienceButton experience="컴포넌트 이름 뭐라고 짓지 문장 길어지면 어떡하지?!?!?!"/>
                    <SelectExperienceButton experience="저녁 뭐 먹지"/>
                </div>
            </div>
        </div>
    );
};

export const NewExperience = () => {
    return (
        <div className="bg-static-100 flex items-center justify-center self-stretch h-[319px] w-[747px] border border-neutral-80 rounded-md">
            <div className="flex flex-col justify-center items-center">
                <span className="self-stretch text-center text-neutral-45 text-xsmall16 font-semibold tracking=[-0.096px] mb-[20px]">
                    자소서 내용이 고민된다면?<br />
                    저장된 필살기 경험을 불러올 수 있어요! 
                </span>
                <WriteExperienceButton />
            </div>
        </div>
    );
};

export const BringExperience = () => {
    return (
        <div className="bg-static-100 flex flex-col items-center justify-center self-stretch h-[319px] w-[747px] border border-neutral-80 rounded-md">
            <span className="text-center text-neutral-45 text-xsmall16 font-semibold tracking=[-0.096px]">
            우측 상단에서 참고하고 싶은<br />
            필살기 경험을 선택해 불러오세요!
            </span>
        </div>
    );
};

export const GetExperience = () => {
    return (
        <div className="bg-static-100 flex flex-col items-start self-stretch w-[747px] border border-neutral-80 rounded-md p-[24px]">
            <div className="flex justify-between mb-[16px]">
                <ColoredExperienceChip tapType="성공/도전 경험" />
                <ExperienceBlackChip experience="컴포넌트 이름 짓는거 너무 어렵다 어쩌구 저저구" />
            </div>
            <div className="">
                <AboutExperience experience="취업 정보 불균형 문제 해결 프로젝트에 참여하면서, 저는 구직자들이 겪는 정보의 격차를 줄이기 위해 노력했습니다. 팀원들과 함께 다양한 취업 정보를 체계적으로 수집하고 분석하여, 이를 구직자들이 쉽게 접근할 수 있는 플랫폼으로 제공하는 것을 목표로 했습니다. 이 과정에서 데이터 수집과 정제 작업을 주도하며, 신뢰할 수 있는 정보를 선별하는 데 집중했습니다. 또한, 사용자의 피드백을 반영해 지속적으로 플랫폼을 개선하였고, 이를 통해 더 많은 사람들이 공정한 기회를 얻을 수 있도록 기여했습니다. 프로젝트의 성과로는, 정보 접근성이 낮았던 사용자들의 만족도가 크게 향상되었으며, 많은 구직자들이 더 나은 직업 선택을 할 수 있도록 도왔습니다. 이 경험은 사회적 가치를 창출하는 일에 대한 제 열정을 더욱 확고히 해주었으며, 앞으로도 정보의 불균형 문제를 해결하기 위해 지속적으로 노력할 것입니다.취업 정보 불균형 문제 해결 프로젝트에 참여하면서, 저는 구직자들이 겪는 정보의 격차를 줄이기 위해 노력했습니다. 팀원들과 함께 다양한 취업 정보를 체계적으로 수집하고 분석하여, 이를 구직자들이 쉽게 접근할 수 있는 플랫폼으로 제공하는 것을 목표로 했습니다. 이 과정에서 데이터 수집과 정제 작업을 주도하며, 신뢰할 수 있는 정보를 선별하는 데 집중했습니다. 또한, 사용자의 피드백을 반영해 지속적으로 플랫폼을 개선하였고, 이를 통해 더 많은 사람들이 공정한 기회를 얻을 수 있도록 기여했습니다. 프로젝트의 성과로는, 정보 접근성이 낮았던 사용자들의 만족도가 크게 향상되었으며, 많은 구직자들이 더 나은 직업 선택을 할 수 있도록 도왔습니다. 이 경험은 사회적 가치를 창출하는 일에 대한 제 열정을 더욱 확고히 해주었으며, 앞으로도 정보의 불균형 문제를 해결하기 위해 지속적으로 노력할 것입니다."/>
            </div>
        </div>
    );
};

export const WriteSelfIntroduction = () => {
    const { scrap, scrapImage } = useScrap();
    
    return (
        <div className="bg-static-100 flex flex-col items-end w-[747px] border border-neutral-80 rounded-md p-[24px] mb-[20px]">
            <div className="flex h-[28px] items-start justify-between items-center self-stretch mb-[16px]">
                <DdayChip schedule="서류 마감" day={10} />
                <img className="h-[20px] w-[20px] cursor-pointer" src={scrap} alt="scrap" onClick={scrapImage} />
            </div>
            <div className="flex flex-col self-stretch">
                <div className="mb-[24px]">
                    <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0 mr-[10px]">렛츠 커리어</span>
                    <DepartmentChip department="마케팅 직무" />
                </div>
                <div className="flex items-center justify-between mb-[16px]">
                    <div>
                        <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30 mr-[12px]">문항</span>
                        <Pagination initialTotalPages={1} />
                    </div>
                    <WhiteButton text="공고 이동" />
                </div>
                <div className="flex flex-col items-center justify-center mb-[16px]">
                    <QuestionTextField />
                    <AnswerTextField input={10} limit={100}/>
                </div>
            </div>
            <div className="flex justify-end">
                <span className="mr-[12px]"><SelfIntroduceTemporarySaveButton /></span>
                <SelfIntroduceSaveButton />
            </div>
            
        </div>
    );
};