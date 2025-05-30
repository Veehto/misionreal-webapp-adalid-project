import DoctorProvider from "../contexts/DoctorContext"
import MainLayout from "../layouts/MainLayout";
import DoctorListContent from "../components/DoctorListContent";
import DoctorForm from "../components/DoctorForm";
import { useAuth } from "../contexts/AuthContext";

export default function DoctorListView({ onRender }) {
    const { user } = useAuth();

    return (
        <DoctorProvider>
            <MainLayout>
                <DoctorListContent onRender={onRender} />
                {user?.role === "admin" && <DoctorForm />}
            </MainLayout>
        </DoctorProvider>
    );
};