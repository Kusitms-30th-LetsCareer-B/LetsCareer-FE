import { useNavigate } from "react-router-dom";

interface ArchiveButtonProps {
    title: string;
    onDelete: () => void;
    archiveLink: string; 
}

export const ArchiveButton = ({ title, onDelete, archiveLink }: ArchiveButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            className="flex px-[16px] py-[12px] rounded-sm items-center bg-neutral-95 gap-[16px] mt-[12px]"
            onClick={() => navigate(archiveLink)}
        >
            <span className="text-xsmall16 font-medium tracking-[-0.096px] text-neutral-30">
                {title}
            </span>
            <button
                className=""
                onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete(); 
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M14.1673 5.83301L5.83398 14.1663M5.83398 5.83301L14.1673 14.1663"
                        stroke="#989BA2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </button>
    );
};