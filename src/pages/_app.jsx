import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import styles from "../styles/globals.css";
import { useState } from "react";
import { UserResourcesProvider } from "@/contexts/userResourcesContext";

function MyApp({ Component, pageProps }) {
  const pathName = usePathname();

  return (
    <SessionProvider session={pageProps.session}>
      <UserResourcesProvider>
        <Component {...pageProps} />
      </UserResourcesProvider>
    </SessionProvider>
  );
}

export default MyApp;
