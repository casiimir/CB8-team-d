import { useState } from "react";
import styles from "./index.module.scss";
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

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  //   const openModal = () => {
  //     setOpenModal(true); // Imposta lo stato per aprire la modale
  //   };

  //   const closeModal = () => {
  //     setOpenModal(false); // Imposta lo stato per chiudere la modale
  //   };

  //   useEffect(() => {
  //     setOpenModal(false); // Chiudi la modale quando il componente viene montato o quando la pagina cambia
  //   }, [pathName]);

  const createNewTask = async (userId, setTasks) => {
    const endpoint = `/api${router.asPath}`; // gets the current URL path and prepend it with '/api'

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Prova DELETE",
        userId,
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

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBg}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>{dataModal.pageTitle}</h3>
            <form action="" className={styles.form}>
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
          </div>
          <button
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
