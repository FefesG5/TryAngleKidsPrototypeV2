// Header.tsx
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
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
            <Link href="/report-issue">Report Issue</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
