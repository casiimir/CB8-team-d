import styles from "./index.module.scss";
import Task from "../task";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({
  tasks,
  deleteFunction,
  updateHabitFunction,
  updateDailyFunction,
  updateTodoFunction,
}) => {
  const hasTasks = tasks.length > 0;

  const router = useRouter();

  return (
    <div>
      <div className={styles.titleWrapper}>
        {router.pathname === "/habits" && (
          <h2 className={styles.title}>Your Habits</h2>
        )}
        {router.pathname === "/dailies" && (
          <h2 className={styles.title}>Your Dailies</h2>
        )}
        {router.pathname === "/todos" && (
          <h2 className={styles.title}>Your Todos</h2>
        )}
      </div>
      {hasTasks ? (
        <div className={styles.TaskList}>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                className={styles.TaskItem}
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
              >
                <Task
                  title={task.title}
                  streakCount={task.streak}
                  id={task._id}
                  lastCompleted={task.lastCompleted}
                  deadline={task.deadline}
                  complete={task.complete}
                  deleteFunction={deleteFunction}
                  updateHabitFunction={updateHabitFunction}
                  updateDailyFunction={updateDailyFunction}
                  updateTodoFunction={updateTodoFunction}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.noTask}>
          <h5>It&apos;s time to start growing!</h5>
          <Image
            src="/leaves2.jpeg"
            alt="leaves"
            width="550"
            height="400"
            className={styles.leaves}
          />
          <h5>Choose your tasks, roll up your sleeves and jump in!</h5>
        </div>
      )}
    </div>
  );
};

export default TaskList;
