import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { LuAxe } from "react-icons/lu";

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
    <div
      className={`${styles.plot} ${isEmpty ? styles.empty : styles.occupied}`}
      onClick={handleClick}
    >
      {!isEmpty && (
        <>
          <img className={styles.plantIcon} src={plantIcon} alt="Plant" />
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
  );
};

export default Plot;
