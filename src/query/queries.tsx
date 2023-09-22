import { NewTodo, Todo } from "../types";

async function getTodos() {
  return await fetch("http://localhost:8000/api/todos/").then((resp) =>
    resp.json()
  );
}

async function newTodo(todo: NewTodo) {
  return await fetch("http://localhost:8000/api/todos/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((resp) => resp.json());
}

async function updateTodo(todo: Todo) {
  const updatedTodo = { ...todo };
  updatedTodo.status = "COMPLETED";
  console.log(updatedTodo === todo);

  return await fetch(`http://localhost:8000/api/todos/${todo.id}/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  }).then((resp) => resp.json());
}

export { getTodos, newTodo, updateTodo };
