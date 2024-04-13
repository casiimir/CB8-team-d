import { format, differenceInHours } from "date-fns";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import { useUserResources } from "@/contexts/userResourcesContext";

const Task = ({
  title,
  streakCount,
  id,
  lastCompleted,
  deadline,
  complete,
  deleteFunction,
  updateHabitFunction,
  updateDailyFunction,
  updateTodoFunction,
}) => {
  const [completed, setCompleted] = useState(false);
  const [currentStreakCount, setCurrentStreakCount] = useState(streakCount);
  const [newLastCompleted, setNewLastCompleted] = useState(lastCompleted);
  const { userResources, updateUserResources } = useUserResources();

  const router = useRouter();

  // useEffect(() => {
  //   setCurrentStreakCount(streakCount);
  // }, [streakCount]);

  const handleCompleteClick = async (e) => {
    e.preventDefault();

    const newCompletedValue = !completed;
    setCompleted(newCompletedValue);

    let newStreakCount = streakCount;
    if (streakCount !== undefined) {
      if (streakCount !== undefined) {
        newStreakCount = currentStreakCount + 1;
        if (newStreakCount === 8) {
          newStreakCount = 1;
        }
        setCurrentStreakCount(newStreakCount);
      }
    }

    const currentDate = new Date();
    setNewLastCompleted(currentDate);

    if (router.pathname === "/habits") {
      await updateHabitFunction(id, title, newStreakCount, currentDate);
      const newUserResources = {
        ...userResources,
        water: (userResources.water || 0) + 1,
      };
      await updateUserResources(newUserResources);
    }
    if (router.pathname === "/dailies") {
      await updateDailyFunction(id, title, newCompletedValue, currentDate);
      const newUserResources = {
        ...userResources,
        seeds: (userResources.seeds || 0) + 1,
      };
      await updateUserResources(newUserResources);
    }
    if (router.pathname === "/todos") {
      await updateTodoFunction(id, title, newCompletedValue, deadline);
      const newUserResources = {
        ...userResources,
        soil: (userResources.soil || 0) + 1,
      };
      console.log(newUserResources);
      await updateUserResources(newUserResources);
    }
  };

  const formattedDeadline = deadline
    ? format(new Date(deadline), "dd/MM/yyyy")
    : "";
  const formattedNewLastCompleted = newLastCompleted
    ? format(newLastCompleted, "dd/MM/yyyy HH:mm")
    : "";

  useEffect(() => {
    if (newLastCompleted) {
      const currentDate = new Date();

      const hoursDifference = differenceInHours(
        currentDate,
        formattedNewLastCompleted
      );

      if (hoursDifference >= 24) {
        setCurrentStreakCount(0);
        if (completed && hoursDifference >= 24) {
          setCompleted(false);

          if (router.pathname === "/dailies") {
            if (completed) {
              updateDailyFunction(id, title, false, null);
            }
          }
          if (router.pathname === "/habits") {
            updateHabitFunction(id, title, 0, null);
          }
        }
      }
    }
  }, [formattedNewLastCompleted]);

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
    <div
      className={`${styles.Task} ${styles[additionalClassName]} ${
        additionalClassName !== "habits" && (complete || completed)
          ? styles.completedTask
          : ""
      }`}
    >
      <div className={styles.deleteBtnWrapper}>
        <button
          className={styles.deleteBtn}
          onClick={async () => await deleteFunction(id)}
        >
          <IoClose className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.title_streak}>
        <p>{title}</p>
        {lastCompleted && <p>Last Completed: {formattedNewLastCompleted}</p>}
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
          className={`${styles.button} ${
            router.pathname === "/habits" ? styles.habitsButton : ""
          } ${
            (router.pathname === "/dailies" || router.pathname === "/todos") &&
            (complete || completed)
              ? styles.complete
              : ""
          }`}
          onClick={handleCompleteClick}
        ></button>
      </div>
    </div>
  );
};

export default Task;
