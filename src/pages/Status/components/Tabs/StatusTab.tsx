interface TabProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export const StatusTab = ({ name, isActive, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-[10px] px-[6px] py-[3px] ${isActive ? "text-primary" : "text-neutral-45"}`}
    >
      <span className="font-small18 text-center font-semibold tracking-[-0.022px]">
        {name}
      </span>
    </button>
  );
};