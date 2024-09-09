import { useState } from "react";

interface InterviewQuestionProps {
  questions: string[];
  selectedQuestion: number;
  onQuestionClick: (index: number) => void;
}

export const InterviewQuestions = ({
  questions,
  selectedQuestion,
  onQuestionClick,
}: InterviewQuestionProps) => {
  return (
    <div className="mt-[20px] flex items-center gap-[4px]">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(index)}
          className={`flex h-[28px] w-[28px] flex-col items-center justify-center rounded-full border text-center text-xsmall14 tracking-[-0.21px] ${
            selectedQuestion === index
              ? "border-primary font-semibold text-primary"
              : "border-neutral-80 font-medium text-neutral-45"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
