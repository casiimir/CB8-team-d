// import { useSession } from "next-auth/react";
import Loader from "../components/loader/Loader.jsx";

export default function Home() {
  // const { data: session } = useSession();
  // if (session) {
  //   console.log(session.user);
  // }
  return (
    <main>
      <h1>Landing Page</h1>
      <Loader />
    </main>
  );
}
