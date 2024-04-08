import styles from "./index.module.scss";
import { PiPlant } from "react-icons/pi";

const Plot = ({ x, y, isEmpty, plantIcon, onClick }) => {
  const handleClick = () => {
    if (isEmpty) {
      onClick(x, y);
    }
  };

  return (
    <div
      className={`${styles.plot} ${isEmpty ? styles.empty : styles.occupied}`}
      onClick={handleClick}
    >
      {!isEmpty && <PiPlant className={styles["plant-icon"]} />}
    </div>
  );
};

export default Plot;
