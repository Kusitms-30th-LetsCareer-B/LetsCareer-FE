interface DdayChipProps {
    day: number;
}

export const DdayChip = ({ day }: DdayChipProps) => {
    return (
        <div className="inline-flex items-center justify-center w-[68px] h-[28px] px-[12px] py-[4px] gap-[10px] rounded-lg bg-primary-100">
            <div className="text-center text-xsmall font-bold text-static-100 leading-20 tracking-[-0.21px]">
                D-{day}
            </div>
        </div>  
    );
};

export const FinishChip = () => {
    return (
        <div className="inline-flex items-center justify-center w-[68px] h-[28px] px-[6px] py-[4px] gap-[10px] rounded-lg bg-neutral-60">
            <div className="text-center text-xsmall font-bold text-static-100 leading-20 tracking-[-0.21px]">
                마감
            </div>
        </div>  
    );
};

