import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContextProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider user={undefined}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
