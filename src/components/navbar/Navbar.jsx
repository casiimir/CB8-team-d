import styles from "./index.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTree,
  FaCircleNotch,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";

const Navbar = ({ isModalOpen, setIsModalOpen }) => {
  const pathName = usePathname();

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.packIcons}>
          <li>
            <Link
              href="/habits"
              className={`${styles.link} ${
                pathName === "/habits" ? styles.active : ""
              }`}
            >
              {pathName === "/habits" ? (
                <FaCircleNotch className={styles.active} />
              ) : (
                <FaCircleNotch className={styles.icon} />
              )}
              Habits
            </Link>
          </li>
          <li>
            <Link
              href="/dailies"
              className={`${styles.link} ${
                pathName === "/dailies" ? styles.active : ""
              }`}
            >
              {pathName === "/dailies" ? (
                <FaCalendarCheck className={styles.active} />
              ) : (
                <FaCalendarCheck className={styles.icon} />
              )}
              Dailies
            </Link>
          </li>
        </ul>
        <ul className={styles.packIcons}>
          <li>
            <Link
              href="/todos"
              className={`${styles.link} ${
                pathName === "/todos" ? styles.active : ""
              }`}
            >
              {pathName === "/todos" ? (
                <FaCheckCircle className={styles.active} />
              ) : (
                <FaCheckCircle className={styles.icon} />
              )}
              To-dos
            </Link>
          </li>
          <li>
            <Link
              href="/garden"
              className={`${styles.link} ${
                pathName === "/garden" ? styles.active : ""
              }`}
            >
              {pathName === "/garden" ? (
                <FaTree className={styles.active} />
              ) : (
                <FaTree className={styles.icon} />
              )}
              Garden
            </Link>
          </li>
        </ul>
        {pathName !== "/garden" ? (
          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FaPlus className={styles.btnIcon} />
          </button>
        ) : (
          <button
            className={`${styles.addBtn} ${
              pathName === "/garden" ? `${styles.logoWrapper}` : ""
            }`}
            onClick={() => setIsModalOpen(!isModalOpen)}
            disabled={pathName === "/garden"}
          >
            <Image
              src="/logoWhite.png"
              alt="logo"
              width="56"
              height="56"
              className={styles.logo}
            />
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
