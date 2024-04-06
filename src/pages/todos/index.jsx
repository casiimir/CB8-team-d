import React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskList from "../../components/taskList";

const createNewTodo = async (userId, setTodos) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //questo e' il body per la creazione dell'habit
    body: JSON.stringify({
      title: "Lallalero", //il titolo dell'habit lo sceglie l'utente inserendolo nel form, allo stato attuale e' fisso
      userId, //lo userId dipende sempre dalla session, se nopn c'e' session non si puo' creare un habit e vieni reindirizzato alla pagina di login
    }),
  });

  if (response.ok) {
    const newTodo = await response.json();
    console.log(newTodo.data);
    setTodos((prevTodos) => [...prevTodos, newTodo.data]);
  } else {
    const error = await response.json();
    console.error(error);
  }
};

const TodosPage = ({ session }) => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/todos?userId=${userId}`);
        if (response.ok) {
          const todos = await response.json();
          setTodos(todos.data);
        } else {
          console.error("Failed to load todos");
        }
      } else {
        console.log("No session");
        router.push("/login");
      }
    };

    loadTodos();
  }, [router, session]);

  return (
    <div>
      <h1>Welcome to the Todos Page</h1>
      <button onClick={() => createNewTodo(session.user._id, setTodos)}>
        Create new todo
      </button>
      <TaskList tasks={todos} backgroundChange={true} />
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default TodosPage;
