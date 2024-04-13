import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Garden.module.scss";
import Plot from "@/components/plot";
import Navbar from "@/components/navbar";
import GardenModal from "@/components/gardenModal";
import ResourcesModal from "@/components/resourcesModal";
import { useUserResources } from "@/contexts/userResourcesContext";
import Loader from "@/components/loader/Loader.jsx";
import Header from "@/components/header";

const GardenPage = ({ session }) => {
  const router = useRouter();
  const [garden, setGarden] = useState(null);
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  //
  const [plotToRemove, setPlotToRemove] = useState(null);
  //
  const [trees, setTrees] = useState([]);
  const [insufficientResources, setInsufficientResources] = useState(false);

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

      const treeIcon =
        plot?.plant != "weed"
          ? trees.filter((tree) => tree.name == plot.plant)[0].sprite
          : null;

      return (
        <Plot
          key={`${plot.x}-${plot.y}`}
          x={row}
          y={col}
          isEmpty={plot.empty}
          treeName={plot.plant}
          plantIcon={treeIcon}
          onPlotClick={handlePlotClick}
          plotToRemove={plotToRemove}
          onRemove={handleRemoveClick}
          onCancel={handleCancelClick}
        />
      );
    });

    return plots;
  };

  // const handlePlotClick = (x, y, isEmpty) => {
  //   const clickedPlot = garden.plots.find(
  //     (plot) => plot.x === x && plot.y === y
  //   );
  //   setSelectedPlot({ x, y });

  //   if (isEmpty) {
  //     setIsGardenModalOpen(true);
  //     // console.log(clickedPlot.empty);
  //   } else {
  //     console.log("Pianta già presente");
  //     updateGardenData(garden._id, x, y, "weed", true);
  //   }
  // };

  const handlePlotClick = (x, y) => {
    if (plotToRemove && plotToRemove.x === x && plotToRemove.y === y) {
      return;
    }

    const clickedPlot = garden.plots.find(
      (plot) => plot.x === x && plot.y === y
    );
    if (clickedPlot.empty) {
      setSelectedPlot({ x, y });
      setIsGardenModalOpen(true);
    } else {
      setPlotToRemove({ x, y });
    }
  };

  const handleRemoveClick = async () => {
    if (plotToRemove) {
      await updateGardenData(
        garden._id,
        plotToRemove.x,
        plotToRemove.y,
        "weed",
        true
      );
      setPlotToRemove(null);
    }
  };

  const handleCancelClick = async () => {
    if (plotToRemove) {
      console.log("Cancellato");
      setPlotToRemove(null);
    }
  };

  //

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

    try {
      const response = await fetch(`/api/garden/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      });

      const responseData = await response.json();
      setGarden(responseData.data);

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
        (userResources.soil || 0) < selectedTree.cost.soil ||
        (userResources.water || 0) < selectedTree.cost.water ||
        (userResources.seeds || 0) < selectedTree.cost.seeds
      ) {
        console.error("Risorse insufficienti");
        setInsufficientResources(true);
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

  return session ? (
    <>
      <Header />
      <div className={styles.gardenContainer}>
        <div className={styles.plotsContainer}>
          {garden &&
            trees &&
            garden.plots.length > 0 &&
            createGardenGrid(garden.plots, trees)}
        </div>

        {isGardenModalOpen && (
          <GardenModal
            onClose={handleCloseGardenModal}
            onPlantSelect={handlePlantSelect}
            trees={trees}
          />
        )}
        {insufficientResources && (
          <ResourcesModal
            insufficientResources={insufficientResources}
            setInsufficientResources={setInsufficientResources}
          />
        )}
      </div>
      <Navbar />
    </>
  ) : (
    <Loader />
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
