import { useState, useEffect } from "react";

export default function Dailies() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((todos) => setTodos(todos.data));
  }, []);

  return (
    <div>
      <h2>Lista todos</h2>
      {todos.length > 0 &&
        todos.map((todo) => (
          <div key={todo._id}>
            <p>{todo.title}</p>
          </div>
        ))}
    </div>
  );
}
