import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Garden.module.scss";
import Plot from "@/components/plot";
import Navbar from "@/components/navbar";
import GardenModal from "@/components/gardenModal";
import { useUserResources } from "@/contexts/userResourcesContext";

const GardenPage = ({ session }) => {
  const router = useRouter();
  const [garden, setGarden] = useState(null);
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [trees, setTrees] = useState([]);
  const { userResources, updateUserResources } = useUserResources();

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
          const gardenResponse = await response.json();
          setGarden(gardenResponse.data);
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

  const createGardenGrid = (plotsData, trees) => {
    const plots = plotsData.map((plot) => {
      const row = plot.x;
      const col = plot.y;
      if (plot.plant != "weed") {
        const treeIcon = trees.filter((tree) => tree.name === plot.plant)[0]
          .sprite;

        console.log(treeIcon);
        return (
          <Plot
            key={`${plot.x}-${plot.y}`}
            x={row}
            y={col}
            isEmpty={plot.isEmpty}
            treeName={plot.plant}
            plantIcon={treeIcon}
            onClick={handlePlotClick}
          />
        );
      } else {
        return (
          <Plot
            key={`${plot.x}-${plot.y}`}
            x={row}
            y={col}
            isEmpty={true}
            treeName={plot.plant}
            plantIcon={null}
            onClick={handlePlotClick}
          />
        );
      }
    });

    return plots;
  };

  const handlePlotClick = (x, y) => {
    const clickedPlot = garden.plots.find(
      (plot) => plot.x === x && plot.y === y
    );
    console.log("Clicked plot:", clickedPlot);
    if (clickedPlot.empty) {
      setSelectedPlot({ x, y });
      console.log("Selected plot:", selectedPlot);
      setIsGardenModalOpen(true);
    }
  };

  const handleCloseGardenModal = () => {
    setIsGardenModalOpen(false);
    setSelectedPlot(null);
  };

  const updateGardenData = async (id, x, y, plant, empty) => {
    const newBody = {
      x: x,
      y: y,
      plant: plant,
      empty: empty,
    };

    console.log("Updating garden with body:", newBody);

    try {
      console.log("Calling the PUT method");
      const response = await fetch(`/api/garden/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      });

      console.log("Response:", response);

      if (!response.ok) {
        console.error("Failed to update garden in database");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePlantSelect = async (plantIconUrl) => {
    setIsGardenModalOpen(false);
    if (selectedPlot) {
      const selectedTree = trees.find((tree) => tree.sprite === plantIconUrl);

      if (!selectedTree) {
        console.error("Albero non trovato per l'URL dell'icona:", plantIconUrl);
        return;
      }
      const treeName = selectedTree.name;
      // Toglie le risorse dall'utente se sono sufficienti
      if (
        userResources.soil < selectedTree.cost.soil ||
        userResources.water < selectedTree.cost.water ||
        userResources.seeds < selectedTree.cost.seeds
      ) {
        console.error("Risorse insufficienti");
        return;
      } else {
        const newUserResources = {
          ...userResources,
          soil: userResources.soil - selectedTree.cost.soil,
          water: userResources.water - selectedTree.cost.water,
          seeds: userResources.seeds - selectedTree.cost.seeds,
        };
        await updateUserResources(newUserResources);
        const updatedPlots = garden.plots.map((plot) => {
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
        const newGarden = { ...garden, plots: updatedPlots };
        setGarden(newGarden);

        updateGardenData(
          garden._id,
          selectedPlot.x,
          selectedPlot.y,
          treeName,
          false
        );
      }
    }
  };

  return (
    <div className={styles.garden}>
      <div className={styles.plotsContainer}>
        {garden &&
          trees &&
          garden.plots.length > 0 &&
          createGardenGrid(garden.plots, trees)}
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
