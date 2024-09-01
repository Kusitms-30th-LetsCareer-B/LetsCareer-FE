interface TapProps {
    tapType: string;
}

export const BasicTap = ({tapType}: TapProps) => {
    return (
        <div className="inline-flex items-center justify-center h-[32px] px-[12px] py-[6px] rounded-lg">
            <div className="text-center text-xsmall font-semibold text-neutral-45 leading-20 tracking-[-0.21px]">
                {tapType}
            </div>
        </div>  
    );
};

export const ColoredTap = ({tapType}: TapProps) => {
    return (
        <div className="inline-flex items-center justify-center h-[32px] px-[12px] py-[6px] rounded-lg bg-primary-10">
            <div className="text-center text-xsmall font-semibold text-primary-100 leading-20 tracking-[-0.21px]">
                {tapType}
            </div>
        </div>  
    );
};
