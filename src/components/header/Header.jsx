import styles from "@/components/header/index.module.scss";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoWaterOutline } from "react-icons/io5";
import { RiSeedlingLine } from "react-icons/ri";
import { LiaSeedlingSolid } from "react-icons/lia";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [userResources, setUserResources] = useState([]);
  const loading = sessionStatus === "loading";

  // const [water, setWater] = useState();
  // const [soil, setSoil] = useState();
  // const [seeds, setSeeds] = useState();

  // useEffect(() => {
  //   setWater(resources.data[0].water);
  //   setSoil(resources.data[0].soil);
  //   setSeeds(resources.data[0].seeds);
  // }, [resources]);

  useEffect(() => {
    const loadUserResources = async () => {
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/userResources?userId=${userId}`);
        if (response.ok) {
          const resources = await response.json();
          setUserResources(resources.data);

          const water = resources.data[0].water;
        } else {
          console.error("Failed to load userResources");
        }
      } else {
        console.log("No session");
        router.push("/login");
      }
    };

    loadUserResources();
  }, [router, session]);

  if (loading) return null;

  const user = session.user.username;

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
            <IoWaterOutline /> Water
            {/* {userResources.water} */}
          </p>
          <p className={styles.text}>
            <RiSeedlingLine />
            Seeds
            {/* {userResources.seeds} */}
          </p>
          <p className={styles.text}>
            <LiaSeedlingSolid />
            Soil
            {/* {userResources.soil} */}
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
