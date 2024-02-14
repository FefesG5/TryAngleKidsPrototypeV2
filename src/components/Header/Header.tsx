// Header.tsx
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <Image
          src="/next.svg" // Assuming you have a Next.js logo SVG in your public directory
          alt="Next.js Logo"
          className={styles.logo}
          width={128} // Adjust to the size of your actual logo
          height={64} // Adjust to the size of your actual logo
        />
      </div>
      {/* Add navigation items or other content here */}
    </header>
  );
};

export default Header;
