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
export function useNavigationStatusByRecruitmentId(recruitmentId: number) {
  const navigate = useNavigate();

  const goStatusByRecruitmentId = () => {
    navigate(`${PATHS.STATUS_PATH}/${recruitmentId}`);
  };

  return goStatusByRecruitmentId;
}