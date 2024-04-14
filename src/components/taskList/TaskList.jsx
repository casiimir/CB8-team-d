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
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className={styles.TaskItem}>
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
          </div>
        ))
      ) : (
        <h4>It&apos;s time to start growing!</h4>
      )}
    </div>
  );
};

export default TaskList;
