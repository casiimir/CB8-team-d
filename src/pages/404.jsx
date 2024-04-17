import styles from "@/styles/custom404.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export default function Custom404() {
  const router = useRouter();
  const [isExploding, setIsExploding] = useState(false);
  const [showTreeWithLeaves, setShowTreeWithLeaves] = useState(true);

  const handleButtonClick = () => {
    setIsExploding(true);
  };

  const handleExplosionComplete = () => {
    setShowTreeWithLeaves(false);
  };

  return (
    <div className={styles.notfound_wrapper}>
      <div className={styles.items_wrapper}>
        {isExploding && (
          <ConfettiExplosion
            onComplete={handleExplosionComplete}
            colors={[
              "#00FF00",
              "#00AA00",
              "#008800",
              "#007F00",
              "#006600",
              "#005500",
            ]}
            force={0.25}
            duration={500}
            particleCount={500}
            width={1600}
          />
        )}
        <button onClick={handleButtonClick} className={styles.button_image}>
          <div className={styles.image_wrapper}>
            {showTreeWithLeaves ? (
              <>
                <Image
                  className={styles.image}
                  src="/sprites/albero3.png"
                  alt="bare tree"
                  width="100"
                  height="150"
                />
                <h1 className={styles.title}>
                  <span className={styles.highlight}> Error 404</span>:
                  You&apos;re lost! Hurry up, fall is coming...{" "}
                </h1>
              </>
            ) : (
              <>
                <Image
                  className={styles.image}
                  src="/sprites/secco4.png"
                  alt="bare tree without leaves"
                  width="100"
                  height="150"
                />
                <h1 className={styles.title}>
                  <span className={styles.highlight}> Oops!</span> It seems that
                  nothing grows here!
                </h1>
              </>
            )}
          </div>
        </button>
      </div>
      <div className={styles.button_wrapper}>
        <button
          className={styles.button_login}
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
