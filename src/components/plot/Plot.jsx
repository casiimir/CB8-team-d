import styles from "./index.module.scss";

const Plot = ({
  x,
  y,
  isEmpty,
  plantIcon,
  onPlotClick,
  // treeName,
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
        <div>
          <img src={plantIcon} alt="Plant" />
          {/* <div>{treeName}</div> */}
          {showRemoveButton && (
            <div>
              <button onClick={() => onRemove()}>Remove tree</button>
              <button onClick={() => onCancel()}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Plot;
