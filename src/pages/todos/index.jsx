import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/lists.module.scss";
import TaskList from "@/components/taskList";
import TaskModal from "@/components/taskModal";
import Navbar from "@/components/navbar";
import Loader from "@/components/loader/Loader.jsx";
import Header from "@/components/header";

const TodosPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
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
  }, [session]);

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

  return session ? (
    <div>
      <Header />
      <div className={styles.list_wrapper}>
        <h2>Your Todos</h2>
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
    </div>
  ) : (
    <Loader />
  );
};

export default TodosPage;
