import { ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useMutation } from "react-query";
import { getUser } from "../query/queries";
import { User } from "../types";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token") || "";

  const mutation = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      data.json().then((data: User) => setUser(data));
    },
  });

  useEffect(() => {
    if (token.length > 0) {
      mutation.mutate(token);
    }
  }, []);

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
