import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/lists.module.scss";
import TaskList from "../../components/taskList";
import TaskModal from "@/components/taskModal";
import Navbar from "@/components/navbar";
import Loader from "@/components/loader/Loader.jsx";
import Header from "@/components/header";

const HabitsPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCompleted, setLastCompleted] = useState(null);

  useEffect(() => {
    async function fetchHabits() {
      if (session) {
        try {
          const response = await fetch(
            `/api/habits?userId=${session.user._id}`
          );
          if (!response.ok) throw new Error("Failed to fetch habits");
          const data = await response.json();
          setHabits(data.data);
        } catch (error) {
          console.error("Error loading habits:", error.message);
        }
      }
    }
    fetchHabits();
  }, [session]);

  const handleDeleteClick = async (id) => {
    const endpoint = `/api/habits/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (response.ok) {
      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== id));
    } else {
      console.error("Failed to delete habit");
    }
  };

  const handleHabitChangeClick = async (id, title, streak, lastCompleted) => {
    const endpoint = `/api/habits/${id}`;
    const newBody = {
      title: title,
      streak: streak,
      lastCompleted: lastCompleted,
    };
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    });

    if (response.ok) {
      const updatedHabit = await response.json();
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id ? { ...habit, ...updatedHabit.data } : habit
        )
      );
    } else {
      console.error("Failed to update habit");
    }
  };

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <div className={styles.list_wrapper}>
        <h2>Your Habits</h2>
        {isModalOpen && (
          <TaskModal
            setTasks={setHabits}
            dataModal={{ pageTitle: "New Habit", showDateInput: false }}
            session={session}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
        <TaskList
          tasks={habits}
          deleteFunction={handleDeleteClick}
          updateHabitFunction={handleHabitChangeClick}
        />
        <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default HabitsPage;
