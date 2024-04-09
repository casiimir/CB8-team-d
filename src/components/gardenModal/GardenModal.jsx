import React from "react";
import styles from "./index.module.scss";
import { IoWaterOutline } from "react-icons/io5";

const GardenModal = ({ onClose, onPlantSelect }) => {
  const handlePlantSelect = (plantIconUrl) => {
    onPlantSelect(plantIconUrl);
    onClose();
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBg} onClick={onClose}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Aggiungi una nuova pianta</h3>
            <div className={styles.shop}>
              <button
                className={styles.plant}
                onClick={() =>
                  handlePlantSelect(
                    "https://img.icons8.com/bubbles/50/potted-plant.png"
                  )
                }
              >
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/bubbles/50/potted-plant.png"
                  alt="potted-plant"
                />
                <p>
                  {" "}
                  <IoWaterOutline />2
                </p>
              </button>
              <button
                className={styles.plant}
                onClick={() =>
                  handlePlantSelect(
                    "https://img.icons8.com/clouds/100/potted-plant.png"
                  )
                }
              >
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/clouds/100/potted-plant.png"
                  alt="potted-plant"
                />
                <p>
                  <IoWaterOutline />2
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenModal;
