import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Garden.module.scss";
import Plot from "@/components/plot";
import Navbar from "@/components/navbar";
import GardenModal from "@/components/gardenModal";

const GardenPage = ({ session }) => {
  const router = useRouter();
  const [plots, setPlots] = useState([]);
  const [garden, setGarden] = useState([]);
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetch("trees.json")
      .then((response) => response.json())
      .then((data) => {
        setTrees(data);
      })
      .catch((error) =>
        console.error("Errore nel caricamento del file JSON:", error)
      );
  }, []);

  useEffect(() => {
    const loadGarden = async () => {
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/garden?userId=${userId}`);
        if (response.ok) {
          const garden = await response.json();
          console.log(garden.data);
          setGarden(garden.data);
        } else {
          console.error("Failed to load garden");
        }
      } else {
        console.log("No session");
        router.push("/login");
      }
    };

    loadGarden();
  }, [router, session]);

  useEffect(() => {
    const generatePlots = () => {
      const rows = 7;
      const cols = 5;
      const generatedPlots = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          generatedPlots.push({
            x,
            y,
            isEmpty: true,
            plantIcon: null,
            plant: null, // Inizialmente il nome dell'albero è null
          });
        }
      }

      return generatedPlots;
    };

    if (garden.length > 0) {
      const updatedPlots = generatePlots().map((plot) => {
        // Trova l'albero corrispondente a questo plot, se esiste
        const selectedPlot = garden.find(
          (gardenPlot) => gardenPlot.x === plot.x && gardenPlot.y === plot.y
        );
        if (selectedPlot) {
          // Se l'albero è stato trovato, assegna il suo nome al plot
          const selectedTree = trees.find(
            (tree) => tree.sprite === selectedPlot.plantIcon
          );
          plot.plant = selectedTree ? selectedTree.name : null;
        }
        return plot;
      });
      setPlots(updatedPlots);
    }
  }, [garden, trees]);

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

  const handleGardenChangeClick = async (id, x, y, plant, empty) => {
    try {
      const endpoint = `/api/garden/${id}`;
      const newBody = {
        x: x,
        y: y,
        plant: plant,
        empty: empty,
      };

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update plot");
      } else {
        const updatedPlot = await response.json();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePlantSelect = (plantIconUrl) => {
    setIsGardenModalOpen(false);
    if (selectedPlot) {
      const selectedTree = trees.find((tree) => tree.sprite === plantIconUrl);
      if (!selectedTree) {
        console.error("Albero non trovato per l'URL dell'icona:", plantIconUrl);
        return;
      }
      const treeName = selectedTree.name;

      const updatedPlots = plots.map((plot) => {
        if (plot.x === selectedPlot.x && plot.y === selectedPlot.y) {
          return {
            ...plot,
            plantIcon: plantIconUrl,
            plant: treeName,
            isEmpty: false,
          };
        }
        return plot;
      });
      setPlots(updatedPlots);

      handleGardenChangeClick(
        garden[0]._id,
        selectedPlot.x,
        selectedPlot.y,
        treeName,
        false
      );
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
            treeName={plot.plant}
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
          trees={trees}
        />
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default GardenPage;
