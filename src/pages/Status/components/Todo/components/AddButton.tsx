interface AddButtonProps {
    textColor: string;
    bgColor: string;
    text: string;
    handleAddTodo: () => void;
}

const AddButton = ({textColor, bgColor, text, handleAddTodo}: AddButtonProps) => {
    return (
        <button 
            className={`flex min-w-[48%]  items-center justify-center rounded-sm px-[28px] py-[10px] ${textColor} ${bgColor}`}
            style={{ color: `${textColor}`, backgroundColor: `${bgColor}` }}
            onClick={handleAddTodo}
        >
            <span className="text-xsmall16 font-semibold">
                {text}
            </span>

        </button>
    );
}
export default AddButton