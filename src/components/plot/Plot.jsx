import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { LuAxe } from "react-icons/lu";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Plot = ({
  x,
  y,
  isEmpty,
  plantIcon,
  onPlotClick,
  plotToRemove,
  onRemove,
  onCancel,
}) => {
  const handleClick = () => {
    onPlotClick(x, y, isEmpty);
  };

  const showRemoveButton =
    plotToRemove && plotToRemove.x === x && plotToRemove.y === y;

  return (
    <AnimatePresence>
      <div
        className={`${styles.plot} ${isEmpty ? styles.empty : styles.occupied}`}
        onClick={handleClick}
      >
        {!isEmpty && (
          <>
            <motion.div
              className={styles.plantAnimation}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <Image
                width="50"
                height="50"
                className={styles.plantIcon}
                src={plantIcon}
                alt="Plant"
              />
            </motion.div>
            {showRemoveButton && (
              <div className={styles.buttonWrapper}>
                <button onClick={() => onRemove()} className={styles.removeBtn}>
                  <LuAxe className={styles.removeIcon} />
                </button>
                <button onClick={() => onCancel()} className={styles.closeBtn}>
                  {" "}
                  <IoClose className={styles.closeIcon} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Plot;
