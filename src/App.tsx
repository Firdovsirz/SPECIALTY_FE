import Blank from "./pages/Blank";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Dashboard/Home";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AppLayout from "./layout/AppLayout";
import type { JwtPayload } from "jwt-decode";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import UserProfiles from "./pages/UserProfiles";
import NewTlo from "./components/newTlo/NewTlo";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import NewGcoPage from "./pages/NewGcoPage/NewGcoPage";
import NewPloPage from "./pages/NewPloPage/NewPloPage";
import NewSloPage from "./pages/NewSloPage/NewSloPage";
import TopicsPage from "./pages/TopicsPage/TopicsPage";
import NewCloPage from "./pages/NewCloPage/NewCloPage";
import SubjectsPage from "./pages/SubjectsPage/SubjectsPage";
import NewTopicPage from "./pages/NewTopicPage/NewTopicPage";
import { ScrollToTop } from "./components/common/ScrollToTop";
import NewSubjectPage from "./pages/NewSubjectPage/NewSubjectPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SpecialtiesPage from "./pages/SpecialtiesPage/SpecialtiesPage";
import LiteraturesPage from "./pages/LiteraturesPage/LiteraturesPage";
import SubjectDeails from "./components/subjectDetails/SubjectDetails";
import NewSpecialtyPage from "./pages/NewSpecialtyPage/NewSpecialtyPage";
import TopicDetailsPage from "./pages/TopicDetailsPage/TopicDetailsPage";
import NewCompetencyPage from "./pages/NewCompetencyPage/NewCompetencyPage";
import SpecialtyDetailsPage from "./pages/SpecialtyDetails/SpecialtyDetails";
import NewLiteraturePage from "./pages/NewLiteraturePage/NewLiteraturePage";
import SubjectMatchingTablePage from "./pages/SubjectMatchingTablePage/SubjectMatchingTablePage";
import SubjectsSillabusPage from "./pages/SubjectSillabusPage/SubjectSillabusPage";
import NewSpecCharPage from "./pages/NewSpecCharPage/NewSpecCharPage";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isValid = isTokenValid(token);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={!isValid ? (<Navigate to={"/signin"} replace/>) : (<AppLayout />)}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/blank" element={<Blank />} />

            {/* Specialties */}
            <Route path="/specialties" element={<SpecialtiesPage />} />
            <Route path="/specialty-details" element={<SpecialtyDetailsPage />} />
            <Route path="/new-specialty" element={<NewSpecialtyPage />} />

            {/* Specialty characteristics */}
            <Route path="/specialty-details/new-specialty-characteristics" element={<NewSpecCharPage />} />

            {/* Curriculum details */}
            {/* <Route path="/specialty-details/curriculum" element={<CurriculumDetailsPage />} /> */}

            {/* Subjects */}
            <Route path="/specialty-details/subjects" element={<SubjectsPage />} />
            <Route path="/specialty-details/subjects/new" element={<NewSubjectPage />} />
            <Route path="/specialty-details/subjects/subject-details" element={<SubjectDeails />} />
            <Route path="/specialty-details/subjects/subject-matching-table" element={<SubjectMatchingTablePage />} />
            <Route path="/specialty-details/subjects/subject-details/sillabus" element={<SubjectsSillabusPage />} />

            {/* Topics */}
            <Route path="/specialty-details/subjects/topics" element={<TopicsPage />} />
            <Route path="/specialty-details/subjects/topics/new" element={<NewTopicPage />} />
            <Route path="/specialty-details/subjects/topics/details" element={<TopicDetailsPage />} />
            <Route path="/specialty-details/subjects/topics/new-tlo" element={<NewTlo />} />

            {/* Program Learning Outcomes (PLO) */}
            <Route path="/specialty-details/new-plo" element={<NewPloPage />} />

            {/* Student Learning Outcomes (SLO) */}
            <Route path="/specialty-details/new-slo" element={<NewSloPage />} />

            {/* Graduate Career Opportunities (GCO) */}
            <Route path="/specialty-details/new-gco" element={<NewGcoPage />} />

            {/* Course Learning Outcomes (CLO) */}
            <Route path="/specialty-details/subjects/subject-details/new-clo" element={<NewCloPage />} />

            {/* Competency */}
            <Route path="/specialty-details/new-competency" element={<NewCompetencyPage />} />

            {/* Literatures */}
            <Route path="/literatures" element={<LiteraturesPage />} />
            <Route path="/new-literature" element={<NewLiteraturePage />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
