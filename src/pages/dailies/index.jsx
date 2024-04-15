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

const DailiesPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirects or handles unauthenticated status
      router.push("/login");
    },
  });
  const [dailies, setDailies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchDailies() {
      if (session) {
        try {
          const response = await fetch(
            `/api/dailies?userId=${session.user._id}`
          );
          if (!response.ok) throw new Error("Failed to fetch dailies");
          const data = await response.json();
          setDailies(data.data);
        } catch (error) {
          console.error("Error loading dailies:", error.message);
        }
      }
    }
    fetchDailies();
  }, [session]);

  const handleDeleteClick = async (id) => {
    const endpoint = `/api/dailies/${id}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete task");
    } else {
      setDailies(dailies.filter((daily) => daily._id !== id));
    }
  };

  const handleDailyChangeClick = async (id, title, complete, lastCompleted) => {
    try {
      const endpoint = `/api/dailies/${id}`;
      const newBody = {
        title: title,
        complete: complete,
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
        throw new Error("Failed to update daily");
      } else {
        const updatedDaily = await response.json();
        setDailies((prevDailies) =>
          prevDailies.map((daily) =>
            daily.id === id ? { ...daily, ...updatedDaily.data } : daily
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return session ? (
    <div>
      <Header />
      <div className={styles.list_wrapper}>
        <h2>Your Dailies</h2>
        {isModalOpen && (
          <TaskModal
            setTasks={setDailies}
            dataModal={{ pageTitle: "New Daily", showDateInput: false }}
            session={session}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
        <TaskList
          tasks={dailies}
          deleteFunction={handleDeleteClick}
          updateDailyFunction={handleDailyChangeClick}
        />
        <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default DailiesPage;
