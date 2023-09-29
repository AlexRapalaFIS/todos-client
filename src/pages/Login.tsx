import { SyntheticEvent, useContext, useEffect, useState } from "react";
import LoginFormWrapper from "../components/LoginFormWrapper";
import { useMutation } from "react-query";
import { login } from "../query/queries";
import { UserLogin, UserWithToken } from "../types";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { user, setUser } = useContext(UserContext);
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      data?.json().then((data: UserWithToken) => {
        if (data.token) {
          setUser(data.user);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      });
    },
  });

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formData: UserLogin = {
      username: username || "",
      password: password || "",
    };
    mutate(formData);
    console.log(formData);
  };

  useEffect(() => {}, [user, navigate]);

  return (
    <LoginFormWrapper>
      <form onSubmit={formSubmit}>
        <input
          onKeyUp={(e) => setUsername((e.target as HTMLInputElement).value)}
          placeholder="Username"
        />
        <input
          onKeyUp={(e) => setPassword((e.target as HTMLInputElement).value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </LoginFormWrapper>
  );
};

export default Login;
