import { useState } from "react";
import { useRouter } from "next/router";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import styles from "../styles/landing.module.scss";

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const router = useRouter();

  const slides = [
    {
      id: 1,
      img: "/Screen_Tavola disegno 1-01.png",
    },
    {
      id: 2,
      img: "/Screen_Tavola disegno 1-02.png",
    },
    {
      id: 3,
      img: "/Screen_Tavola disegno 1-03.png",
    },
    {
      id: 4,
      img: "/Screen_Tavola disegno 1-04.png",
    },
    {
      id: 5,
      img: "/Screen_Tavola disegno 1-05.png",
    },
    {
      id: 6,
      img: "/Screen_Tavola disegno 1-06.png",
    },
    {
      id: 7,
      img: "/Screen_Tavola disegno 1-07.png",
    },
  ];

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      handleFinishIntro();
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleFinishIntro = () => {
    localStorage.setItem("landing", true);
    router.push("/login");
  };

  const handleStart = () => {
    setShowSlider(true);
  };

  return (
    <div className={styles.intro}>
      <div className={styles.mainArea}>
        {!showSlider && (
          <>
            <div className={styles.logoArea}>
              <img src="/logowide.png" alt="Logo" width={200} />
            </div>
            <div className={styles.title}>
              <h3>Traccia i tuoi obiettivi, coltiva le tue abitudini</h3>
              <p>
                Coltivare se stessi con abitudini sostenibili è come piantare
                semi di successo per una crescita rigogliosa, nutrendo sia te
                stesso che il pianeta!
              </p>
            </div>
            <div className={styles.btnWrapper}>
              <button className={styles.startBtn} onClick={handleStart}>
                START
              </button>
            </div>
          </>
        )}
        {showSlider && (
          <>
            <div className={styles.background}>
              <img src={`/screens/${slides[slideIndex].img}`} alt="" />
            </div>
            <div className={styles.actions}>
              {slideIndex > 0 && (
                <button onClick={handlePrevSlide}>
                  <FaAngleDoubleLeft />
                </button>
              )}
              {slideIndex < slides.length - 1 ? (
                <button onClick={handleNextSlide}>
                  <FaAngleDoubleRight />
                </button>
              ) : (
                <button onClick={handleFinishIntro}>START</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
