import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import PlannerSideBar from "./components/Layout/PlannerSideBar";
import MainPage from "./pages/Main/MainPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import StatusPage from "./pages/Status/StatusPage";
import CareerPage from "./pages/Career/CareerPage";

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
          <Route path="/setting" element={<CareerPage />} />
        </Routes>
      </PlannerSideBar>
      <Footer />
    </Router>
  );
}

export default App;
