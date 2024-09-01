import save from '../../shared/assets/save.png';

export const SaveButton = () => {
    return (
        <div className="flex items-center justify-center w-[251px] h-[52px] px-[20px] py-[12px] rounded-[12px] bg-primary-100">
            <img className="flex-shrink-0 mr-[8px]" src={save} alt="저장" /> 
            <div className="text-center text-xsmall18 font-medium text-static-100 leading-26 tracking-[-0.022px]">
                저장하기
            </div>
        </div>  
    );
};

export const EditListButton = () => {
    return (
        <div className="inline-flex items-center justify-center w-[101px] h-[38px] px-[20px] py-[6px] gap-[10px] rounded-lg bg-static-100 border border-1-neutral-85">
            <div className="text-center text-xsmall16 font-medium text-neutral-30 leading-24 tracking-[-0.096px]">
                목록 편집
            </div>
        </div>  
    );
};