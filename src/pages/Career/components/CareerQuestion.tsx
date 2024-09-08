interface CareerQuestionProps {
    title: string;
    firstName: string;
    content: string;
    guide: string;
}

export const CareerQuestion = ({title, firstName, content, guide}: CareerQuestionProps) => {
    return(
        <>
        <div className="flex flex-col items-start gap-[20px] self-stretch border-b-2 border-b-neutral-60">
                    <div className="flex justify-between items-center self-stretch">
                        <span className="text-small20 font-bold text-neutral-10 tracking-[-0.4px]">
                            {title}
                        </span>
                        <button className="flex px-[10px] py-[8px] bg-primary-10 rounded-sm justify-center items-center">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 10H10M10 10H15M10 10V15M10 10V5" stroke="#4D55F5" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="text-xsmall14 font-medium tracking-[-0.21px] text-primary">
                                    항목 추가하기
                                </span>
                            </div>
                        </button>
                    </div>
                    <span className="" />
                </div>
                <div className="flex flex-col items-start gap-[24px] self-stretch">
                    <div className="flex flex-col items-start gap-[20px] self-stretch">
                        <div className="flex flex-col items-start self-stretch gap-[8px]">
                            <span className="font-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                                {firstName}{content}
                            </span>
                            <div className="flex items-center gap-[12px]">
                                <div className="flex justify-center bg-primary-10 items-center rounded-xxs px-[12px] py-[4px]">
                                    <span className="text-primary text-xsmall14 font-semibold tracking-[-0.21px]">
                                        Guide
                                    </span>
                                </div>
                                <span className="text-xsmall16 font-medium tracking-[-0.096px] text-primary">
                                    {guide}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};


export const CareerAnswer = () => {
    return (
        <div className="flex flex-col items-start self-stretch gap-[24px]">
            <div className="flex flex-col bg-neutral-100 items-start gap-[10px] self-stretch p-[20px] rounded-md">
                <div className="flex flex-col items-start gap-[16px] self-stretch">
                    <input 
                    placeholder="제목을 입력해주세요."
                    className="flex bg-static-100 w-full px-[20px] py-[14px] justify-between items-center rounded-sm border border-neutral-80 text-neutral-30 placeholder:neutral-45" 
                    />
                    <textarea 
                    placeholder="내용을 입력해주세요."
                    className="flex bg-static-100 w-full min-h-[310px] px-[20px] py-[14px] gap-[10px] items-start self-stretch rounded-sm border border-neutral-80 resize-none text-neutral-30 placeholder:text-neutral-45" 
                    />
                </div>
            </div>
            <div className="flex items-center gap-[13px] self-stretch">
                <button className="flex w-1/2 bg-neutral-80 px-[20px] py-[12px] justify-center items-center gap-[8px] rounded-md">
                    <span className="text-small18 font-medium tracking-[-0.022px] text-neutral-45">
                        초기화하기
                    </span>
                </button>
                <button className="flex w-1/2 bg-primary px-[20px] py-[12px] justify-center items-center gap-[8px] rounded-md">
                    <span className="text-small18 w-1/2 font-medium tracking-[-0.022px] text-static-100">
                        저장하기
                    </span>
                </button>
            </div>
        </div>
    );
};