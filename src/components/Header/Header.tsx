// Header.tsx
import { useContext } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";
import { inter, poppins, roboto, cabin } from "@/app/ui/fonts";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${cabin.className} ${styles.header}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Try Angle Kids Logo"
            className={styles.logo}
            width={300}
            height={100}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/lessons">Lessons</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/educator">Educator Access</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/report-issue">Report Issue</Link>
          </li>
        </ul>
      </nav>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </header>
  );
};

export default Header;
