import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RoomPage from "./pages/room/RoomPage";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-red-900 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white">
        404 Page Not Found
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/room/:roomId"
          element={<RoomPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;