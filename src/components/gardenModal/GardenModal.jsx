import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { IoWaterOutline, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const GardenModal = ({ onClose, onPlantSelect, trees }) => {
  const handlePlantSelect = (plantIconUrl) => {
    onPlantSelect(plantIconUrl);
    onClose();
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent} onClick={onClose}>
          <div className={styles.mainInfo}>
            <h3 className={styles.modalTitle}>Aggiungi un nuovo albero</h3>
            <button className={styles.closeBtn} onClick={onClose}>
              <IoClose className={styles.closeIcon} />
            </button>
          </div>
          <div className={styles.shop}>
            {trees.map((tree, index) => (
              <div key={index} className={styles.plant}>
                <p className={styles.name}>{tree.name}</p>
                <button
                  className={styles.plantInfo}
                  onClick={() => handlePlantSelect(tree.sprite)}
                >
                  <Image
                    width="50"
                    height="50"
                    src={`@/sprites/${tree.sprite}`}
                    alt={tree.name}
                  />
                  <div>
                    <p className={styles.resourcesWrapper}>
                      {tree.cost.soil}{" "}
                      <Image
                        className={styles.resource}
                        src="/soil.png"
                        alt="Soil"
                        width={20}
                        height={20}
                      />
                    </p>
                    <p className={styles.resourcesWrapper}>
                      {tree.cost.seeds}{" "}
                      <Image
                        className={styles.resource}
                        src="/seeds.png"
                        alt="Seeds"
                        width={20}
                        height={20}
                      />
                    </p>
                    <p className={styles.resourcesWrapper}>
                      {tree.cost.water}{" "}
                      <Image
                        className={styles.resource}
                        src="/water.png"
                        alt="Water"
                        width={20}
                        height={20}
                      />
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenModal;
