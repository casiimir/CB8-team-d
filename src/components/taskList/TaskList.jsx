import styles from "./index.module.scss";
import Task from "../task";

const TaskList = ({ tasks }) => {
  return (
    <div className={styles.TaskList}>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div key={task._id} className={styles.TaskItem}>
            <Task
              title={task.title}
              streakCount={task.streak}
              id={task._id}
              lastCompleted={task.lastCompleted}
              deadline={task.deadline}
            />
          </div>
        ))}
    </div>
  );
};

export default TaskList;
