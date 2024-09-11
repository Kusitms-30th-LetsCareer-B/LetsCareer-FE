import { useState, useEffect } from 'react';
import { getPersonalDateSchedule, postPersonalSchedule, updatePersonalSchedule, deletePersonalSchedule } from '../../pages/Calendar/api/personalScheduleApiService'; // API 모듈 가져오기

export const useSchedule = (userId: number) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
  // 일정 목록 불러오기
  const loadSchedules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPersonalDateSchedule({ userId });
      setSchedules(data);
    } catch (err) {
      setError('일정을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 일정 추가하기
  const addSchedule = async (newSchedule: { content: string; date: string }) => {
    try {
      await postPersonalSchedule({ userId }, newSchedule);
      await loadSchedules(); // 추가 후 목록 갱신
    } catch (err) {
      setError('일정을 추가하는 중 오류가 발생했습니다.');
    }
  };

  // 일정 수정하기
  const updateSchedule = async (scheduleId: number, updatedContent: string) => {
    try {
      await updatePersonalSchedule({ personalScheduleId: scheduleId, content: updatedContent });
      await loadSchedules(); // 수정 후 목록 갱신
    } catch (err) {
      setError('일정을 수정하는 중 오류가 발생했습니다.');
    }
  };

  // 일정 삭제하기
  const deleteSchedule = async (scheduleId: number) => {
    try {
      await deletePersonalSchedule({ personalScheduleId: scheduleId });
      await loadSchedules(); // 삭제 후 목록 갱신
    } catch (err) {
      setError('일정을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    loadSchedules(); // 컴포넌트가 마운트될 때 일정 불러오기
  }, []);

  return { schedules, isLoading, error, addSchedule, updateSchedule, deleteSchedule };
  
  */
};
