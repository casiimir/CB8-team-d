import styles from "./index.module.scss";

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
      {!isEmpty && <img src={plantIcon} alt="Plant" />}{" "}
    </div>
  );
};

export default Plot;
