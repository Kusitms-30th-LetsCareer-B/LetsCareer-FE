import { GoBackButton } from "../../components/Buttons/Button";
import {
  NewExperience,
  NoExperience,
  WriteSelfIntroduction,
} from "./components/Layout/SelfIntroduceLayout";

function SelfIntroducePage() {
  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <GoBackButton text="자기 소개서 작성하기" />
      <div className="flex">
        <div className="flex flex-col">
          <WriteSelfIntroduction />
          <NewExperience />
        </div>
        <NoExperience />
      </div>
    </div>
  );
}

export default SelfIntroducePage;
