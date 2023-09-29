import { NewTodo, Todo, UserLogin } from "../types";

async function getTodos() {
  return await fetch("http://localhost:8000/api/todos/", {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  }).then((resp) => resp.json());
}

async function newTodo(todo: NewTodo) {
  return await fetch("http://localhost:8000/api/todos/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
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
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedTodo),
  }).then((resp) => resp.json());
}

async function login(user: UserLogin) {
  return await fetch(`http://localhost:8000/api/login/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

async function getUser(token: string) {
  return await fetch("http://localhost:8000/api/user/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
}

export { getTodos, newTodo, updateTodo, login, getUser };
