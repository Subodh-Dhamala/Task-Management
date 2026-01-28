import { useAuth } from "./hooks/useAuth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Error from "./pages/Error";

//components
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/*public routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*protected routes*/}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
          </Route>
        </Route>

        {/*if no route matches*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
