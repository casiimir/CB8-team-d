import styles from "@/styles/custom404.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className={styles.notfound_wrapper}>
      <div className={styles.items_wrapper}>
        <Image
          className={styles.image}
          src="/bare tree.png"
          alt=" bare tree"
          width="200"
          height="200"
        />
        <h1 className={styles.title}>
          <span className={styles.highlight}> Oops!</span> It seems that nothing{" "}
          grows here!
        </h1>
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
