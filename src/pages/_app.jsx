import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div>ciao dalla route _app</div>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
