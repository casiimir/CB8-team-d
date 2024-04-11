import styles from "./index.module.scss";

const Plot = ({ x, y, isEmpty, plantIcon, onClick, treeName }) => {
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
      {!isEmpty && (
        <div>
          <img src={plantIcon} alt="Plant" />
          <div>{treeName}</div>
        </div>
      )}
    </div>
  );
};

export default Plot;
