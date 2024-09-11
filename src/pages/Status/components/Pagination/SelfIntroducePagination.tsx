import { useStatusPagination } from "../../../../shared/hooks/useStatusPagination";

interface SelfIntroductionQuestionProps {
  questions: string[];
  selectedQuestion: number;
  onQuestionClick: (index: number) => void;
  onQuestionAdd: () => void;
  totalItems: number;
  itemsPerPage: number;
  initialPage: number;
  onPageChange: (page: number) => void;
}

export const SelfIntroductionQuestions = ({
  questions,
  selectedQuestion,
  onQuestionClick,
  onQuestionAdd,
  totalItems,
  itemsPerPage,
  initialPage,
  onPageChange,
}: SelfIntroductionQuestionProps) => {
  // 페이지네이션 훅을 사용하여 현재 페이지 상태 및 페이지 변경 로직 처리
  const {
    currentPage,
    totalPages,
    changePage,
    handlePrevClick,
    handleNextClick,
    getVisiblePages,
  } = useStatusPagination(totalItems, itemsPerPage, initialPage, onPageChange);

  const handlePageClick = (page: string | number) => {
    if (typeof page === "string") {
      // '1...' 또는 '5...' 같은 경우 처리
      const cleanPage = parseInt(page, 10); // 숫자 부분만 추출하여 이동
      changePage(cleanPage);
      onQuestionClick(cleanPage - 1); // 선택된 질문 업데이트
    } else {
      // 숫자 페이지
      changePage(page);
      onQuestionClick(page - 1);
    }
  };

  return (
    <div className="flex items-center gap-[4px]">
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`flex h-[28px] w-[28px] flex-col items-center justify-center rounded-full border text-center text-xsmall14 tracking-[-0.21px] ${
            selectedQuestion === (typeof page === 'number' ? page - 1 : "")
              ? "border-primary font-semibold text-primary"
              : "border-neutral-80 font-medium text-neutral-45"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 질문 추가 버튼 */}
      <button
        onClick={onQuestionAdd}
        className="ml-[6px] flex h-[28px] w-[70px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-neutral-80 bg-static-100"
      >
        <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-45">
          추가하기
        </span>
      </button>
    </div>
  );
};