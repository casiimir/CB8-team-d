import Image from "next/image";
import styles from "../../styles/login.module.scss";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const handleSubmit = async (event, router) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!result.error) {
    console.log("logged in");
    router.push("/habits");
  } else {
    //qua va la risposta che manda un avviso di errore all'utente
    alert("Invalid credentials");
    console.error(result.error);
  }
};

function Login() {
  const router = useRouter();

  return (
    <div className={styles.login_wrapper}>
      <Image
        className={styles.logo}
        src="/logoColoured.png"
        alt="logo"
        width="200"
        height="170"
      />
      <div className={styles.title}>
        <h1>
          Let&apos;s start <span className={styles.highlight}>growing</span>{" "}
          together!
        </h1>
      </div>

      <form onSubmit={(event) => handleSubmit(event, router)}>
        <div className={styles.form_wrapper}>
          <label className={styles.text}>E-mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
          />
        </div>

        <div className={styles.form_wrapper}>
          <label className={styles.text}>Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="••••••••••
            "
          />
        </div>
        <p className={styles.redirect}>Forgot Password?</p>

        <button className={styles.button_login} type="submit">
          Log in
        </button>
      </form>
      <div>
        <p className={styles.redirect1}>Don&apos;t have an account yet?</p>

        <button
          className={styles.button_signup}
          onClick={() => router.push("/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
