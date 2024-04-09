import React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskList from "../../components/taskList";
import TaskModal from "@/components/taskModal";
import Navbar from "@/components/navbar";

const HabitsPage = ({ session }) => {
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCompleted, setLastCompleted] = useState(null);

  useEffect(() => {
    const loadHabits = async () => {
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/habits?userId=${userId}`);
        if (response.ok) {
          const habits = await response.json();
          setHabits(habits.data);
        } else {
          console.error("Failed to load habits");
        }
      } else {
        console.log("No session");
        router.push("/login");
      }
    };

    loadHabits();
  }, [router, session]);

  const handleDeleteClick = async (id) => {
    const endpoint = `/api/habits/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete task");
    } else {
      setHabits(habits.filter((habit) => habit._id !== id));
    }
  };

  const handleHabitChangeClick = async (id, title, streak, lastCompleted) => {
    try {
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

      if (!response.ok) {
        throw new Error("Failed to update habit");
      } else {
        const updatedHabit = await response.json();
        // setHabits((prevHabits) =>
        //   prevHabits.map((habit) =>
        //     habit.id === id ? { ...habit, ...updatedHabit } : habit
        //   )
        //   );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Your Habits</h1>
      {isModalOpen && (
        <TaskModal
          setTasks={setHabits}
          dataModal={("New Habit", false)}
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
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default HabitsPage;
