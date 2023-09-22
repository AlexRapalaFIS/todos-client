import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "./App.css";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import { useEffect, useState } from "react";
import { getTodos, newTodo, updateTodo } from "./query/queries";
import { NewTodo, Todo } from "./types";

const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  // Queries
  const { isLoading, error, data, refetch } = useQuery("todos", getTodos);
  const mutation = useMutation({
    mutationFn: newTodo,
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
  });

  useEffect(() => {
    if (mutation.data || updateMutation.data) {
      refetch();
    }
  }, [mutation.data, refetch, updateMutation.data]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const complete = (todo: Todo) => {
    updateMutation.mutate(todo);
  };

  const addNewTodo = () => {
    if (!name || !description) {
      return;
    }

    const newTodoData: NewTodo = {
      name: name,
      description: description,
      status: "PENDING",
    };
    mutation.mutate(newTodoData);
  };

  console.log(mutation.data);

  return (
    <div>
      <TodoList>
        {data.map(
          (todo: Todo) =>
            todo.status !== "COMPLETED" && (
              <li>
                {todo.name} - {todo.description} - {todo.status}
                <button onClick={() => complete(todo)}>Complete Todo</button>
              </li>
            )
        )}
      </TodoList>
      <CreateTodo>
        <input onKeyUp={(e) => setName((e.target as HTMLInputElement).value)} />
        <input
          onKeyUp={(e) => setDescription((e.target as HTMLInputElement).value)}
        />
        <button onClick={addNewTodo}>Create Todo</button>
      </CreateTodo>
    </div>
  );
}

export default App;
