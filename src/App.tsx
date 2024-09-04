import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import PlannerSideBar from "./components/Layout/PlannerSideBar";
import MainPage from "./pages/Main/MainPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import StatusPage from "./pages/Status/StatusPage";
import CareerPage from "./pages/Career/CareerPage";
import SelfIntroducePage from "./pages/Status/SelfIntroducePage";
import DetailStatusPage from "./pages/Status/DetailStatusPage";
import RecurringNotePage from "./pages/Status/RecurringNotePage";

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <PlannerSideBar>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/status/:companyId" element={<DetailStatusPage />} />
          <Route
            path="/status/:companyId/self-introduce"
            element={<SelfIntroducePage />}
          />
          <Route
            path="/status/:companyId/recurring-note"
            element={<RecurringNotePage />}
          />
          <Route path="/setting" element={<CareerPage />} />
        </Routes>
      </PlannerSideBar>
      <Footer />
    </Router>
  );
}

export default App;
