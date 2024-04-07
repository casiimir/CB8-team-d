import React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskList from "../../components/taskList";
import TaskModal from "@/components/taskModal";

// const createNewHabit = async (userId, setHabits) => {
//   const response = await fetch("/api/habits", {
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
//     const newHabit = await response.json();
//     console.log(newHabit.data);
//     setHabits((prevHabits) => [...prevHabits, newHabit.data]);
//   } else {
//     const error = await response.json();
//     console.error(error);
//   }
// };

const HabitsPage = ({ session }) => {
  const router = useRouter();
  const [habits, setHabits] = useState([]);

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

  return (
    <div>
      <h1>Welcome to the Habits Page</h1>
      {/* <button onClick={() => createNewHabit(session.user._id, setHabits)}>
        Create new habit
      </button> */}
      <TaskModal
        setTasks={setHabits}
        dataModal={("New Habit", false)}
        session={session}
      />
      <TaskList tasks={habits} backgroundChange={false} />
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
