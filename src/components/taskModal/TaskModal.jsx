import { useState } from "react";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { getSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const TaskModal = ({ dataModal, setTasks, session, isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const pathName = usePathname();

  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createNewTask = async (userId, setTasks) => {
    const endpoint = `/api${router.asPath}`; // gets the current URL path and prepend it with '/api'

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        lastCompleted: null,
        deadline: selectedDate,
      }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask.data]);
    } else {
      const error = await response.json();
      console.error(error);
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    createNewTask(session.user._id, setTasks);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBg}>
          <div className={styles.modalContent}>
            <button onClick={closeModal} className={styles.closeBtn}>
              <IoClose className={styles.closeIcon} />
            </button>
            <h3 className={styles.modalTitle}>{dataModal.pageTitle}</h3>
            <form action="" onSubmit={onHandleSubmit} className={styles.form}>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={handleTitleChange}
                className={styles.input}
              />
              {dataModal.showDateInput && (
                <DatePicker
                  type="text"
                  id="date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className={styles.dateInput}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={format(new Date(), "dd/MM/yyyy")}
                />
              )}
            </form>
            <button
              type="submit"
              className={styles.addTaskBtn}
              onClick={() => {
                createNewTask(session.user._id, setTasks);
                closeModal();
              }}
            >
              <FaArrowUp className={styles.btnIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default TaskModal;
