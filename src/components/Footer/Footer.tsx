import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import { inter, poppins, roboto, cabin } from "@/app/ui/fonts";

const Footer: React.FC = () => {
  return (
    <footer className={`${cabin.className} ${styles.footer}`}>
      <div>
        Powered by{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          <span className={styles.logo}>
            <Image
              src="/vercel.svg" // Make sure the Vercel logo is in your public folder
              alt="Vercel Logo"
              width={71} // Adjust to your logo's aspect ratio
              height={16} // Adjust to your logo's aspect ratio
            />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
