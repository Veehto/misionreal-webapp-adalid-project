import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import Home from "../views/Home";
import Login from "../views/Login";
// dashboard import
import AppointmentsView from "../views/AppointmentsView";
import DoctorListView from "../views/DoctorListView";
import ServicesListView from "../views/ServiceListView";
import SecureRoute from "./SecureRoute";

const AppRoutes = ({ onRender }) => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/dashboard" element={<SecureRoute allowedRoles={["admin"]}><Dashboard /></SecureRoute>} /> */}
                    <Route path="/appointments" element={<SecureRoute allowedRoles={["admin"]}><AppointmentsView /></SecureRoute>} />
                    <Route path="/doctors" element={<SecureRoute allowedRoles={["admin", "user"]}><DoctorListView onRender={onRender} /></SecureRoute>} />
                    <Route path="/services" element={<SecureRoute allowedRoles={["admin", "user"]}><ServicesListView /></SecureRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default AppRoutes;