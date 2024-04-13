// import { useSession } from "next-auth/react";
import Page404 from "../components/page404/Page404";

export default function Home() {
  // const { data: session } = useSession();
  // if (session) {
  //   console.log(session.user);
  // }
  return (
    <main>
      <Page404 />
    </main>
  );
}
