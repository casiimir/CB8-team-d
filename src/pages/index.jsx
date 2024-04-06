// import Login from "@/components/login";
import styles from "../styles/page.module.css";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
  }
  return (
    <main className={styles.main}>
      <h1>Growy</h1>
      <Navbar />
      {/* <Login /> */}
    </main>
  );
}
