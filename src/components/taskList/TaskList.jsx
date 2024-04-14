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
    <div>
      {tasks.length > 0 ? (
        <div id="wrapper">
          <div className={styles.scrollbar} id="style-default">
            <div className={styles.force_overflow}>
              <div className={styles.TaskList}>
                {tasks.map((task) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>
          {" "}
          It's time to start growing! Choose your tasks and let's get to work!
        </h4>
      )}
    </div>
  );
};

export default TaskList;
