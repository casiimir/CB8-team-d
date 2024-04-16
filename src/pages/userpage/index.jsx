import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/userpage.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useUserResources } from "@/contexts/userResourcesContext";
import Navbar from "@/components/navbar";
import Header from "@/components/header";

const UserProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg";

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <div className={styles.userpage_wrapper}>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.image}
            src={imageUrl}
            priority={false}
            alt="User Image"
            width="150"
            height="150"
          />
        </div>
        <form className={styles.submit_form}>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={session?.user?.username}
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={session?.user?.email}
            />
          </div>
          <div className={styles.btn_wrapper}>
            <button type="button" className={styles.btn_edit}>
              Edit Account
            </button>

            <br />
            <button
              type="button"
              onClick={() => signOut()}
              className={styles.btn_del}
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default UserProfilePage;
