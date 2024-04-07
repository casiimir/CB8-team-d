// import Login from "@/components/login";
import { useSession } from "next-auth/react";
import Login from "../components/login/index";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
  }
  return (
    <main>
      <Login />
    </main>
  );
}
