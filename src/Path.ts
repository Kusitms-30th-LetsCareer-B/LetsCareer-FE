export const PATHS = {
    HOME_PATH: '/home',

    CALENDAR_PATH: '/calendar',
    RECRU_SCHEDULE_ENV_PATH: '/calendar/schedule',

    STATUS_PATH: '/status',
    DETAIL_STATUS_PATH: '/status/:recruitmentId',
    SELF_INTRODUCE_PATH: '/status/:recruitmentId/self-introduce',
    RECURRING_NOTE_PATH: '/status/:recruitmentId/recurring-note',
    NEW_ARCHIVING_PATH: '/status/:recruitmentId/archivings',
    ARCHIVING_PATH: '/status/:recruitmentId/archivings/:archiveId',

    CAREER_PATH: '/setting',
    SPECIAL_EXPERIENCE_PATH: '/setting/special-experience',
}



import { useNavigate } from "react-router-dom";
// 기업 일정 상세보기 페이지로 이동하는 훅
export function useNavigationStatusByRecruitmentId() {
  const navigate = useNavigate();

  // recruitmentId를 매개변수로 받지 않고, 반환되는 함수가 실행될 때 recruitmentId를 전달받도록 함
  const goStatusByRecruitmentId = (recruitmentId: number) => {
    navigate(`${PATHS.STATUS_PATH}/${recruitmentId}`);
  };

  return goStatusByRecruitmentId;
}