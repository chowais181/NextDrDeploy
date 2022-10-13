import "./assets/App.css";
import ScrollToTop from "react-scroll-to-top";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//--------------------pages-------------------
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./Pages/LandingPage";
import MyInfo from "./Pages/user/MyInfo";
// -------------------------------------------

import { Toaster } from "react-hot-toast";

//----------Routes------------
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/routing/PublicRoute";
import ProtectedDoctorRoute from "./components/routing/ProtectedDoctorRoute";
import ProtectedAdminRoute from "./components/routing/ProtectedAdminRoute";
//------------------------------

import Profile from "./components/profile/Profile";
import AppointmentForm from "./components/bookAppointment/AppointmentForm";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import Appointments from "./Pages/patient/Appointments";
// ---------- Dr routes ---------------
import EditProfile from "./components/profile-forms/EditProfile";
import PatientAppointments from "./Pages/doctor/PatientAppointments";
import DoctorDashboard from "./components/doctor-dashboard/Dashboard";
import ViewProfile from "./components/profile-forms/ViewProfile";

// ---------- Admin routes --------------
import UsersList from "./components/admin/UsersList";
import DoctorsList from "./components/admin/DoctorsList";
import AdminDashboard from "./components/admin/Dashboard";
//------------------------------

function App() {
  const { myProfile } = useSelector((state) => state.profile);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottom-center" reverseOrder={false} />
        <ScrollToTop smooth />

        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myinfo"
            element={
              <ProtectedRoute>
                <MyInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/doctor/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/appointment/:id"
            element={
              <ProtectedRoute>
                <AppointmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                {myProfile ? <EditProfile /> : <Home />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-profile"
            element={
              <ProtectedRoute>
                {myProfile ? <ViewProfile /> : <Home />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-education"
            element={
              <ProtectedRoute>
                {myProfile ? <AddEducation /> : <Home />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-experience"
            element={
              <ProtectedRoute>
                {myProfile ? <AddExperience /> : <Home />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          {/*------------ doctor routes --------------*/}
          <Route
            path="/dashboard"
            element={
              <ProtectedDoctorRoute>
                <DoctorDashboard />
              </ProtectedDoctorRoute>
            }
          />

          <Route
            path="/patient-appointments"
            element={
              <ProtectedDoctorRoute>
                <PatientAppointments />
              </ProtectedDoctorRoute>
            }
          />
          {/*------------ admin routes --------------*/}
          <Route
            path="/user-list"
            element={
              <ProtectedAdminRoute>
                <UsersList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/doctor-list"
            element={
              <ProtectedAdminRoute>
                <DoctorsList />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/doctor-list/doctor/:id"
            element={
              <ProtectedAdminRoute>
                <Profile />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/404"
            element={
              <PublicRoute>
                <PageNotFound />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
