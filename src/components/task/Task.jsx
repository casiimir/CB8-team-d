import { format } from "date-fns";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

const Task = ({
  title,
  streakCount,
  id,
  backgroundChange,
  lastCompleted,
  deadline,
}) => {
  const [completed, setCompleted] = useState(false);
  const [currentStreakCount, setCurrentStreakCount] = useState(streakCount);
  const [backgroundColor, setBackgroundColor] = useState("transparent");

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
      setCompleted(false);
    }, 1000);

    backgroundChange &&
      setBackgroundColor(completed ? "transparent" : "#ffa500");

    // Logica di BE per aggiornamento del database per quanto riguarda lo streak in /api/habits?
  };

  const formattedDeadline = deadline
    ? format(new Date(deadline), "dd/MM/yyyy HH:mm")
    : "";
  const formattedLastCompleted = lastCompleted
    ? format(new Date(lastCompleted), "dd/MM/yyyy")
    : "";

  return (
    <div className={styles.Task} style={{ backgroundColor: backgroundColor }}>
      <div className={styles.title_streak}>
        <p>{title}</p>
        {lastCompleted && <p>Last Completed: {formattedLastCompleted}</p>}
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
