import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { FaArrowUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { getSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const TaskModal = ({ dataModal, setHabits, session }) => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  //   const [isModalOpen, setOpenModal] = useState(false);
  const pathName = usePathname();

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

  const createNewHabit = async (userId, setHabits) => {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //questo e' il body per la creazione dell'habit
      body: JSON.stringify({
        title: "Lallalero", //il titolo dell'habit lo sceglie l'utente inserendolo nel form, allo stato attuale e' fisso
        userId, //lo userId dipende sempre dalla session, se nopn c'e' session non si puo' creare un habit e vieni reindirizzato alla pagina di login
      }),
    });

    if (response.ok) {
      const newHabit = await response.json();
      console.log(newHabit.data);
      setHabits((prevHabits) => [...prevHabits, newHabit.data]);
    } else {
      const error = await response.json();
      console.error(error);
    }
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
            onClick={() => createNewHabit(session.user._id, setHabits)}
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
