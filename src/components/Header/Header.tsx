// Header.tsx
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src="/logo.svg" // Assuming you have a Next.js logo SVG in your public directory
            alt="Try Angle Kids Logo"
            className={styles.logo}
            width={300}
            height={100}
          />
        </Link>
      </div>
      {/* Add navigation items or other content here */}
    </header>
  );
};

export default Header;
