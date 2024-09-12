import { useState, useEffect } from "react";

// 날짜 이동
import DateNavigation from "../../../../components/DateNavigation"

// API 관련
import { getRoutineById, postRoutine, deleteRoutineById, updateRoutineById } from "../../../../shared/api/routinesApiService"
import { getTodosById, postTodo, deleteTodo, updateTodoContent, updateTodoCheck } from "../../../../shared/api/todoApiService"


// Todo 추가 버튼
import AddButton from "./components/AddButton";

// Todo 체크박스
import {TodoCheckBox, RoutineCheckBox} from "./components/ScheduleField"

// Todo를 셋팅하기 위한 모달창
import { SettingsModal } from "./components/SettingsModal";

// TodoItem과 RoutineItem을 구분할 수 있는 타입 정의
interface Item {
  id: number;
  type: 'todo' | 'routine';
  checked: boolean;
}

interface TodoItem {
    text: string;
    checked: boolean;
}

// 유저명, 선택한 기업정보는 부모로부터 받아오기
// API 호출시 params로 사용됨
interface TodoComponentProps {
    userId: number;
    recruitmentId: number;
}

const TodoComponent = ({ userId, recruitmentId }: TodoComponentProps) => {
    // 기업별 투두 날짜, 초기에는 오늘 날짜로 렌더링
    const [selectedDate, setSelectedDate] = useState(new Date());


    // 투두, 루틴, 전체 데이터
    const [todos, setTodos] = useState<{ id: number, checked: boolean }[]>([]);
    const [routines, setRoutines] = useState<{ id: number, checked: boolean }[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);  // 체크박스가 추가될 때, 순서를 관리하기위해 공통 배열도 생성함


    // 투두, 루틴 버튼 추가 이벤트
    const addTodo = () => {
      // id: 고윳값을 부여하려면 todo와 routine 조합해서 생성해야 함
      const newTodo = { id: todos.length + routines.length + 1, checked: false };
      setTodos([...todos, newTodo]);
      setAllItems([...allItems, { ...newTodo, type: 'todo' }]);  // 공통 배열에도 추가
    };
    const addRoutine = () => {
      // id: 고윳값을 부여하려면 todo와 routine 조합해서 생성해야 함
      const newRoutine = { id: todos.length + routines.length + 1, checked: false };
      setRoutines([...routines, newRoutine]);
      setAllItems([...allItems, { ...newRoutine, type: 'routine' }]);  // 공통 배열에도 추가
    };
    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
        setAllItems(allItems.map(item =>
          item.type === 'todo' && item.id === id ? { ...item, checked: !item.checked } : item
      ));
    };
    const toggleRoutine = (id: number) => {
        setRoutines(routines.map(routine =>
            routine.id === id ? { ...routine, checked: !routine.checked } : routine
        ));
        setAllItems(allItems.map(item =>
          item.type === 'routine' && item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };


    

    // 셋팅 버튼 이벤트용 훅: 설정 창 듸우기
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // 셋팅 버튼 이벤트용
    const openSettings = () => {
      setIsSettingsOpen(true);
    };
    const closeSettings = () => {
      setIsSettingsOpen(false);
    };

    
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const itemsPerPage = 7; // 한 페이지에 보여줄 아이템(CheckBox) 수

    // 페이지네이션 계산
    const totalPages = Math.ceil(allItems.length / itemsPerPage); // 총 페이지 수
    const currentItems = allItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ); // 현재 페이지에 표시될 아이템들

    // 페이지를 클릭했을 때 해당 페이지로 이동하는 함수
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };



    // GET API 호출
    // API로 데이터 가져오기 (투두 및 루틴)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const todosResponse = await getTodosById({
            recruitmentId,
            date: selectedDate.toISOString().split("T")[0], // 날짜를 YYYY-MM-DD 형식으로 변환
          });

          const routinesResponse = await getRoutineById({ routineId: recruitmentId });

          // 투두와 루틴 데이터를 추가 순서대로 관리하는 allItems 배열 업데이트
          setTodos(todosResponse.map((todo: any) => ({ id: todo.id, checked: todo.checked })));
          setRoutines(
            routinesResponse.map((routine: any) => ({ id: routine.id, checked: routine.checked }))
          );

          const allItemsCombined = [
            ...todosResponse.map((todo: any) => ({ id: todo.id, type: "todo", checked: todo.checked })),
            ...routinesResponse.map((routine: any) => ({
              id: routine.id,
              type: "routine",
              checked: routine.checked,
            })),
          ];
          setAllItems(allItemsCombined);
        } catch (error) {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        }
      };

      fetchData();
    }, [recruitmentId, selectedDate]);


    return (
        // 전체 보더 박스
        <div className="h-[380px] min-w-[520px] w-[520px] rounded-md border border-neutral-80 flex flex-col px-[24px] pt-[24px]">
          {/** 처음 */}
          <div className="w-[full]">
              {/** 헤더 */}
              <div className="flex justify-between items-center text-medium24 font-semibold tracking-[-0.022px] text-neutral-30 mb-4">
                  {/** 타이틀 */}
                  <div>
                      오늘의 <span className="text-primary-100">{"company"}</span> Todo
                  </div>
                  {/** 데이트 네비 */}
                  <div>
                      <DateNavigation selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                  </div>
              </div>
          </div>


          {/** 중간 */}
          <div className="flex-grow overflow-auto">
              {currentItems.map((item, index) => {
                //console.log(item);

                if (item.type === 'todo') {
                  return (
                    <TodoCheckBox
                      key={`todo-${item.id}`} // 고유한 key 설정
                      checked={item.checked}
                      onChange={() => toggleTodo(item.id)}
                      onOpenSettings={openSettings}
                    />
                  );
                } else {
                  return (
                    <RoutineCheckBox
                      key={`routine-${item.id}`} // 고유한 key 설정
                      checked={item.checked}
                      onChange={() => toggleRoutine(item.id)}
                      onOpenSettings={openSettings}
                    />
                  );
                }
              })}
          </div>

          {/** 페이지 번호 네비게이션 */}
          <div className="flex justify-center items-center my-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                  <button
                      key={index}
                      onClick={() => goToPage(index + 1)}
                      className={`text-sm w-[15px] h-[15px] ${currentPage === index + 1 ? 'bg-primary-100 text-white' : 'bg-gray-200'} rounded-full`}
                  >
                      {/** 페이지번호 값 넣기 */}
                      {/*index + 1*/}
                  </button>
              ))}
          </div>


          {/** 끝 */}
          {/** 버튼 */}
          <div className="mt-auto p-4 flex justify-center items-center">
              <button onClick={addTodo} className="mx-2">
                  <AddButton textColor="text-primary" bgColor="bg-primary-10" text="Todo 추가" handleAddTodo={addTodo} />
              </button>
              <button onClick={addRoutine} className="mx-2">
                  <AddButton textColor="text-secondary" bgColor="bg-secondary-10" text="루틴 추가" handleAddTodo={addRoutine} />
              </button>
          </div>


          {/** 설정 모달 */}
          <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
          </div>
    );
}

export default TodoComponent;