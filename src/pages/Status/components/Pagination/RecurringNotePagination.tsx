import { useState } from "react";

interface SelfIntroductionQuestionProps {
  questions: string[];
}

export const SelfIntroductionQuestions = ({
  questions,
}: SelfIntroductionQuestionProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  return (
    <div className="mt-[20px] flex items-center gap-[4px]">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => setSelectedQuestion(index)}
          className={`flex h-[28px] w-[28px] flex-col items-center justify-center rounded-full border text-center text-xsmall14 tracking-[-0.21px] ${
            selectedQuestion === index
              ? "border-primary font-semibold text-primary"
              : "border-neutral-80 font-medium text-neutral-45"
          }`}
        >
          {index + 1} {/* 문항 번호 표시 */}
        </button>
      ))}
    </div>
  );
};
