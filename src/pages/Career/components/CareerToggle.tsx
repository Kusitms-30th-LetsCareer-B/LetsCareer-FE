interface HideAnswerToggleProps {
    title: string;
}

export const HideAnswerToggle = ({title}: HideAnswerToggleProps) => {
    return(
        <div className="w-full flex items-center h-[56px] px-[20px] py-[14px] border border-neutral-80 rounded-sm gap-[12px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301997 1.66667 1.26425 -1.46309e-06 2.80385 -1.32849e-06L13.1962 -4.19966e-07C14.7358 -2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z" fill="#757BFF"/>
            </svg>
            <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                {title}
            </span>
        </div>
    );
};

interface ShowAnswerToggleProps {
    title: string;
    answer: string;
}

export const ShowAnswerToggle = ({title, answer}: ShowAnswerToggleProps) => {
    return(
        <div className="w-full bg-neutral-100 flex flex-col w-full rounded-b-md">
            <div className="bg-static-100 flex items-center h-[56px] px-[20px] py-[14px] border border-neutral-80 rounded-sm gap-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                    <path d="M6.26795 1C7.03775 -0.333332 8.96225 -0.333334 9.73205 0.999999L14.9282 10C15.698 11.3333 14.7358 13 13.1962 13L2.80385 13C1.26425 13 0.301996 11.3333 1.0718 10L6.26795 1Z" fill="#757BFF"/>
                </svg>
                <span className="text-xsmall16 font-semibold tracking-[-0.096px] text-neutral-30">
                    {title}
                </span>
            </div>
            <div className="flex flex-col items-start p-[20px] gap-[10px]">
                <div className="bg-static-100 flex flex-col items-start gap-[10px] stretch border border-neutral-80 rounded-sm px-[20px] py-[14px]">
                    <span className="text-xsmall14 font-bold tracking-[-0.21px] text-neutral-30">{title}</span>
                    <span className="text-xsmall14 font-regular tracking-[-0.21px] text-neutral-40">{answer}</span>
                </div>
                <div className="flex items-center gap-[13px] self-stretch">
                    <button className="flex w-1/2 bg-neutral-90 px-[20px] py-[12px] justify-center items-center gap-[8px] rounded-md">
                        <span className="text-small18 font-medium tracking-[-0.022px] text-neutral-45">
                            삭제하기
                        </span>
                    </button>
                    <button className="flex w-1/2 bg-primary px-[20px] py-[12px] justify-center items-center gap-[8px] rounded-md">
                        <span className="text-small18 w-1/2 font-medium tracking-[-0.022px] text-static-100">
                            수정하기
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};