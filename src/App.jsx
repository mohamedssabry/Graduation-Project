import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./modules/Auth/Admin";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import AuthLayout from "./modules/shared/components/template/AuthLayout";
import UpdatePassword from "./modules/Auth/UpdatePassword";
import NewPassword from "./modules/Auth/NewPassword";
import VerificationCode from "./modules/Auth/OtpCode";
import GenerateForm from "./modules/GenerateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Admin Route */}
        <Route path="/" element={<Admin />} />

        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthLayout />}> 
          <Route index element={<Login />} /> {/* Default route for /auth */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="verify-otp" element={<VerificationCode />} />
        </Route>
        <Route path="generate-table" element={<GenerateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
