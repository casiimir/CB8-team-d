import styles from "@/components/header/index.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useUserResources } from "@/contexts/userResourcesContext";

const Header = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { userResources } = useUserResources();
  const loading = sessionStatus === "loading";
  if (loading || userResources === null) {
    return null;
  }

  return (
    session && (
      <div className={styles.header_wrapper}>
        <div className={styles.logo_wrapper}>
          <Link href={"/"}>
            <Image
              className={styles.logo}
              src="/logowide.png"
              alt="logo"
              width="150"
              height="57"
            />
          </Link>
        </div>
        <div className={styles.info_wrapper}>
          <div className={styles.img_wrapper}>
            <Link href="/userpage">
              <Image
                className={styles.image}
                src={"/avatar.png"}
                priority={false}
                alt="User Image"
                width="80"
                height="80"
              />
            </Link>
          </div>

          <div className={styles.user_wrapper}>
            <h5 className={styles.name}> {session?.user?.username}</h5>

            <div className={styles.resources_wrapper}>
              <Image
                className={styles.water}
                src="/water.png"
                alt="Water"
                width={30}
                height={30}
              />
              <p className={styles.text}>
                {userResources?.water >= 0 && userResources.water}
              </p>

              <Image
                className={styles.water}
                src="/soil.png"
                alt="Soil"
                width={30}
                height={30}
              />
              <p className={styles.text}>
                {userResources?.soil >= 0 && userResources.soil}
              </p>

              <Image
                className={styles.water}
                src="/seeds.png"
                alt="Seeds"
                width={30}
                height={30}
              />
              <p className={styles.text}>
                {userResources?.seeds >= 0 && userResources.seeds}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
