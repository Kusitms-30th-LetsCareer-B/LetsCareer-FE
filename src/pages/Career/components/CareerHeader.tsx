interface UserProps {
    name: string;
}

export const CareerHeader = ({name}: UserProps) => {
    return(
        <div className="flex items-center gap-[32px]">
            <span className="text-medium24 font-bold tracking-[-0.576px] text-neutral-0">
                {name}님의 커리어 관리
            </span>
            <div className="flex items-center gap-[24px]">
                <button className="text-small18 tracking-[-0.022px]">
                    기본 이력서
                </button>
                <button className="text-small18 tracking-[-0.022px]">
                    필살기 경험
                </button>
            </div>
      </div>
    );
};