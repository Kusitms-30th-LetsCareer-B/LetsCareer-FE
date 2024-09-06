import save from "../../shared/assets/save.png";
import { useGoBack } from "../../shared/hooks/useGoBack";

interface ButtonProps {
  text: string;
}

export const SaveButton = () => {
  return (
    <button className="flex h-[52px] w-[251px] items-center justify-center rounded-md bg-primary px-[20px] py-[12px]">
      <img className="mr-[8px] flex-shrink-0" src={save} alt="저장" />
      <div className="text-center text-small18 font-medium tracking-[-0.022px] text-static-100">
        저장하기
      </div>
    </button>
  );
};

export const WhiteButton = ({ text }: ButtonProps) => {
  return (
    <button className="border-1-neutral-85 inline-flex h-[38px] w-[101px] items-center justify-center gap-[10px] rounded-sm border bg-static-100 px-[20px] py-[6px]">
      <div className="text-center text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
        {text}
      </div>
    </button>
  );
};

export const GoBackButton = ({ text }: ButtonProps) => {
  const goBack = useGoBack();

  return (
    <div className="mb-[40px] flex items-start">
      <button
        className="my-[4px] mr-[12px] flex items-center justify-center"
        onClick={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="#2A2D34"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
        {text}
      </span>
    </div>
  );
};
