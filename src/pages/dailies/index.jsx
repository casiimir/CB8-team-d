import React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/lists.module.scss";
import TaskList from "../../components/taskList";
import TaskModal from "@/components/taskModal";
import Navbar from "@/components/navbar";
import Loader from "@/components/loader/Loader.jsx";

const DailiesPage = ({ session }) => {
  const router = useRouter();
  const [dailies, setDailies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadDailies = async () => {
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/dailies?userId=${userId}`);
        if (response.ok) {
          const dailies = await response.json();
          setDailies(dailies.data);
        } else {
          console.error("Failed to load dailies");
        }
      } else {
        console.log("No session");
        router.push("/login");
      }
    };

    loadDailies();
  }, [router, session]);

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
            daily.id === id ? { ...daily, ...updatedDaily } : daily
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return session ? (
    <div className={styles.list_wrapper}>
      <h2>Your Dailies</h2>
      {/* <button onClick={() => createNewDaily(session.user._id, setDailies)}>
        Create new daily
      </button> */}
      {isModalOpen && (
        <TaskModal
          setTasks={setDailies}
          dataModal={("New Daily", false)}
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
  ) : (
    <div>
      <Loader />
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

export default DailiesPage;
