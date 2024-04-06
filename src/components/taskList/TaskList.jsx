import styles from "./index.module.scss";
import Task from "../task";

const TaskList = ({ tasks, backgroundChange }) => {
  return (
    <div className={styles.TaskList}>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div key={task._id} className={styles.TaskItem}>
            <Task
              title={task.title}
              streakCount={task.streak}
              id={task._id}
              backgroundChange={backgroundChange}
              lastCompleted={task.lastCompleted}
              deadline={task.deadline}
            />
          </div>
        ))}
    </div>
  );
};

export default TaskList;
