interface DepartmentChipProps {
    department: string;
}

export const DepartmentMediumChip = ({department}: DepartmentChipProps) => {
    return (
        <div className="inline-flex items-center justify-center h-[32px] px-[12px] py-[4px] rounded-lg bg-primary-10">
            <div className="text-center text-xsmall font-medium text-primary-100 leading-20 tracking-[-0.21px]">
                {department}
            </div>
        </div>  
    );
};

export const DepartmentLargeChip = ({department}: DepartmentChipProps) => {
    return (
        <div className="inline-flex items-center justify-center h-[32px] px-[12px] py-[8px] rounded-lg bg-primary-10">
            <div className="text-center text-xsmall16 font-medium text-primary-100 leading-20 tracking-[-0.21px]">
                {department}
            </div>
        </div>  
    );
};

