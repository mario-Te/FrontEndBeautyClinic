import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Navbar from "./Layout/Navbar";
import Profile from "./Pages/Profile";
import Footer from "./Layout/Footer";
import LoginPage from "./Pages/Login";
import RegistrationForm from "./Pages/Register";
import ServicePge from "./Pages/Services";
import UpdateProfile from "./Pages/UpdateProfile";
import UpdatePassword from "./Pages/UpdatePassword";
import AdminService from "./Pages/Admin/Services/index";
import AdminUpdateUser from "./Pages/Admin/Services/UpdateService";
import AdminUser from "./Pages/Admin/Users/index";
import AdminMsg from "./Pages/Admin/Messages/index";
import AdminAppointment from "./Pages/Admin/Appointments/index";
import AdminAddService from "./Pages/Admin/Services/AddService";
import AdminAddUser from "./Pages/Admin/Users/AddUser";
import AdminAddAppointment from "./Pages/Admin/Appointments/AddAppointment";
import AdminReviews from "./Pages/Admin/Rates/index";
import "swiper/css";
import { useSelector } from "react-redux";
import { selectAuthentication } from "./slices/auth";
import { AdminPage } from "./Protected";
import AboutUsSection from "./components/About";

function App() {
  const authentication = useSelector(selectAuthentication);
  const isAdmin: boolean = authentication.Role === "Admin";
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/services/:title" element={<ServicePge />} />
        <Route path="/search/" element={<HomePage />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        {/**Admin Panel Routes */}
        <Route
          path="/AdminDashboard"
          element={
            <AdminPage isAdmin={isAdmin} Children={<AdminUser />}></AdminPage>
          }
        />
        <Route
          path="/UpdateService/:title"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminUpdateUser />}
            ></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/services"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminService />}
            ></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/users"
          element={
            <AdminPage isAdmin={isAdmin} Children={<AdminUser />}></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/messages"
          element={
            <AdminPage isAdmin={isAdmin} Children={<AdminMsg />}></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/reviews"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminReviews />}
            ></AdminPage>
          }
        />

        <Route
          path="/AdminDashboard/addUser"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminAddUser />}
            ></AdminPage>
          }
        />
        <Route
          path="AdminDashboard/appointments"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminAppointment />}
            ></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/addservices"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminAddService />}
            ></AdminPage>
          }
        />
        <Route
          path="/AdminDashboard/addAppointment"
          element={
            <AdminPage
              isAdmin={isAdmin}
              Children={<AdminAddAppointment />}
            ></AdminPage>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
