import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { Home } from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RouteLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
type Props = {};

const App = (props: Props) => {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RouteLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
