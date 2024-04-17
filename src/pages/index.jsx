import { useState } from "react";
import { useRouter } from "next/router";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import styles from "@/styles/landing.module.scss";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const router = useRouter();

  const slides = [
    {
      id: 1,
      img: "/Screen_Tavola disegno 1-09.png",
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
  ];

  const slidesDesktop = [
    {
      id: 1,
      img: "/Screen-05.png",
    },
    {
      id: 2,
      img: "/Screen-06.png",
    },
    {
      id: 3,
      img: "/Screen-07.png",
    },
    {
      id: 4,
      img: "/Screen-08.png",
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
              <Image src="/logowide.png" alt="Logo" width="200" height="50" />
            </div>
            <div className={styles.title}>
              <h4>Track your goals, cultivate your habits.</h4>
              <p>
                Developing sustainable habits is like planting the seeds of
                success for lush growth, nourishing yourself and the planet!
              </p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                className={styles.Img}
                src="/Hands.png"
                alt="logo"
                width="200"
                height="170"
              />
            </div>
            <div className={styles.btnWrapper}>
              <button className={styles.startBtn} onClick={handleStart}>
                START
              </button>
            </div>
            <div className={styles.teamWrapper}>
              <div className={styles.title}>
                <h6>Growy Team Members</h6>
              </div>
              <div className={styles.teamMembers}>
                <div className={styles.first}>
                  <div className={styles.firstHalf}>
                    <div className={styles.member}>
                      <Image
                        className={styles.Img}
                        src="/Hands.png"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                      <div className={styles.contacts}>
                        <p>Olga Barbato</p>
                        <div className={styles.icons}>
                          <AiFillGithub />
                          <BsLinkedin />
                        </div>
                      </div>
                    </div>
                    <div className={styles.member}>
                      <Image
                        className={styles.Img}
                        src="/team/Elena.jpeg"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                      <div className={styles.contacts}>
                        <p>Elena Faraci</p>
                        <div className={styles.icons}>
                          <a
                            href="https://github.com/ElenaEF00"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <AiFillGithub />
                          </a>
                          <a
                            href="https://www.linkedin.com/in/elenafaraci/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsLinkedin />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.secondHalf}>
                    <div className={styles.member}>
                      <Image
                        className={styles.Img}
                        src="/Hands.png"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                      <div className={styles.contacts}>
                        <p>Andrea Perez</p>
                        <div className={styles.icons}>
                          <AiFillGithub />
                          <BsLinkedin />
                        </div>
                      </div>
                    </div>
                    <div className={styles.member}>
                      <Image
                        className={styles.Img}
                        src="/Hands.png"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                      <div className={styles.contacts}>
                        <p>Eugenia Renda</p>
                        <div className={styles.icons}>
                          <AiFillGithub />
                          <BsLinkedin />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.last}>
                  <div className={styles.member}>
                    <Image
                      className={styles.Img}
                      src="/Hands.png"
                      alt="logo"
                      width="50"
                      height="50"
                    />
                    <div className={styles.contacts}>
                      <p>Valentina Scalone</p>
                      <div className={styles.icons}>
                        <AiFillGithub />
                        <BsLinkedin />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {showSlider && (
          <>
            <div className={styles.background}>
              <Image
                src={
                  window.innerWidth >= 768
                    ? `/screens2/${slidesDesktop[slideIndex].img}`
                    : `/screens/${slides[slideIndex].img}`
                }
                alt=""
                width="100"
                height="100"
              />
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
                <button className={styles.endBtn} onClick={handleFinishIntro}>
                  START
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
