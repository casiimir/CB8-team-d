import React, { useState, useEffect } from "react";
import styles from "../../styles/Garden.module.scss";
import Plot from "@/components/Plot";
import { PiPlant } from "react-icons/pi";
import Navbar from "@/components/navbar";

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

  useEffect(() => {
    // Funzione per generare i plot in base ai dati del mock
    const generatePlots = () => {
      const rows = 7;
      const cols = 5;
      const generatedPlots = [];

      // Ciclo attraverso ogni cella della griglia
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Trova il plot corrispondente nel mock dei dati
          const matchingPlot = gardenMock.plots.find(
            (plot) => plot.x === x && plot.y === y
          );
          // Determina se il plot è vuoto o occupato da una pianta
          const isEmpty = !matchingPlot || !matchingPlot.plant;
          // Aggiungi il plot alla lista dei plot generati
          generatedPlots.push({
            x,
            y,
            isEmpty,
            plantIcon: !isEmpty && <PiPlant />, // Se il plot non è vuoto, mostra l'icona della pianta
          });
        }
      }

      return generatedPlots;
    };

    // Genera i plot in base ai dati del mock
    setPlots(generatePlots());
  }, []);

  const handlePlotClick = (x, y) => {
    // Aggiorna il plot solo se è vuoto
    const clickedPlot = plots.find((plot) => plot.x === x && plot.y === y);
    if (clickedPlot.isEmpty) {
      const updatedPlots = plots.map((plot) => {
        if (plot.x === x && plot.y === y) {
          return {
            ...plot,
            isEmpty: false,
            plantIcon: <PiPlant />,
          };
        }
        return plot;
      });
      setPlots(updatedPlots);
    }
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
    </div>
  );
};

export default GardenPage;
