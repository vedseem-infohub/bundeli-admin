import AdminLoginPage from "@/components/auth/AdminLoginPage";
import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "Atelier Admin Sign In | Bundeli Kalavrat",
  description: "Strict curatorial authentication for Bundeli Kalavrat administrators.",
};

export default function LoginPage() {
  return (
    <AdminProvider>
      <AdminLoginPage />
    </AdminProvider>
  );
}
