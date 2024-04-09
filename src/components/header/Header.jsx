import styles from "@/components/header/index.module.scss";
import playersData from "./playersData.js";
import Image from "next/image";

export default function Header() {
  // Trova il giocatore con id 1
  const player = playersData.find((player) => player.id === 1);

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.img_wrapper}>
        <img className={styles.image} />
      </div>

      <div className={styles.user_wrapper}>
        <h5 className={styles.name}> {player.name}</h5>

        <div className={styles.resources_wrapper}>
          <Image
            className={styles.water}
            src="/water.png"
            alt="Water"
            width={35}
            height={35}
          />
          <p className={styles.text}>{player.water}</p>

          <Image
            className={styles.water}
            src="/seeds.png"
            alt="Seeds"
            width={35}
            height={35}
          />
          <p className={styles.text}> {player.seeds}</p>

          <Image
            className={styles.water}
            src="/soil.png"
            alt="Soil"
            width={35}
            height={35}
          />
          <p className={styles.text}>{player.soil}</p>
        </div>
      </div>
    </div>
  );
}

//alternativa utile???
// const loggedPlayerId = 1;
// const loggedPlayer = playersData.find((player) => player.id === loggedPlayerId);

// export default function Header() {
//   return (
//     <div className={styles.header_wrapper}>
//       <h2 className={styles.text}>{loggedPlayer.name}</h2>
//       <p>Acqua: {loggedPlayer.water}</p>
//       <p>Semi: {loggedPlayer.seeds}</p>
//       <p>Terra: {loggedPlayer.soil}</p>
//     </div>
//   );
// }
