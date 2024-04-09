import React, { useState, useEffect } from "react";
import styles from "../../styles/Garden.module.scss";
import Plot from "@/components/plot";
import Navbar from "@/components/navbar";
import GardenModal from "@/components/gardenModal";

const gardenMock = {
  userId: "grw45h4j5h56h3jh",
  plots: [
    {
      x: 0,
      y: 0,
      plant: false,
    },
    {
      x: 0,
      y: 1,
      plant: false,
    },
    {
      x: 0,
      y: 2,
      plant: true,
    },
    {
      x: 3,
      y: 5,
      plant: true,
    },
  ],
};

const GardenPage = () => {
  const [plots, setPlots] = useState([]);
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const generatePlots = () => {
      const rows = 7;
      const cols = 5;
      const generatedPlots = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const matchingPlot = gardenMock.plots.find(
            (plot) => plot.x === x && plot.y === y
          );
          const isEmpty = !matchingPlot || !matchingPlot.plant;
          generatedPlots.push({
            x,
            y,
            isEmpty,
            plantIcon:
              matchingPlot && matchingPlot.plant
                ? "https://img.icons8.com/bubbles/50/potted-plant.png"
                : null,
          });
        }
      }

      return generatedPlots;
    };

    setPlots(generatePlots());
  }, []);

  const handlePlotClick = (x, y) => {
    const clickedPlot = plots.find((plot) => plot.x === x && plot.y === y);
    if (clickedPlot.isEmpty) {
      setSelectedPlot({ x, y });
      setIsGardenModalOpen(true);
    }
  };

  const handleCloseGardenModal = () => {
    setIsGardenModalOpen(false);
    setSelectedPlot(null);
  };

  const handlePlantSelect = (plantIconUrl) => {
    setIsGardenModalOpen(false);
    if (selectedPlot) {
      const updatedPlots = plots.map((plot) => {
        if (plot.x === selectedPlot.x && plot.y === selectedPlot.y) {
          return {
            ...plot,
            plantIcon: plantIconUrl,
            isEmpty: false,
          };
        }
        return plot;
      });
      setPlots(updatedPlots);
    }
    setSelectedPlot(null);
  };

  return (
    <div className={styles.garden}>
      <div className={styles.plotsContainer}>
        {plots.map((plot, index) => (
          <Plot
            key={`${plot.x}-${plot.y}`}
            x={plot.x}
            y={plot.y}
            isEmpty={plot.isEmpty}
            plantIcon={plot.plantIcon}
            onClick={handlePlotClick}
          />
        ))}
      </div>
      <Navbar />
      {isGardenModalOpen && (
        <GardenModal
          onClose={handleCloseGardenModal}
          onPlantSelect={handlePlantSelect}
        />
      )}
    </div>
  );
};

export default GardenPage;
