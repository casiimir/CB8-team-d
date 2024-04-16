import styles from "@/styles/custom404.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

// export default function Custom404() {
//   const router = useRouter();
//   return (
//     <div className={styles.notfound_wrapper}>
//       <div className={styles.items_wrapper}>
//         <div className={styles.image_wrapper}>
//           <Image
//             className={styles.image1}
//             src="/sprites/secco3.png"
//             alt=" bare tree"
//             width="50"
//             height="50"
//           />
//           <Image
//             className={styles.image}
//             src="/sprites/secco4.png"
//             alt=" bare tree"
//             width="100"
//             height="150"
//           />
//           <Image
//             className={styles.image1}
//             src="/sprites/secco3.png"
//             alt=" bare tree"
//             width="50"
//             height="50"
//           />
//         </div>
//         <h1 className={styles.title}>
//           <span className={styles.highlight}> Oops!</span> It seems that nothing{" "}
//           grows here!
//         </h1>
//       </div>
//       <div className={styles.button_wrapper}>
//         <button
//           className={styles.button_login}
//           onClick={() => router.push("/")}
//         >
//           Home
//         </button>
//       </div>
//     </div>
//   );
// }

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
        <button onClick={handleButtonClick} className={styles.button_image}>
          <div className={styles.image_wrapper}>
            {showTreeWithLeaves ? (
              <>
                <div className={styles.initialPage}>
                  <Image
                    className={styles.image}
                    src="/sprites/albero3.png"
                    alt="bare tree"
                    width="100"
                    height="150"
                  />
                  <h1>Error 404: Page not found</h1>
                </div>
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
          force={0.8}
          duration={1500}
          particleCount={250}
          width={1600}
        />
      )}
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
