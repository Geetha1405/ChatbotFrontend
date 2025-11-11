import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Chat from "./components/chat";
import AppLayout from "./components/appLayout";
import LoginPage from "./components/login";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="" element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
