import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { IoWaterOutline, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const GardenModal = ({ onClose, onPlantSelect }) => {
  const [trees, setTrees] = useState([]);

  const handlePlantSelect = (plantIconUrl) => {
    onPlantSelect(plantIconUrl);
    onClose();
  };

  useEffect(() => {
    fetch("trees.json")
      .then((response) => response.json())
      .then((data) => {
        setTrees(data);
      })
      .catch((error) =>
        console.error("Errore nel caricamento del file JSON:", error)
      );
  }, []);

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBg} onClick={onClose}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={onClose}>
              <IoClose className={styles.closeIcon} />
            </button>
            <h3 className={styles.modalTitle}>Aggiungi un nuovo albero</h3>
            {/* <div className={styles.shop}>
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
                  </div> */}
            {/* <button
                    className={styles.addBtn}
                    onClick={() => handlePlantSelect(plant.imageUrl)}
                  > */}
            {/* <FaCheck className={styles.addIcon} />
                  </button>
                </div>
              ))}
            </div> */}
            <div className={styles.shop}>
              {trees.map((tree, index) => (
                <div key={index} className={styles.plant}>
                  <p className={styles.name}>{tree.name}</p>
                  <div className={styles.plantInfo}>
                    <img
                      width="50"
                      height="50"
                      src={tree.sprite}
                      alt={tree.name}
                    />
                    <div>
                      <p>{tree.cost.soil} soil</p>
                      <p>{tree.cost.seeds} seeds</p>
                      <p>{tree.cost.water} water</p>
                    </div>
                    <button
                      className={styles.addBtn}
                      onClick={() => handlePlantSelect(tree.sprite)}
                    ></button>
                  </div>
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
