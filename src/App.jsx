import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./modules/Admin";
import Login from "./modules/Login";
import Register from "./modules/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
