import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
