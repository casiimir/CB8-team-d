import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const ResourcesModal = ({
  insufficientResources,
  setInsufficientResources,
}) => {
  const [isOpen, setIsOpen] = useState(insufficientResources);

  const handleClose = () => {
    setIsOpen(false);
    setInsufficientResources(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBg}>
            <div className={styles.modalContent}>
              <p className={styles.text}>
                You do not have enough resources to plant this tree!
              </p>
              <button className={styles.closeBtn} onClick={handleClose}>
                <IoClose className={styles.closeIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourcesModal;
