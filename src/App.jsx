import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./modules/Auth/Admin";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import AuthLayout from "./modules/shared/components/template/AuthLayout";
import UpdatePassword from "./modules/Auth/UpdatePassword";
import NewPassword from "./modules/Auth/NewPassword";
import VerificationCode from "./modules/Auth/OtpCode";
import GenerateForm from "./modules/GenerateForm";
import PageLayout from "./modules/shared/components/template/PageLayout";

const EditInputs = () => <h2>Edit Inputs Page</h2>;
const EditTable = () => <h2>Edit Table Page</h2>;
const Home = () => <h2>Home Page</h2>;

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

        {/* Table Routes */}
        <Route path="/table" element={<PageLayout />}>
          <Route index element={<Home />} /> {/* Default route for /table */}
          <Route path="edit-inputs" element={<EditInputs />} />
          <Route path="new-table" element={<GenerateForm />} />
          <Route path="edit-table" element={<EditTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
