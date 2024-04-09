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
  updateHabitFunction,
  updateDailyFunction,
  updateTodoFunction,
}) => {
  const [completed, setCompleted] = useState(false);
  const [currentStreakCount, setCurrentStreakCount] = useState(streakCount);
  const [newLastCompleted, setNewLastCompleted] = useState(lastCompleted);

  const router = useRouter();

  useEffect(() => {
    setCurrentStreakCount(streakCount);
  }, [streakCount]);

  const handleCompleteClick = async (e) => {
    e.preventDefault();
    const newCompletedValue = !completed;
    setCompleted(newCompletedValue);

    let newStreakCount = streakCount;

    if (streakCount !== undefined) {
      newStreakCount = Math.min(currentStreakCount + 1, 7);
      setCurrentStreakCount(newStreakCount);
      if (newStreakCount === 7) {
        setCurrentStreakCount(0);
      }
    }
    // setTimeout(() => {
    //   if (router.pathname === "/habits") {
    //     setCompleted(false);
    //   }
    // }, 1000);

    const currentDate = new Date();

    setNewLastCompleted(currentDate);

    if (router.pathname === "/habits") {
      await updateHabitFunction(id, title, newStreakCount, currentDate);
    }
    if (router.pathname === "/dailies") {
      await updateDailyFunction(id, title, newCompletedValue, currentDate);
    }
    if (router.pathname === "/todos") {
      await updateTodoFunction(id, title, newCompletedValue, deadline);
    }
  };
  const formattedDeadline = deadline
    ? format(new Date(deadline), "dd/MM/yyyy")
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
