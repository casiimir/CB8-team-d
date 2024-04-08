import React from "react";
import Plot from "@/components/plot";
import { useState, useEffect } from "react";
import styles from "../../styles/Garden.module.scss";

const GardenPage = () => {
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const generatePlots = () => {
      const rows = 7;
      const cols = 5;
      const generatedPlots = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const plot = {
            x,
            y,
            isEmpty: true,
            plantIcon: null,
          };
          generatedPlots.push(plot);
        }
      }

      return generatedPlots;
    };

    setPlots(generatePlots());
  }, []);

  const handlePlotClick = (x, y) => {
    setSelectedPlot({ x, y });
  };

  const handlePlantSelect = (plantIcon) => {
    const updatedPlots = plots.map((plot) => {
      if (plot.x === selectedPlot.x && plot.y === selectedPlot.y) {
        return {
          ...plot,
          isEmpty: false,
          plantIcon: plantIcon,
        };
      }
      return plot;
    });
    setPlots(updatedPlots);
  };

  return (
    <div className={styles.garden}>
      <div className={styles.plotsContainer}>
        {plots.map((plot, index) => (
          <Plot
            x={plot.x}
            y={plot.y}
            isEmpty={plot.isEmpty}
            plantIcon={plot.plantIcon}
            onClick={handlePlotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GardenPage;
