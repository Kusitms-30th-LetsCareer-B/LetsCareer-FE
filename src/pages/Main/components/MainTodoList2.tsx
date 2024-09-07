import React, { useState, useEffect } from 'react';
import axios from 'axios';
import prevButtonIcon from "../../../shared/assets/calendar-prev.png";
import nextButtonIcon from "../../../shared/assets/calendar-next.png";
import { useTodoList } from '../../../shared/hooks/useTodoList.ts';
import { CompanyNameChip } from "../../../components/chips/TodoListChip";
import { registerSchedule, getScheduleList, updateCompletedStatus } from '../api/mainTodoApiService';


/* API 연동 부분 */
import {userInfo} from "../../../shared/api/loginInstance.ts" /* 로그인 정보 받기 */

// Props로 사용할 인터페이스 정의
interface TodoListProps extends userInfo {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

// API 연동시 데이터 Type
interface Recruitment {
  recruitmentId: number;
  companyName: string;
  task: string[];
  completed: boolean[];
}


function MainTodoList({userId, userName, selectedDate, setSelectedDate} : TodoListProps) {
  const { handlePrevDay, handleNextDay, useCompletedImage } = useTodoList({ selectedDate, setSelectedDate });
  const [companies, setCompanies] = useState<Recruitment[]>([]); // Recruitment 타입 적용
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 백엔드에서 스케줄 리스트 가져오기
  useEffect(() => {
    const fetchScheduleList = async () => {
      try {
        setLoading(true);
        setError(null);

        const scheduleList = await getRecruitmentSchedules(userId);
        setCompanies(scheduleList.data.recruitments); // API에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('스케줄 데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleList();
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="font-sans rounded-lg border border-neutral-80 w-[247px]">
      <div className="flex items-center justify-center mb-4 py-5">
        <button onClick={handlePrevDay} className="px-4">
          <img src={prevButtonIcon} alt="이전 달" />
        </button>
        <div className="text-lg font-bold text-neutral-30">
          {selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        </div>
        <button onClick={handleNextDay} className="px-4">
          <img src={nextButtonIcon} alt="다음 달" />
        </button>
      </div>

      <div className="px-7">
        {companies.map((company) => (
          <div key={company.recruitmentId} className="mb-4">
            <div className="py-3">
              <CompanyNameChip companyName={company.companyName} />
            </div>
            <ul>
              {company.task.map((schedule, index) => {
                const { imageSrc, toggleCompleted } = useCompletedImage(
                  company.recruitmentId,
                  index,
                  company.completed,
                  (newCompleted) => {
                    const updatedCompanies = [...companies];
                    updatedCompanies[index].completed = newCompleted;
                    setCompanies(updatedCompanies);
                    updateCompletedStatus(company.recruitmentId, newCompleted);
                  }
                );

                return (
                  <li key={`${company.recruitmentId}-${index}`} className="flex items-center mb-2">
                    <img src={imageSrc} alt={`Schedule status for ${schedule}`} className="w-4 h-4 mr-2" />
                    <span className="text-neutral-40">{schedule}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTodoList



