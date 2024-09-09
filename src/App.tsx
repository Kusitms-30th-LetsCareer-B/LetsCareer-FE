import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PATHS} from "./Path";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import PlannerSideBar from "./components/Layout/PlannerSideBar";
import MainPage from "./pages/Main/MainPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import RecruScheduleEnvPage from "./pages/RecruScheduleEnv/RecruScheduleEnvPage.tsx";
import StatusPage from "./pages/Status/StatusPage";
import CareerPage from "./pages/Career/CareerPage";
import SelfIntroducePage from "./pages/Status/SelfIntroducePage";
import DetailStatusPage from "./pages/Status/DetailStatusPage";
import RecurringNotePage from "./pages/Status/RecurringNotePage";
import ArchivingPage from "./pages/Status/ArchivingPage";

import { userInfo } from "./shared/api/loginInstance.ts"; /* 로그인 정보 받기 */
import SpecialExperience from "./pages/Career/components/SpecialExperience.tsx";
import NewArchivingPage from "./pages/Status/NewArchivingPage.tsx";

const testUser: userInfo = {
  userId: 1,
  userName: "오민지",
};

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <PlannerSideBar>
        <Routes>
          <Route
            path={PATHS.HOME_PATH}
            element={
              <MainPage userId={testUser.userId} userName={testUser.userName} />
            }
          />
          <Route
            path={PATHS.CALENDAR_PATH}
            element={
              <CalendarPage
                userId={testUser.userId}
                userName={testUser.userName}
              />
            }
          />
          <Route path={PATHS.RECRU_SCHEDULE_ENV_PATH} element={<RecruScheduleEnvPage />} />
          <Route path={PATHS.STATUS_PATH} element={<StatusPage />} />
          <Route path={PATHS.DETAIL_STATUS_PATH} element={<DetailStatusPage />} />
          <Route
            path={PATHS.SELF_INTRODUCE_PATH}
            element={<SelfIntroducePage />}
          />
          <Route
            path={PATHS.RECURRING_NOTE_PATH}
            element={<RecurringNotePage />}
          />
          <Route
            path={PATHS.NEW_ARCHIVING_PATH}
            element={<NewArchivingPage />}
          />
          <Route
            path={PATHS.ARCHIVING_PATH}
            element={<ArchivingPage />}
          />
          <Route path={PATHS.CAREER_PATH} element={<CareerPage />} />
          <Route
            path={PATHS.SPECIAL_EXPERIENCE_PATH}
            element={<SpecialExperience />}
          />
        </Routes>
      </PlannerSideBar>
      <Footer />
    </Router>
  );
}

export default App;
