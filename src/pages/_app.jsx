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
        {pathName !== "/login" &&
          pathName !== "/" &&
          pathName !== "/signup" && (
            <>
              <Header />
              <Component {...pageProps} />
            </>
          )}
        {pathName === "/login" || pathName === "/" || pathName === "/signup" ? (
          <Component {...pageProps} />
        ) : null}
      </UserResourcesProvider>
    </SessionProvider>
  );
}

export default MyApp;
