import { useState } from "react";

interface SelfIntroductionQuestionProps {
    questions: string[];
  }
  
  export const SelfIntroductionQuestions = ({ questions }: SelfIntroductionQuestionProps) => {
    const [selectedQuestion, setSelectedQuestion] = useState(0); 
  
    return (
      <div className="flex items-center mt-[20px] gap-[4px]">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestion(index)} 
            className={`w-[28px] h-[28px] flex flex-col justify-center items-center rounded-full border text-xsmall14 tracking-[-0.21px] text-center  ${
              selectedQuestion === index
                ? "border-primary text-primary font-semibold" 
                : "border-neutral-80 text-neutral-45 font-medium"
            }`}
          >
            {index + 1} {/* 문항 번호 표시 */}
          </button>
        ))}
      </div>
    );
  };