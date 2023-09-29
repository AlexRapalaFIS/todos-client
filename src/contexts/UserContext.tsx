import { ReactNode, createContext, useState } from "react";
import { User } from "../types";

type UserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = (props: {
  user?: User;
  children: ReactNode;
}) => {
  const setUser = (user: User | null) => {
    setState({ ...state, user: user });
  };

  const initState: UserContext = {
    user: props.user || null,
    setUser: setUser,
  };

  const [state, setState] = useState(initState);
  console.log(state);
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
