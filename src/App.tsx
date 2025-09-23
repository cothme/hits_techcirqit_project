// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Nested Routes inside DashboardLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Catch-all for unmatched routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
