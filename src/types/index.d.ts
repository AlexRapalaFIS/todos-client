type User = {
  id: number;
  username: string;
};

type UserLogin = {
  username: string;
  password: string;
};

type UserWithToken = {
  user: User;
  token: string;
};

type Todo = {
  id: number;
  name: string;
  description: string;
  status: "PENDING" | "COMPLETED" | "CANCELED";
};

type NewTodo = {
  name: string;
  description: string;
  status: "PENDING" | "COMPLETED" | "CANCELED";
};

export { Todo, NewTodo, User, UserLogin, UserWithToken };
