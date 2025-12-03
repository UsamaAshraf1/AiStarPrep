import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/userManagement/UserManagement";
import SignUp from "../pages/authentication/signUp";
import SignIn from "../pages/authentication/signIn";
import ForgotPassword from "../pages/authentication/forgotPassword";
import EmailVerification from "../pages/authentication/verifyEmail";
import CreateNewPassword from "../pages/authentication/createNewPassword";
import PasswordResetSucess from "../pages/authentication/passwordResetSucces";
import LearnMode from "../pages/user/learMode/LearnMode";
import ExamMode from "../pages/user/examsMode/ExamMode";
import PracticeMcqs from "../pages/user/learMode/PracticeMcqs";
import PracticeNumericals from "../pages/user/learMode/PracticeNumericals";
import UserProfile from "../pages/user/profileSetting/UserProfile";
import LearningAnalytics from "../pages/user/learningAnalytics/LearningAnalytics";
import AnalyticsDetails from "../pages/user/learningAnalytics/AnalyticsDetails";
import SubscriptionPlans from "../pages/user/subscription/SubscriptionPlans";
import FreeTrialDetails from "../pages/user/subscription/FreeTrialDetails";
import CourseDetails from "../pages/user/subscription/CourseDetail";
import Cart from "../pages/user/subscription/Cart";
import ContactUs from "../pages/user/contactUs/ContactUs";
import Notification from "../pages/user/notifications/Notification";
import NotificatioDetails from "../pages/user/notifications/NotificatioDetails";
import LogoutModal from "../Components/Modals/LogoutModal";
import ReferralPage from "../pages/user/referral/ReferralPage";
import LearnSession from "../pages/user/learMode/LearnSession";
import ExamSession from "../pages/user/examsMode/ExamSession";
import SessionResult from "../pages/user/learMode/SessionResult";
import ExamInstruction from "../pages/user/examsMode/ExamInstruction";
import ExamResult from "../pages/user/examsMode/ExamResult";
import UserDetail from "../pages/admin/userManagement/UserDetail";
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";
import NotificationManagement from "../pages/admin/sendNotifications/NotificationManagement";
import NotificationDetails from "../pages/admin/sendNotifications/NotificationDetail";
import AiStarPrep from "../pages/landingPage/AiStarPrep";
import { Navigate } from "react-router-dom";
import SubscriberManagement from "../pages/admin/subscriberManagement/SubscriberManagement";
import SubscriptionManagement from "../pages/admin/subscriptionManagement/SubscriptionManagement";
import SubscriptionDetails from "../pages/admin/subscriptionManagement/SubscriptionDetails";
import UploadContent from "../pages/admin/uploadContent/UploadContent";
import ContentManagement from "../pages/admin/contentManagement/ContentManagement";
import PaymentPage from "../pages/user/subscription/PaymentPage";
import AnswersReview from "../pages/user/learningAnalytics/AnswersReview";
import PrivacyPolicy from "../pages/landingPage/PrivacyPolicy";
import TermsAndConditions from "../pages/landingPage/TermsAndCondition";
import UserFeedback from "../pages/admin/userFeedback/UserFeedback";
import SubscriberDetails from "../pages/admin/subscriberManagement/SubscriberDetails";
import NotFound from "../Components/NotFound";
import SuspendedUserInfo from "../Components/SuspendedUserInfo";
import ResetpasswordOtp from "../pages/authentication/ResetpasswordOtp";
import VoucherList from "../pages/admin/voucherManagement/VoucherList";

function AppRoutes() {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isSuspended: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const isSuspended = user?.suspended;
    setAuthState({ user, token, isSuspended, isLoading: false });
  }, []);

  if (authState.isLoading) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          authState.token ? (
            authState.user?.role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/user/dashboard" replace />
            )
          ) : (
            <AiStarPrep />
          )
        }
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

      {/* Authentication routes */}
      {/* <Route element={<AuthGuard />}> */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/verify-phone" element={<ResetpasswordOtp />} />
        <Route
          path="/auth/create-new-password"
          element={<CreateNewPassword />}
        /> */}
        <Route
          path="/auth/password-reset-success"
          element={<PasswordResetSucess />}
        />
      {/* </Route> */}

      {/* User Routes */}
      <Route
        path="/user"
        element={
          authState.token && authState.user?.role === "student" ? (
            authState.isSuspended ? (
              <SuspendedUserInfo />
            ) : (
              <UserLayout />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="learn" element={<LearnMode />} />
        <Route path="learn-session" element={<LearnSession />} />
        <Route path="learn-session-result" element={<SessionResult />} />
        <Route
          path="learn-session-result/review/:sessionId"
          element={<AnswersReview />}
        />
        <Route path="practice-mcqs" element={<PracticeMcqs />} />
        <Route path="exam" element={<ExamMode />} />
        <Route path="exam-instruction" element={<ExamInstruction />} />
        <Route path="exam-session" element={<ExamSession />} />
        <Route path="exam-result" element={<ExamResult />} />
        <Route path="exam-result/review/:examId" element={<AnswersReview />} />
        <Route path="practice-numericals" element={<PracticeNumericals />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="learning-analytics" element={<LearningAnalytics />} />
        <Route
          path="learning-analytics/details/exam/:examId"
          element={<AnalyticsDetails />}
        />
        <Route
          path="learning-analytics/details/learn/:sessionId"
          element={<AnalyticsDetails />}
        />

        <Route
          path="learning-analytics/details/exam/answers/:examId"
          element={<AnswersReview />}
        />
        <Route
          path="learning-analytics/details/learn/answers/:sessionId"
          element={<AnswersReview />}
        />
        <Route path="subscription-plans" element={<SubscriptionPlans />} />
        <Route path="free-trial" element={<FreeTrialDetails />} />
        <Route path="course-detail/:planId" element={<CourseDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="make-payment/:paymentId" element={<PaymentPage />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="notifications/:id" element={<NotificatioDetails />} />
        <Route path="logout" element={<LogoutModal />} />
        <Route path="referral" element={<ReferralPage />} />
      </Route>

      {/* Admin Routes */}
      {/* <Route path="/admin" element={<AdminLayout />}> */}
      <Route
        path="/admin"
        element={
          authState.token && authState.user?.role === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-management" element={<UserManagement />} />
        {/* <Route path="user-management/detail" element={<UserDetail />} /> */}
        <Route path="user-management/detail/:userId" element={<UserDetail />} />
        <Route
          path="subscriber-management"
          element={<SubscriberManagement />}
        />
        <Route
          path="subscriber-management/detail/:id"
          element={<SubscriberDetails />}
        />
        <Route
          path="subscription-management"
          element={<SubscriptionManagement />}
        />
        <Route
          path="subscription-details/:planId"
          element={<SubscriptionDetails />}
        />
        <Route path="upload-content" element={<UploadContent />} />
        {/* <Route path="content-management" element={<ContentManagement />} /> */}
        <Route
          path="notification-management"
          element={<NotificationManagement />}
        />
        <Route path="notification/:id" element={<NotificationDetails />} />
        <Route path="user-feeback" element={<UserFeedback />} />
        <Route path="voucher" element={<VoucherList />} />
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
