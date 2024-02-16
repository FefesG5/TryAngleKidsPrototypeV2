// Header.tsx
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <Image
          src="/logo.svg" // Assuming you have a Next.js logo SVG in your public directory
          alt="Try Angle Kids Logo"
          className={styles.logo}
          width={300}
          height={100}
        />
      </div>
      {/* Add navigation items or other content here */}
    </header>
  );
};

export default Header;
