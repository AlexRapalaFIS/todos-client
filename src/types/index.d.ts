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

export { Todo, NewTodo };
