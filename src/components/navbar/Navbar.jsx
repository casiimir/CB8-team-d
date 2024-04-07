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

const Navbar = () => {
  const pathName = usePathname();

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.packIcons}>
          <li>
            <Link
              href="/habits"
              className={pathName === "/habits" ? styles.active : ""}
            >
              {" "}
              {pathName === "/habits" ? (
                <FaCircleNotch className={styles.active} />
              ) : (
                <FaCircleNotch className={styles.icon} />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/dailies"
              className={pathName === "/dailies" ? styles.active : ""}
            >
              {" "}
              {pathName === "/dailies" ? (
                <FaCalendarCheck className={styles.active} />
              ) : (
                <FaCalendarCheck className={styles.icon} />
              )}
            </Link>
          </li>
        </ul>
        <ul className={styles.packIcons}>
          <li>
            <Link
              href="/todos"
              className={pathName === "/todos" ? styles.active : ""}
            >
              {pathName === "/todos" ? (
                <FaCheckCircle className={styles.active} />
              ) : (
                <FaCheckCircle className={styles.icon} />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/garden"
              className={pathName === "/garden" ? styles.active : ""}
            >
              {pathName === "/garden" ? (
                <FaTree className={styles.active} />
              ) : (
                <FaTree className={styles.icon} />
              )}
            </Link>
          </li>
        </ul>
        <button className={styles.addBtn}>
          <FaPlus className={styles.btnIcon} />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
