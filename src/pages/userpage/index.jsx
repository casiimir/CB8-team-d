import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/userpage.module.scss";
import { getSession, useSession } from "next-auth/react";
import { useUserResources } from "@/contexts/userResourcesContext";
import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function UserProfilePage() {
  // const [user, setUser] = useState({
  //   name: "Pippo",
  //   surname: "Pollo",
  //   username: "Pippollo5798",
  //   email: "pippolloe@pippo.com",
  //   imageUrl:
  //     "https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg",
  // });
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user?.username;
  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/019/633/059/original/8-bit-pixel-human-portrait-cartoon-young-girl-for-game-assets-in-illustration-vector.jpg";

  const [editing, setEditing] = useState(false);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onHandleEdit = () => {
    setEditing(true);
  };

  const onHandleDelete = () => {
    // qui va logica per eliminare l'account
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // qui va la logica per inviare i dati modificati al backend
    setEditing(false);
  };

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
        <form onSubmit={onHandleSubmit} className={styles.submit_form}>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={session?.user?.username}
              onChange={onHandleChange}
              disabled={!editing}
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
              onChange={onHandleChange}
              disabled={!editing}
            />
          </div>
          <div className={styles.btn_wrapper}>
            {editing ? (
              <button type="submit" className={styles.btn_sub}>
                Save Account
              </button>
            ) : (
              <button
                type="button"
                onClick={onHandleEdit}
                className={styles.btn_edit}
              >
                Edit Account
              </button>
            )}
            <br />
            <button
              type="button"
              onClick={onHandleDelete}
              className={styles.btn_del}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  );
}
