import { format, differenceInHours } from "date-fns";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Task = ({
  title,
  streakCount,
  id,
  lastCompleted,
  deadline,
  deleteFunction,
}) => {
  const [completed, setCompleted] = useState(false);
  const [currentStreakCount, setCurrentStreakCount] = useState(streakCount);
  const [newLastCompleted, setNewLastCompleted] = useState(null);

  const router = useRouter();

  // const handleDeleteClick = async () => {
  //   const endpoint = `/api${router.asPath}/${id}`;
  //   const response = await fetch(endpoint, {
  //     method: "DELETE",
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to delete task");
  //   }
  // };

  useEffect(() => {
    setCurrentStreakCount(streakCount);
  }, [streakCount]);

  const handleCompleteClick = () => {
    setCompleted(!completed);
    if (streakCount !== undefined) {
      const newStreakCount = Math.min(currentStreakCount + 1, 7);
      setCurrentStreakCount(newStreakCount);
    }
    setTimeout(() => {
      if (router.pathname === "/habits") {
        setCompleted(false);
      }
    }, 1000);

    //da rivedere quando che si dovrà aggiornare il database.

    const currentDate = new Date();

    setNewLastCompleted(currentDate);
  };
  const formattedDeadline = deadline
    ? format(new Date(deadline), "dd/MM/yyyy HH:mm")
    : "";

  const lastCompletedDate = lastCompleted ? new Date(lastCompleted) : null;
  const newLastCompletedDate = newLastCompleted
    ? new Date(newLastCompleted)
    : null;
  const latestCompletedDate =
    newLastCompletedDate > lastCompletedDate
      ? newLastCompleted
      : lastCompletedDate;
  const formattedLatestCompleted = latestCompletedDate
    ? format(latestCompletedDate, "dd/MM/yyyy HH:mm")
    : "";

  useEffect(() => {
    if (lastCompletedDate) {
      const currentDate = new Date();

      const hoursDifference = differenceInHours(
        currentDate,
        formattedLatestCompleted
      );

      // Qui controlla se sono passate più di 24 ore dall'ultimo completamento (latestCompletedDate) o dal dato presente nel database
      // (lastCompletedDate). Se sono passate più di 24 ore azzera lo StreakCount.
      // Forse dovremmo mettere più di 24 ore? (posso svolgere un habit alle 8 del lunedì
      // e poi alle 20 del martedì). Non trovo in date-fns qualcosa che aiuti in tal senso.
      // inoltre al momento non posso controllare che funzioni davvero.

      if (hoursDifference >= 24) {
        setCurrentStreakCount(0);
      }
    }
  }, [latestCompletedDate, formattedLatestCompleted]);

  let additionalClassName = "";
  switch (router.pathname) {
    case "/habits":
      additionalClassName = "habits";
      break;
    case "/dailies":
      additionalClassName = "dailies";
      break;
    case "/todos":
      additionalClassName = "todos";
      break;
    default:
      break;
  }

  return (
    <div className={`${styles.Task} ${styles[additionalClassName]}`}>
      <div className={styles.deleteBtnWrapper}>
        <button
          className={styles.deleteBtn}
          onClick={async () => await deleteFunction(id)}
        >
          X
        </button>
      </div>
      <div className={styles.title_streak}>
        <p>{title}</p>
        {lastCompleted && <p>Last Completed: {formattedLatestCompleted}</p>}
        {deadline && <p>Deadline: {formattedDeadline}</p>}
        {(streakCount !== undefined || streakCount === 0) && (
          <div className={styles.streakContainer}>
            {[...Array(7)].map((_, index) => (
              <span
                key={index}
                className={`${styles.streak} ${
                  index < currentStreakCount ? styles.active : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.completeBtn}>
        <button
          className={`${styles.button} ${completed ? styles.completed : ""}`}
          onClick={handleCompleteClick}
        ></button>
      </div>
    </div>
  );
};

export default Task;
