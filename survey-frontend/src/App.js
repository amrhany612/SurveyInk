import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import SignupChoice from './pages/signupchoice';
import VerifyEmail from './components/Verify_email';
import ResearcherDashboard from './pages/Researcher/ReasearcherDashboard';
import CreateSurvey from './pages/Researcher/createSurvey'
import CreateQuestions from './pages/Researcher/CreateQuestions';
import AllSurveys from './pages/Researcher/AllSurvey';
import SurveyAnalysis from './pages/Survey/SurveyAnalysis'; // adjust path as needed
import Profile from './components/profile';
import SurveyForm from './pages/Survey/SurveyForm';
import SurveySubmissions from './pages/Researcher/SurveySubmission';
import FreelancerDashboard from './pages/Freelancer/freelancer-dashboard';
import EditSurvey from './pages/Survey/EditSurvey';
import EditSurveyQuestions from './pages/Survey/EditSurveyQuestion';
import SolvedSurveys from './pages/Freelancer/SolvedSurveys';
import PendingSurveys from './pages/Freelancer/PendingSurveys';
import CreateDemographic from './pages/Researcher/CreateDemographic';
import SolvedSurveyForm from './pages/Survey/SolvedSurveyForm';
import ViewFreelancerSubmission from './pages/Survey/ViewFreelancerSubmission';
import EditSurveyDemographics from './pages/Survey/EditSurveyDemographics';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import UnpublishedSurveys from './pages/Researcher/UnpublishedSurveys';
import TermsAndConditions from './pages/ContactAndTerms/TermsAndCondition';
import PrivacyPolicy from './pages/ContactAndTerms/PrivacyAndPoliciy';
import AboutUs from './pages/about_us';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminResearchers from './pages/admin/AdminResearchers';
import AdminFreelancers from './pages/admin/AdminFreelancers';
import ProofreadingPage from './pages/services/ProofreadingPage';
import DataAnalysisPage from './pages/services/DataAnalysisPage';
import PLSAnalysisPage from './pages/services/PLSAnalysisPage';
import PublishingPage from './pages/services/PublishingPage';
import SpecialRequestPage from './pages/services/SpecialRequestPage';
import ManageSurveysPage from './pages/admin/ManageSurveyPage';
import AdminLoginHistory from './pages/admin/AdminLoginHistory';
import AdminNotifications from './pages/admin/AdminNotification';
import AdminEmailLogs from './pages/admin/AdminEmailLogs';
// import Signup from './pages/Signup';
import profileBg from './assets/B.G.svg'; // تأكد من المسار

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideFooterRoutes = ['/researcher-dashboard',
    '/freelancer-dashboard',
    '/admin-dashboard',
    '/create-survey',
    '/all-surveys',
    '/unpublished-surveys',
    '/profile',
    '/all-response',
    '/surveys/solved',
    '/surveys/pending',
    '/admin/researchers',
    '/admin/freelancers',
    '/services/proofreading',
    '/services/data-analysis',
    '/services/pls',
    '/services/publishing',
    '/services/special',
    '/admin/surveys',
    '/admin/settings/login-history',
    '/admin/settings/notifications',
    '/admin/settings/email-logs',
    '/login',
    '/signup'





];
  const { i18n } = useTranslation();
  const isProfilePage = pathname === '/profile';

const hideFooter =
  hideFooterRoutes.some(route => pathname === route || pathname.startsWith(route + '/')) ||
  /^\/create-survey\/\d+\/questions$/.test(pathname) ||
  /^\/create-demographic\/\d+\/?$/.test(pathname)||
  /^\/survey\/\d+\/display\/?$/.test(pathname) ||
  /^\/survey\/\d+\/responses\/analysis\/?$/.test(pathname)||
  /^\/survey\/\d+\/edit\/?$/.test(pathname)||
  /^\/survey\/\d+\/submission\/\d+\/?$/.test(pathname)||
  /^\/survey\/\d+\/submissions\/?$/.test(pathname) ||                    
  /^\/edit-survey-demographics\/\d+\/?$/.test(pathname) ||               
  /^\/edit-survey-questions\/\d+\/?$/.test(pathname);   

 
  // const hideFooter = hideHeader
; // Just reuse the same logic to hide footer as well

  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [i18n.language]);
  return (
    <>
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundImage: isProfilePage ? `url(${profileBg})` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // optional: scrolls with page
      }}
    >
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupChoice />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
              <Route
          path="/admin/researchers"
          element={
            <PrivateRoute>
              <AdminResearchers />
            </PrivateRoute>
          }
        />
                      <Route
          path="/admin/freelancers"
          element={
            <PrivateRoute>
              <AdminFreelancers />
            </PrivateRoute>
          }
        />

        <Route
          path="/researcher-dashboard"
          element={
            <PrivateRoute>
              <ResearcherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-survey"
          element={
            <PrivateRoute>
              <CreateSurvey />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-survey/:surveyId/questions"
          element={
            <PrivateRoute>
              <CreateQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-demographic/:surveyId"
          element={
            <PrivateRoute>
              <CreateDemographic />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-surveys"
          element={
            <PrivateRoute>
              <AllSurveys />
            </PrivateRoute>
          }
        />
          <Route
          path="/unpublished-surveys"
          element={
            <PrivateRoute>
              <UnpublishedSurveys />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
          </PrivateRoute>
          }
        />
        <Route
          path="/survey/:id/display/"
          element={
            <PrivateRoute>
              <SurveyForm />
          </PrivateRoute>
          }
        />

        <Route
          path="/survey/:id/responses/analysis/"
          element={
            <PrivateRoute>
              <SurveyAnalysis />
          </PrivateRoute>
          }
        />
        <Route
          path="/survey/:id/submissions/"
          element={
            <PrivateRoute>
              <SurveySubmissions />
          </PrivateRoute>
          }
        />

        <Route
          path="/freelancer-dashboard"
          element={
            <PrivateRoute>
              <FreelancerDashboard />
          </PrivateRoute>
          }
        />
          <Route
          path="survey/:id/edit/"
          element={
            <PrivateRoute>
              <EditSurvey />
          </PrivateRoute>
          }
        />
        <Route
          path="/edit-survey-questions/:id"
          element={
            <PrivateRoute>
              <EditSurveyQuestions />
          </PrivateRoute>
          }
        />
        <Route
          path="/surveys/solved"
          element={
            <PrivateRoute>
              <SolvedSurveys />
          </PrivateRoute>
          }
        />
        <Route
          path="/surveys/pending"
          element={
            <PrivateRoute>
              <PendingSurveys />
          </PrivateRoute>
          }
        />
        <Route
          path="/surveys/solved/:id"
          element={
            <PrivateRoute>
              <SolvedSurveyForm />
          </PrivateRoute>
          }
        />
                <Route
          path="/edit-survey-demographics/:id"
          element={
            <PrivateRoute>
              <EditSurveyDemographics />
          </PrivateRoute>
          }
        />
          <Route
          path="/survey/:surveyId/submission/:freelancerId"
          element={
            <PrivateRoute>
              <ViewFreelancerSubmission />
          </PrivateRoute>
          }
        />
        <Route
          path="/services/proofreading"
          element={
            <PrivateRoute>
              <ProofreadingPage />
          </PrivateRoute>
          }
        />
                <Route
          path="/services/data-analysis"
          element={
            <PrivateRoute>
              <DataAnalysisPage />
          </PrivateRoute>
          }
        />
          <Route
          path="/services/pls"
          element={
            <PrivateRoute>
              <PLSAnalysisPage />
          </PrivateRoute>
          }
        />
                <Route
          path="/services/publishing"
          element={
            <PrivateRoute>
              <PublishingPage />
          </PrivateRoute>
          }
        />
        <Route
          path="/services/special"
          element={
            <PrivateRoute>
              <SpecialRequestPage />
          </PrivateRoute>
          }
        />

        <Route
          path="/admin/surveys"
          element={
            <PrivateRoute>
              <ManageSurveysPage />
          </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings/login-history"
          element={
            <PrivateRoute>
              <AdminLoginHistory />
          </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings/notifications"
          element={
            <PrivateRoute>
              <AdminNotifications />
          </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings/email-logs"
          element={
            <PrivateRoute>
              <AdminEmailLogs />
          </PrivateRoute>
          }
        />

      </Routes>
    {!hideFooter && <Footer />}
        </div>

    </>
  );

}


function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer />

    </Router>
    
  );
}

export default App;
