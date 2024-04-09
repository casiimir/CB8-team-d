import React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskList from "../../components/taskList";
import TaskModal from "@/components/taskModal";
import Navbar from "@/components/navbar";

// const createNewTodo = async (userId, setTodos) => {
//   const response = await fetch("/api/todos", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     //questo e' il body per la creazione dell'habit
//     body: JSON.stringify({
//       title: "Lallalero", //il titolo dell'habit lo sceglie l'utente inserendolo nel form, allo stato attuale e' fisso
//       userId, //lo userId dipende sempre dalla session, se nopn c'e' session non si puo' creare un habit e vieni reindirizzato alla pagina di login
//     }),
//   });

//   if (response.ok) {
//     const newTodo = await response.json();
//     console.log(newTodo.data);
//     setTodos((prevTodos) => [...prevTodos, newTodo.data]);
//   } else {
//     const error = await response.json();
//     console.error(error);
//   }
// };

const TodosPage = ({ session }) => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDeleteClick = async (id) => {
    const endpoint = `/api/todos/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete task");
    } else {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  const handleTodoChangeClick = async (id, title, complete, deadline) => {
    try {
      const endpoint = `/api/todos/${id}`;
      const newBody = {
        title: title,
        complete: complete,
        deadline: deadline,
      };

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      } else {
        //   const updatedTodo = await response.json();
        //   setTodos((prevTodos) =>
        //     prevTodos.map((todo) =>
        //       todo.id === id ? { ...todo, ...updatedTodo } : todo
        //     )
        //   );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to the Todos Page</h1>
      {/* <button onClick={() => createNewTodo(session.user._id, setTodos)}>
        Create new todo
      </button> */}
      {isModalOpen && (
        <TaskModal
          setTasks={setTodos}
          dataModal={{ pageTitle: "New To-do", showDateInput: true }}
          session={session}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
      <TaskList
        tasks={todos}
        deleteFunction={handleDeleteClick}
        updateTodoFunction={handleTodoChangeClick}
      />
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
