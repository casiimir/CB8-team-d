import styles from "@/styles/custom404.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className={styles.notfound_wrapper}>
      <div className={styles.items_wrapper}>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.image1}
            src="/sprites/secco3.png"
            alt=" bare tree"
            width="50"
            height="50"
          />
          <Image
            className={styles.image}
            src="/sprites/secco4.png"
            alt=" bare tree"
            width="100"
            height="150"
          />
          <Image
            className={styles.image1}
            src="/sprites/secco3.png"
            alt=" bare tree"
            width="50"
            height="50"
          />
        </div>
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
