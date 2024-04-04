import styles from "../styles/page.module.css";
import Login from "../components/login/index";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Login></Login>
      </main>
    </>
  );
}
