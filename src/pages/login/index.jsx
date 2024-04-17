import Image from "next/image";
import styles from "@/styles/login.module.scss";
import React from "react";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const text = "Let's start growing together!".split(" ");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/garden");
    }
  }, [status, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      alert("Invalid credentials");
      console.error(result.error);
    }
  };

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
          {text.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: i / 4,
              }}
              key={i}
              className={i === 2 ? styles.highlight : ""}
            >
              {el}{" "}
            </motion.span>
          ))}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
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
