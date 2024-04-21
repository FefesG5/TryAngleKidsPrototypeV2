// Header.tsx
import { useContext, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import { ThemeContext } from "@/contexts/ThemeContext";
import { inter, poppins, roboto, cabin } from "@/app/ui/fonts";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
            priority
          />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <button className={styles.hamburger} onClick={handleSidebarToggle}>
        ☰
      </button>

      {/* Conditional rendering of the Sidebar */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      )}

      <nav className={`${styles.nav} ${isSidebarOpen ? styles.navOpen : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/lessons">Lessons</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/educators-lessons">Educators Lessons</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/educator">Educator Access</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/report-issue">Report Issue</Link>
          </li>
        </ul>
      </nav>

      {/* Render theme changer button in header */}
      <button onClick={toggleTheme} className={styles.themeChanger}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </header>
  );
};

export default Header;
