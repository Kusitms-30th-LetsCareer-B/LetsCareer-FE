import { useState } from "react";

interface RecurringNoteChipProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}   

interface RecurringNoteChip2Props {
    text: string;
}   

export const RecurringNoteChip = ({text, isSelected, onClick }: RecurringNoteChipProps) => {
    return(
        <button
            onClick={onClick} 
            className={`w-[97px] flex justify-center items-center border rounded-sm px-[10px] py-[8px] 
            ${isSelected ? 'bg-primary-10 text-primary border-primary' : 'bg-neutral-100 text-neutral-45 border-neutral-80'}`}
        >           
             <span className="text-xsmall16 font-medium tracking-[-0.096px]">
                {text}
            </span>
        </button>
    );
};

export const RecurringNoteChipGroup = () => {
    const [selected, setSelected] = useState<string | null>(null); // 선택된 버튼 관리

    const handleSelect = (text: string) => {
        setSelected(text); // 클릭된 버튼을 선택된 상태로 설정
    };

    return (
        <div className="flex gap-[10px]">
            <RecurringNoteChip text="만족" isSelected={selected === '만족'} onClick={() => handleSelect('만족')} />
            <RecurringNoteChip text="보통" isSelected={selected === '보통'} onClick={() => handleSelect('보통')} />
            <RecurringNoteChip text="불만족" isSelected={selected === '불만족'} onClick={() => handleSelect('불만족')} />
        </div>
    );
};



export const RecurringNoteChip2 = ({text}: RecurringNoteChip2Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };
    
    return(
        <button 
            onClick={handleClick} 
            className={`bg-neutral-90 w-[97px] flex justify-center items-center rounded-sm px-[12px] py-[8px]
            ${isSelected ? 'bg-primary-10 text-primary' : 'bg-neutral-90 text-neutral-45'}`}
        >
            <span className="text-xsmall14 font-semibold tracking-[-0.21px]">
                {text}
            </span>
        </button>
    );
};