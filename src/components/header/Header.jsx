import styles from "@/components/header/index.module.scss";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useUserResources } from "@/contexts/userResourcesContext";

const Header = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { userResources } = useUserResources();
  const loading = sessionStatus === "loading";

  if (loading) return null;

  const user = session.user.username;

  // const [user, setUser] = useState({
  //   name: "Pippo",
  //   surname: "Pollo",
  //   username: "Pippollo5798",
  //   email: "pippolloe@pippo.com",
  //   imageUrl:
  //     "https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg",
  // });
  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg";

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.logo_wrapper}>
        <Image
          className={styles.logo}
          src="/logowide.png"
          alt="logo"
          width="150"
          height="57"
        />
      </div>
      <div className={styles.info_wrapper}>
        <div className={styles.img_wrapper}>
          <Image
            className={styles.image}
            src={imageUrl}
            priority={false}
            alt="User Image"
            width="80"
            height="80"
          />

          {/* <img className={styles.image} /> */}
        </div>

        <div className={styles.user_wrapper}>
          <h5 className={styles.name}> {session.user.username}</h5>

          <div className={styles.resources_wrapper}>
            <Image
              className={styles.water}
              src="/water.png"
              alt="Water"
              width={35}
              height={35}
            />
            <p className={styles.text}>{userResources.water}</p>

            <Image
              className={styles.water}
              src="/seeds.png"
              alt="Seeds"
              width={35}
              height={35}
            />
            <p className={styles.text}> {userResources.seeds}</p>

            <Image
              className={styles.water}
              src="/soil.png"
              alt="Soil"
              width={35}
              height={35}
            />
            <p className={styles.text}>{userResources.soil}</p>
          </div>
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
