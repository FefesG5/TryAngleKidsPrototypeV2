// Sidebar.tsx
import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, closeSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      {/* ... sidebar contents ... */}
      <ul className={styles.navList}>
        {/* Navigation Items */}
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/lessons">Lessons</Link>
        </li>
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/educator">Educator Access</Link>
        </li>
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/report-issue">Report Issue</Link>
        </li>
      </ul>

      {/* Render theme changer button in sidebar for smaller screens */}
      <button onClick={toggleTheme} className={styles.themeChangerSidebar}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </aside>
  );
};

export default Sidebar;
