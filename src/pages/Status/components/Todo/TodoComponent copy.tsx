import { useState, useEffect } from "react";

// 날짜 이동
import DateNavigation from "../../../../components/DateNavigation"

// 날짜 관련 훅
// getFormattedDate3:  API 연동시 백엔드에서 요구하는 날짜 형식 2024-09-10
import { getFormattedDate3 } from "../../../../shared/hooks/useDate"

// API 관련
import { postRoutine, deleteRoutineById, updateRoutineById } from "../../../../shared/api/routinesApiService"
import { postTodo, deleteTodo, updateTodoContent, updateTodoCheck } from "../../../../shared/api/todoApiService"
// GET은 해당 기업의 전체 투두를 가져오는 아래 API를 사용해야 함
import { getTodoListDayGroupedByCompany } from "../../../Calendar/api/todoDayGroupedByCompanyApiService"
import { Todo, GetTodoListDayGroupedByCompanyResponseType } from "../../../Calendar/api/todoDayGroupedByCompanyType"


// Todo 추가 버튼
import AddButton from "./components/AddButton";

// Todo 체크박스
import {TodoCheckBox, RoutineCheckBox} from "./components/ScheduleField"

// Todo를 셋팅하기 위한 모달창
import { SettingsModal } from "./components/SettingsModal";

/*
interface Item {
  id: number;
  type: 'todo' | 'routine'; // 구분자 추가
  content: string;
  checked: boolean;
  date?: string; // 투두의 경우만 있을 수 있음
  startDate?: string; // 루틴의 경우만 있을 수 있음
  endDate?: string; // 루틴의 경우만 있을 수 있음
}
*/

// 유저명, 선택한 기업정보는 부모로부터 받아오기
// API 호출시 params로 사용됨
interface TodoComponentProps {
    userId: number;
    recruitmentId: number;
}

const TodoComponent = ({ userId, recruitmentId }: TodoComponentProps) => {
    // 기업별 투두 날짜, 초기에는 오늘 날짜로 렌더링
    const [selectedDate, setSelectedDate] = useState(new Date());


    // 투두, 루틴: 서로 다른 체크박스를 사용해서 따로 관리 필요
    const [todos, setTodos] = useState<Todo[]>([]);
    const [routines, setRoutines] = useState<Todo[]>([]);


    // 전체 데이터
    const [allItems, setAllItems] = useState<Todo[]>([]);  // 체크박스가 추가될 때, 순서를 관리하기위해 공통 배열도 생성함

    // 선택한 아이템 정보를 관리하기 위한 상태
    const [selectedItem, setSelectedItem] = useState<Todo | null>(null); // 선택한 아이템 정보

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.todoId === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
        setAllItems(allItems.map(item =>
          item.isRoutine === false && item.todoId === id ? { ...item, isCompleted: !item.isCompleted } : item
      ));
    };
    const toggleRoutine = (id: number) => {
        setRoutines(routines.map(routine =>
            routine.todoId === id ? { ...routine, isCompleted: !routine.isCompleted } : routine
        ));
        setAllItems(allItems.map(item =>
          item.isRoutine === true && item.todoId === id ? { ...item, isCompleted: !item.isCompleted } : item
        ));
    };


    

    // 셋팅 버튼 이벤트용 훅: 설정 창 띄우기
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // 셋팅 버튼 이벤트용
    const openSettings = (item: Todo) => {
      setSelectedItem(item); // 선택한 루틴 ID 설정
      setIsSettingsOpen(true); // 모달 열기
    };

    const closeSettings = () => {
      setSelectedItem(null); // 선택한 루틴 ID 초기화
      setIsSettingsOpen(false); // 모달 닫기
    };

    // 모달에서 Submit이 발생했을 때 호출되는 함수
    const handleModalSubmit = (content: string, startDate?: Date, endDate?: Date) => {
      if (selectedItem) {
          if (selectedItem.isRoutine) {
              updateRoutine(selectedItem.todoId, content, startDate!, endDate!);
          } else {
              updateTodo(selectedItem.todoId, content, startDate!);
          }
      }
      closeSettings(); // 모달 창 닫기
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



    /** 렌더링할 때 마다 GET API */
    // 데이터 가져오기 함수 (GET API 호출)
    const fetchData = async () => {
      try {
        const todosResponse = await getTodoListDayGroupedByCompany({
          userId: userId,
          date: getFormattedDate3(selectedDate),
        });

        const todosData = todosResponse.data.flatMap((company) => company.todos || []).filter((todo) => !todo.isRoutine);
        const routinesData = todosResponse.data.flatMap((company) => company.todos || []).filter((todo) => todo.isRoutine);

        setTodos(todosData);  // 기존 상태를 덮어씀
        setRoutines(routinesData);  // 기존 상태를 덮어씀
        
        // 모든 항목을 todoId 순으로 정렬
        const allItemsSorted = [...todosData, ...routinesData].sort((a, b) => a.todoId - b.todoId);

        // 투두와 루틴 데이터를 불러온 순서대로 관리하기 위한 변수인 allItems 배열 업데이트
        setAllItems(allItemsSorted);  // 정렬된 allItems 업데이트

      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    // API로 데이터 가져오기 (투두 및 루틴)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const todosResponse = await getTodoListDayGroupedByCompany({
            userId: userId,
            date: getFormattedDate3(selectedDate), // 날짜를 YYYY-MM-DD 형식으로 변환
          });
          console.log(`📫 기업의 투두 및 루틴 리스트 배송이요>> 💗`)
          console.log(todosResponse)

          // 전체 데이터에서 todos와 routines를 구분하여 처리
          const todosData = todosResponse.data
          .flatMap((company) => company.todos || []) // 배열이 없을 경우 빈 배열 반환
          .filter((todo) => !todo.isRoutine); // 투두만 필터링

          const routinesData = todosResponse.data
            .flatMap((company) => company.todos || []) // 배열이 없을 경우 빈 배열 반환
            .filter((todo) => todo.isRoutine); // 루틴만 필터링

          console.log(`📫 1기업의 투두 및 루틴 리스트 배송이요>> 💗`)
          console.log(todosData)
          console.log(`📫 2기업의 투두 및 루틴 리스트 배송이요>> 💗`)
          console.log(routinesData)
          
          // 상태 업데이트
          setTodos([...todos, ...todosData]);
          setRoutines([...routines, ...routinesData]);

          // 모든 항목을 todoId 순으로 정렬
          const allItemsSorted = [...todosData, ...routinesData].sort((a, b) => a.todoId - b.todoId);

          // 투두와 루틴 데이터를 불러온 순서대로 관리하기 위한 변수인 allItems 배열 업데이트
          setAllItems(allItemsSorted);  // 정렬된 allItems 업데이트

        } catch (error) {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        }
      };

      fetchData();
    }, [recruitmentId, selectedDate]);


    /** POST API */
    // Todo 추가 함수, 초기 content는 ""로 입력함
    const addTodo = async () => {
      try {
        const todoResponse = await postTodo(
          { userId, recruitmentId },
          { date: getFormattedDate3(selectedDate), content: "" }
        );

        
        // Todo 추가 후 데이터를 다시 가져옴
        await fetchData(); // 데이터 가져오는 함수 호출

        // response로 null을 받아서 todoResponse.todoId 불가
        // 걍 새로 데이터 가져와야 할듯
        /*
        // 변수 리스트에 추가
        const newTodo: Todo = {
          content: content,
          date: getFormattedDate3(selectedDate),
          isCompleted: false,
          isRoutine: false,
          recruitmentId: recruitmentId,
          todoId: todoResponse.todoId, // API로부터 받은 todoId
        };
        
        // 상태 업데이트
        setTodos([...todos, newTodo]);
        setAllItems([...allItems, newTodo]);
        */
        
      } catch (error) {
        console.error("투두 추가 중 오류 발생:", error);
      }
    };

    // Routine 추가 함수
    const addRoutine = async () => {
      try {
        const routineResponse = await postRoutine(
          { userId, recruitmentId },
          { content: "", startDate: getFormattedDate3(selectedDate), endDate: getFormattedDate3(selectedDate) }
        );



        // Routine 추가 후 데이터를 다시 가져옴
        await fetchData(); // 데이터 가져오는 함수 호출
        
        /*
        // 변수 리스트에 추가
        const newRoutine: Todo = {
          content: content, // 실제 루틴의 내용
          date: getFormattedDate3(selectedDate), // 날짜
          isCompleted: false, // true 또는 false로 변경 (1 대신 boolean 타입)
          isRoutine: true, // 루틴이므로 true
          recruitmentId: 0, // 실제로 사용될 recruitmentId 값
          todoId: 1, // 실제로 사용될 todoId 값
        };
        
        // 상태 업데이트
        setRoutines([...routines, newRoutine]);
        setAllItems([...allItems, newRoutine]);
        */
        
      } catch (error) {
        console.error("루틴 추가 중 오류 발생:", error);
      }
    };

    
    /** PATCH API */
    // Todo 업데이트 함수, data를 인자로 받아서 업뎃하기
    const updateTodo = async (todoId: number, content: string, date: Date) => {
      try {
        const todoResponse = await updateTodoContent(
          { todoId, content, date: getFormattedDate3(date) }
        );

        console.log("투두 업뎃")
        console.log(todoResponse)

        // 데이터 새로 가져오기
        await fetchData();

        /*
        // id: 고윳값을 부여하려면 todo와 routine 조합해서 생성해야 함
        const newRoutine: Todo = {
          content: "", // 실제 루틴의 내용
          date: "2024-09-12", // 날짜
          isCompleted: true, // true 또는 false로 변경 (1 대신 boolean 타입)
          isRoutine: true, // 루틴이므로 true
          recruitmentId: 0, // 실제로 사용될 recruitmentId 값
          todoId: 1, // 실제로 사용될 todoId 값
        };
        
        // 상태 업데이트
        setRoutines([...routines, newRoutine]);
        setAllItems([...allItems, newRoutine]);
        */
        
      } catch (error) {
        console.error("투두 업뎃 중 오류 발생:", error);
      }
    };

    // Routine 추가 함수
    const updateRoutine = async (routineId: number, content: string, startDate: Date, endDate: Date) => {
      try {
        const routineResponse = await updateRoutineById(
            { 
              // 선택한 루틴 ID
              routineId ,
              // 필요한 3개의 인자 전달
              content, startDate: getFormattedDate3(startDate), endDate: getFormattedDate3(endDate) }
        );
        console.log("루틴 업뎃")
        console.log(routineResponse)

        // 데이터 새로 가져오기
        await fetchData(); 
                
      } catch (error) {
        console.error("루틴 업뎃 중 오류 발생:", error);
      }
    };


    /** DELETE API */
    // Todo 삭제 함수
    const deleteTodoItem = async (todoId: number) => {
      try {
          await deleteTodo({ todoId });
          await fetchData();
      } catch (error) {
          console.error(`투두 ID ${todoId} 삭제 중 오류 발생:`, error);
      }
    };

    // Routine 삭제 함수
    const deleteRoutineItem = async (routineId: number) => {
        try {
            await deleteRoutineById({ routineId });
            await fetchData();
        } catch (error) {
            console.error(`루틴 ID ${routineId} 삭제 중 오류 발생:`, error);
        }
    };

    return (
        // 전체 보더 박스
        <div className="flex flex-col">
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


          {/** 중간, allItems 대신에 currentItems로 해야 페이지네이션 구현됨*/}
          <div className="flex-grow overflow-auto">
              {currentItems.map((item, index) => (
                    item.isRoutine ? (
                        <RoutineCheckBox
                            key={`routine-${item.todoId}`}
                            checked={item.isCompleted}
                            content={item.content}
                            onChange={() => toggleRoutine(item.todoId)}
                            onOpenSettings={() => openSettings(item)}
                            onDelete={() => deleteTodoItem(item.todoId)}
                        />
                    ) : (
                        <TodoCheckBox
                            key={`todo-${item.todoId}`}
                            checked={item.isCompleted}
                            content={item.content}
                            onChange={() => toggleTodo(item.todoId)}
                            onOpenSettings={() => openSettings(item)}
                            onDelete={() => deleteRoutineItem(item.todoId)}
                        />
                    )
                ))}
                {/*
                {allItems.map((item) => (
                  item.isRoutine ? (
                  return (
                    <TodoCheckBox
                      key={`todo-${item.todoId}`} // 고유한 key 설정
                      checked={item.isCompleted} // isCompleted 값 전달
                      content={item.content} // content 값 전달
                      onChange={() => toggleTodo(item.todoId)}
                      onOpenSettings={() => openSettings(item)}
                    />
                  );
                } else {
                  return (
                    <RoutineCheckBox
                      key={`routine-${item.todoId}`} // 고유한 key 설정
                      checked={item.isCompleted} // isCompleted 값 전달
                      content={item.content} // content 값 전달
                      onChange={() => toggleRoutine(item.todoId)}
                      onOpenSettings={() => openSettings(item)}
                    />
                  );
                }
              })}
                */}
          </div>


          {/** 페이지 번호 네비게이션 */}
          <div className="flex justify-center items-center my-4 space-x-2">
                {Array.from({ length: Math.ceil(allItems.length / 7) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`text-sm w-[15px] h-[15px] ${index + 1 === currentPage ? 'bg-primary-100 text-white' : 'bg-gray-200'} rounded-full`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {/*
          <div className="flex justify-center items-center my-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                  <button
                      key={index}
                      onClick={() => goToPage(index + 1)}
                      className={`text-sm w-[15px] h-[15px] ${currentPage === index + 1 ? 'bg-primary-100 text-white' : 'bg-gray-200'} rounded-full`}
                  >
                      {/** 페이지번호 값 넣기 
                      {/** index + 1
                  </button>
              ))}
          </div>
          */}


          {/** 끝 */}
          {/** 버튼 */}
          <div className="mt-auto p-4 flex justify-center items-center">
              <button className="mx-2">
                  <AddButton textColor="text-primary" bgColor="bg-primary-10" text="Todo 추가" handleAddTodo={addTodo} />
              </button>
              <button className="mx-2">
                  <AddButton textColor="text-secondary" bgColor="bg-secondary-10" text="루틴 추가" handleAddTodo={addRoutine} />
              </button>
          </div>
            {/** 설정 모달 
            <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} onSubmit={updateRoutine} />
            */}
            
            {selectedItem && (
                <SettingsModal
                    isOpen={!!selectedItem}
                    onClose={closeSettings}
                    onSubmit={handleModalSubmit}
                    initialContent={selectedItem.content}
                    initialStartDate={selectedItem.isRoutine ? new Date(selectedItem.date) : undefined}
                    initialEndDate={selectedItem.isRoutine ? new Date(selectedItem.date) : undefined}
                />
            )}

          </div>
          
    );
}

export default TodoComponent;