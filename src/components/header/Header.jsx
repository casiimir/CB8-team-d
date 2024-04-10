import styles from "@/components/header/index.module.scss";

import { getSession, useSession } from "next-auth/react";
import { IoWaterOutline } from "react-icons/io5";
import { RiSeedlingLine } from "react-icons/ri";
import { LiaSeedlingSolid } from "react-icons/lia";
import Image from "next/image";

const Header = () => {
  const { data: session, status: sessionStatus } = useSession();
  const loading = sessionStatus === "loading";

  if (loading) return null;

  const user = session.user.username;
  const userResources = session.user.resources;

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.img_wrapper}>
        <Image
          height="80"
          width="80"
          className={styles.image}
          alt="user-icon"
          src="https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg"
        />
      </div>

      <div className={styles.user_wrapper}>
        <h2 className={styles.name}> {user}</h2>

        <div className={styles.resources_wrapper}>
          <p className={styles.text}>
            <IoWaterOutline /> Water {userResources.water}
          </p>
          <p className={styles.text}>
            <RiSeedlingLine />
            Seeds {userResources.seeds}
          </p>
          <p className={styles.text}>
            <LiaSeedlingSolid />
            Soil {userResources.soil}
          </p>
        </div>
      </div>
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

export default Header;
