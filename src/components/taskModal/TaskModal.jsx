import { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Loader from "../loader";

const TaskModal = ({ dataModal, setTasks, isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const titleInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createNewTask = async () => {
    if (session) {
      const endpoint = `/api${router.asPath}`; // gets the current URL path and prepends it with '/api'

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: session.user._id,
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
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await createNewTask();
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.mainInfo}>
          <h3 className={styles.modalTitle}>{dataModal.pageTitle}</h3>
          <button onClick={closeModal} className={styles.closeBtn}>
            <IoClose className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.formInfo}>
          <form action="" onSubmit={onHandleSubmit} className={styles.form}>
            <div className={styles.text}>
              <input
                ref={titleInputRef}
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
            </div>
            <div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
