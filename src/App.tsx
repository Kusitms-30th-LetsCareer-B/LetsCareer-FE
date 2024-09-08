import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import PlannerSideBar from "./components/Layout/PlannerSideBar";
import MainPage from "./pages/Main/MainPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import ScheduleEnvPage from "./pages/ScheduleEnv/ScheduleEnvPage.tsx";
import StatusPage from "./pages/Status/StatusPage";
import CareerPage from "./pages/Career/CareerPage";
import SelfIntroducePage from "./pages/Status/SelfIntroducePage";
import DetailStatusPage from "./pages/Status/DetailStatusPage";
import RecurringNotePage from "./pages/Status/RecurringNotePage";
import ArchivingPage from "./pages/Status/ArchivingPage";

import { userInfo } from "./shared/api/loginInstance.ts"; /* 로그인 정보 받기 */
import SpecialExperience from "./pages/Career/components/SpecialExperience.tsx";

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
            path="/home"
            element={
              <MainPage userId={testUser.userId} userName={testUser.userName} />
            }
          />
          <Route
            path="/calendar"
            element={
              <CalendarPage
                userId={testUser.userId}
                userName={testUser.userName}
              />
            }
          />
          <Route path="/calendar/schedule" element={<ScheduleEnvPage />} />
          <Route path="/status/" element={<StatusPage />} />
          <Route path="/status/:recruitmentId" element={<DetailStatusPage />} />
          <Route
            path="/status/:recruitmentId/self-introduce"
            element={<SelfIntroducePage />}
          />
          <Route
            path="/status/:recruitmentId/recurring-note"
            element={<RecurringNotePage />}
          />
          <Route
            path="/status/:recruitmentId/:archivingId"
            element={<ArchivingPage />}
          />
          <Route path="/setting" element={<CareerPage />} />
          <Route
            path="/setting/special-experience"
            element={<SpecialExperience />}
          />
        </Routes>
      </PlannerSideBar>
      <Footer />
    </Router>
  );
}

export default App;
