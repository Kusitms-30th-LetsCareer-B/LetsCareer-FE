import { useState, useEffect } from "react";

/* 로그인 정보 받기 */
import { userInfo } from "../../../shared/api/loginInstance.ts";
/* ToDo 관련 Tools 임포트 */
import {
  PersonalScheduleListProps,
  formatDate1,
} from "../../../components/ToDoListTool.ts";
// 부모 컴포로부터 최종 입력받을 Probs 합체
interface CombinedProps extends userInfo, PersonalScheduleListProps {}

/* 개인 일정 관련 */
// 스케줄 추가 버튼 임포트
import { ScheduleButton } from "./ScheduleButton.tsx";

// 개인 일정 API 연동
import {
  getPersonalSchedules,
  addPersonalSchedule,
} from "../../Main/api/personalApiService.ts";
import {
  PersonalSchedule,
  PostPersonalScheduleRequest,
} from "../../Main/api/personalType.ts";

/** 컴포넌트 */
const CalendarPersonalList = ({
  userId,
  userName,
  selectedDate,
  setSelectedDate,
}: CombinedProps) => {
  //////////////////////////////////////////////////////////////////
  /** 개인 일정 API 연동 */
  const [schedules, setSchedules] = useState<PersonalSchedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<
    PersonalSchedule[]
  >([]); // 필터링된 일정
  const [newSchedule, setNewSchedule] = useState<{
    date: string;
    content: string;
  }>({
    date: "",
    content: "",
  });
  const [nextPersonalScheduleId, setNextPersonalScheduleIdId] = useState(1); // 새로운 일정에 사용할 ID

  // 년, 월, 일을 selectedDate에서 추출
  const year = selectedDate ? selectedDate.getFullYear().toString() : ""; // selectedDate가 null일 경우 빈 문자열
  const month = selectedDate ? `0${selectedDate.getMonth() + 1}`.slice(-2) : ""; // selectedDate가 null일 경우 빈 문자열
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-CA") // YYYY-MM-DD 형식으로 로컬 시간 변환
    : "";

  // 해당 유저의 전체 개인 일정 불러오기
  const fetchSchedules = async () => {
    try {
      const response = await getPersonalSchedules({
        userId: userId,
        year,
        month,
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("일정을 불러오는 도중 에러가 발생했습니다.", error);
      setSchedules([]); // 에러가 발생할 경우 빈 배열로 초기화
    }
  };

  // 해당 유저의 현재 선택된 날짜의 개인 일정만 불러오기
  // selectedDate에 맞는 일정 필터링
  const filterSchedulesByDate = () => {
    if (formattedDate && schedules.length > 0) {
      const filtered = schedules.filter(
        (schedule) => schedule.date === formattedDate,
      );
      setFilteredSchedules(filtered);
    } else {
      setFilteredSchedules([]); // 필터링된 결과가 없을 경우 빈 배열로 설정
    }
  };

  // 일정 추가하기
  const handleAddSchedule = async () => {
    if (!selectedDate) {
      alert("날짜를 선택하세요.");
      return;
    }
    /*
        if (!newSchedule.date || !newSchedule.content) {
          alert('날짜와 일정을 입력하세요.');
          return;
        }
          */

    try {
      // 개인 일정 객체 생성
      // userId를 쿼리 파라미터로 전달하고, newSchedule 데이터 전달
      const scheduleData = {
        userId: userId, // userId 추가
        date: selectedDate.toISOString().split("T")[0], // 날짜를 YYYY-MM-DD 형식으로 설정
        content: "개인일정", // default값
        /*
                date: selectedDate.toISOString().split('T')[0], // 날짜를 YYYY-MM-DD 형식으로 설정
                content: newSchedule.content,
                */
      };

      await addPersonalSchedule(userId, scheduleData); // addPersonalSchedule 호출
      alert("일정이 추가되었습니다.");
      fetchSchedules(); // 일정 추가 후 다시 불러오기
      setNextPersonalScheduleIdId(nextPersonalScheduleId + 1);
    } catch (error) {
      console.error("일정을 추가하는 도중 에러가 발생했습니다.", error);
    }
  };

  /// 백엔드에서 수정, 삭제 구현시 적용
  /*
    // 개인 일정 추가하기 버튼 클릭 시 호출되는 함수
    const handleAddSchedule = () => {
        if (!selectedDate) return; // selectedDate가 없으면 추가 불가

        // 개인 일정 객체 생성
        const newSchedule = {
            personalScheduleId: nextId,
            date: selectedDate.toISOString().split('T')[0], // 날짜를 YYYY-MM-DD 형식으로 설정
            content: '개인일정', // default값
        };

        setSchedules([...schedules, newSchedule]);
        setNextId(nextId + 1);
    };

    // 일정 내용 수정 시 호출
    const handleContentChange = (id: number, newContent: string) => {
      const updatedSchedules = schedules.map(schedule =>
        schedule.personalScheduleId === id ? { ...schedule, content: newContent } : schedule
      );
      setSchedules(updatedSchedules);
      updateScheduleInDB(id, newContent); // DB에 자동으로 저장
    };


    // 일정 삭제 시 호출
    const handleDeleteSchedule = (id: number) => {
      const updatedSchedules = schedules.filter(schedule => schedule.personalScheduleId !== id);
      setSchedules(updatedSchedules);
    };
  
    // DB에 내용을 업데이트하는 함수 (가짜 API 호출)
    const updateScheduleInDB = async (scheduleId: number, updatedContent: string) => {
      try {
        console.log(`Updating schedule ${scheduleId} with content: ${updatedContent}`);
        // 실제 DB 업데이트 로직 추가
      } catch (error) {
        console.error('Failed to update schedule in DB:', error);
      }
    };
    */

  // selectedDate가 변경될 때마다 일정 불러오기
  useEffect(() => {
    if (selectedDate && year && month) {
      fetchSchedules();
    }
  }, [userId, year, month, selectedDate]);

  useEffect(() => {
    filterSchedulesByDate(); // 선택된 날짜에 대해서만 가져오기 (일정 필터링 수행)
  }, [schedules, formattedDate]);

  // 컴포넌트가 처음 렌더링될 때 일정 불러오기
  /*
    useEffect(() => {
      fetchSchedules();
    }, [userId, year, month]);
    */
  //////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////
  /* 컴포넌트 렌더링 */
  return (
    <>
      {/* 네 번째 헤더 파트: 텍스트 타이틀 */}
      <div className="text-small18 font-semibold text-neutral-30">
        커리어 일정
      </div>
      <div className="text-xxsmall-12 py-3 text-neutral-30">채용일정</div>

      {/* 다섯 번째 헤더 파트: 기업 일정 칩스 불러오기 */}
      {/* 선택된 날짜의 일정만 불러오기 */}
      {filteredSchedules === undefined ? (
        <p>일정을 불러오는 중...</p>
      ) : filteredSchedules.length > 0 ? (
        <ul>
          {filteredSchedules.map((schedule) => (
            <li key={schedule.personalScheduleId}>
              {schedule.date} - {schedule.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>해당 날짜에 일정이 없습니다.</p>
      )}

      {/* 전체 일정 불러오기
            {schedules === undefined ? (
                <p>일정을 불러오는 중...</p> // 데이터를 불러오는 동안 보여줄 메시지
            ) : schedules.length > 0 ? (
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.personalScheduleId}>
                        {schedule.date} - {schedule.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>일정이 없습니다.</p> // 일정이 없을 경우 메시지
            )}
            */}

      {/* 백엔드에서 수정, 삭제 만들면 고고 
            {schedules === undefined ? (
                <p>일정을 불러오는 중...</p> // 데이터를 불러오는 동안 보여줄 메시지
            ) : schedules.length > 0 ? (
                <ul>{ schedules.map((schedule) => (
                    <li key={schedule.personalScheduleId} className="mb-2">
                        <div>
                        {schedule.date} - {schedule.content}
                        </div>
                        <div className="flex items-center">
                        <input
                            type="text"
                            value={schedule.content}
                            onChange={(e) => handleContentChange(schedule.personalScheduleId, e.target.value)}
                            className="border px-2 py-1 mr-2"
                        />
                        <button onClick={() => handleDeleteSchedule(schedule.personalScheduleId)}>삭제</button>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <p>일정이 없습니다.</p> // 일정이 없을 경우 메시지
            )}
             */}

      {/* 구분선 출력 */}
      <hr className="mt-4 p-1" />

      {/* 여섯 번째 헤더 파트: 개인 일정 추가하기 */}
      <div className="items-center justify-between text-center">
        {/* 추가하기 버튼 */}
        <button onClick={handleAddSchedule}>
          <ScheduleButton contents="개인 일정 추가하기" />
        </button>
      </div>
    </>
  );
};

export default CalendarPersonalList;
