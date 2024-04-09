import styles from "./index.module.scss";
import Task from "../task";

const TaskList = ({
  tasks,
  deleteFunction,
  updateHabitFunction,
  updateDailyFunction,
  updateTodoFunction,
}) => {
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
              deleteFunction={deleteFunction}
              updateHabitFunction={updateHabitFunction}
              updateDailyFunction={updateDailyFunction}
              updateTodoFunction={updateTodoFunction}
            />
          </div>
        ))}
    </div>
  );
};

export default TaskList;
