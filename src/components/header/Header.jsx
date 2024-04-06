import styles from "@/components/header/index.module.scss";
import playersData from "./playersData.js";

import { IoWaterOutline } from "react-icons/io5";
import { RiSeedlingLine } from "react-icons/ri";
import { LiaSeedlingSolid } from "react-icons/lia";

export default function Header() {
  // Trova il giocatore con id 1
  const player = playersData.find((player) => player.id === 1);

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.img_wrapper}>
        <img className={styles.image} />
      </div>

      <div className={styles.user_wrapper}>
        <h2 className={styles.name}> {player.name}</h2>

        <div className={styles.resources_wrapper}>
          <p className={styles.text}>
            <IoWaterOutline /> Water {player.water}
          </p>
          <p className={styles.text}>
            <RiSeedlingLine />
            Seeds {player.seeds}
          </p>
          <p className={styles.text}>
            <LiaSeedlingSolid />
            Soil {player.soil}
          </p>
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
