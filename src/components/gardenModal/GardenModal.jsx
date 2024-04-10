import React from "react";
import styles from "./index.module.scss";
import { IoWaterOutline, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const plantsData = [
  {
    name: "Pianta 1",
    imageUrl: "https://img.icons8.com/bubbles/50/potted-plant.png",
  },
  {
    name: "Pianta 2",
    imageUrl: "https://img.icons8.com/clouds/100/potted-plant.png",
  },
];

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
            <button className={styles.closeBtn} onClick={onClose}>
              <IoClose className={styles.closeIcon} />
            </button>
            <h3 className={styles.modalTitle}>Aggiungi una nuova pianta</h3>
            <div className={styles.shop}>
              {plantsData.map((plant, index) => (
                <div key={index} className={styles.plant}>
                  <p className={styles.name}>{plant.name}</p>
                  <div className={styles.plantInfo}>
                    <img
                      width="50"
                      height="50"
                      src={plant.imageUrl}
                      alt={plant.name}
                    />
                    <div className={styles.resources}>
                      <p>
                        {" "}
                        <IoWaterOutline />2
                      </p>
                      <p>
                        {" "}
                        <IoWaterOutline />2
                      </p>
                    </div>
                  </div>
                  <button
                    className={styles.addBtn}
                    onClick={() => handlePlantSelect(plant.imageUrl)}
                  >
                    <FaCheck className={styles.addIcon} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenModal;
