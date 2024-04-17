import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "../styles/globals.css";
import { UserResourcesProvider } from "@/contexts/userResourcesContext";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserResourcesProvider>
        <Component {...pageProps} />
      </UserResourcesProvider>
    </SessionProvider>
  );
}

export default MyApp;
